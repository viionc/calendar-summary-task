import React, {useEffect, useState} from "react";
import {getCalendarEvents} from "../api-client";
import "./index.module.css";
import DataTable from "./components/DataTable";
import {DayData, createDayData, getTotalData} from "./helpers";

const NUMBER_OF_DAYS = 7;

const CalendarSummary: React.FunctionComponent = () => {
    const [weekData, setWeekData] = useState<DayData[]>([]);
    const [totalData, setTotalData] = useState<DayData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let dataLoaded = false;
        setError(null);
        const getCalendarData = async () => {
            for (let i = 0; i < NUMBER_OF_DAYS; i++) {
                const newDay = new Date();
                newDay.setDate(newDay.getDate() + i);
                try {
                    const data = await getCalendarEvents(newDay);
                    if (data && !dataLoaded) {
                        const dayData = createDayData(newDay, data);
                        setWeekData((prev) => [...prev, dayData]);
                    }
                } catch (err) {
                    setError("Couldn't fetch all of the data.");
                }
            }
        };

        getCalendarData();

        return () => {
            dataLoaded = true;
        };
    }, []);

    useEffect(() => {
        setTotalData(getTotalData(weekData));
    }, [weekData]);

    return (
        <div>
            <h2>Calendar summary</h2>
            {<DataTable weekData={weekData} totalData={totalData} error={error}></DataTable>}
        </div>
    );
};

export default CalendarSummary;
