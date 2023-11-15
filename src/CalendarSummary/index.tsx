import React, {useEffect, useState} from "react";
import {getCalendarEvents} from "../api-client";
import "./index.module.css";
import DataTable from "./components/DataTable";
import {DayInformation, createDayData, getTotalData, toDateString} from "./helpers";

// How many days we should fetch
const NUMBER_OF_DAYS = 7;

const CalendarSummary: React.FunctionComponent = () => {
    const [weekData, setWeekData] = useState<DayInformation[]>([]);
    const [totalData, setTotalData] = useState<DayInformation | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Load data on component mount
    useEffect(() => {
        // Flag for React Strict Mode
        let dataLoaded = false;

        const getCalendarData = async () => {
            if (dataLoaded) return;
            const result = [];

            for (let i = 0; i < NUMBER_OF_DAYS; i++) {
                // Getting new day index
                const newDay = new Date();
                newDay.setDate(newDay.getDate() + i);
                try {
                    const data = await getCalendarEvents(newDay);
                    if (data) {
                        const dayData = createDayData(newDay, data);
                        result.push(dayData);
                    } else {
                        setError(`Couldn't fetch data for day ${toDateString(newDay)}`);
                    }
                } catch (err) {
                    setError(`Couldn't fetch data for day ${toDateString(newDay)}`);
                }
            }
            setWeekData(result);
            setTotalData(getTotalData(result));
        };

        getCalendarData();

        return () => {
            dataLoaded = true;
        };
    }, []);

    return (
        <div>
            <h2>Calendar summary</h2>
            {totalData !== null ? <DataTable weekData={weekData} totalData={totalData} error={error}></DataTable> : <h3>Loading data...</h3>}
        </div>
    );
};

export default CalendarSummary;
