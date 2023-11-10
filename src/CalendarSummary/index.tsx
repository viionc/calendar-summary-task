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
        const getCalendarData = async () => {
            for (let i = 0; i < NUMBER_OF_DAYS; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                try {
                    const data = await getCalendarEvents(date);
                    if (data && !dataLoaded) {
                        const dayData = createDayData(date, data);
                        setWeekData((prev) => [...prev, dayData]);
                        setError(null);
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
            {error ? <p>{error}</p> : <DataTable weekData={weekData} totalData={totalData}></DataTable>}
        </div>
    );
};

export default CalendarSummary;
