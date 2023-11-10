import React, {useEffect, useState} from "react";
import {CalendarEvent, getCalendarEvents} from "../api-client";
import "./index.module.css";
import DataTable from "./components/DataTable";

export interface DayData {
    date: string;
    numberOfEvents: number;
    totalDuration: number;
    longestEvent: CalendarEvent;
}

const getTotalData = (weekData: DayData[]): DayData => {
    const total: DayData = {date: "Total", numberOfEvents: 0, totalDuration: 0, longestEvent: {uuid: "", durationInMinutes: 0, title: ""}};
    weekData.forEach((day) => {
        const {totalDuration, numberOfEvents, longestEvent} = day;
        total.numberOfEvents += numberOfEvents;
        total.totalDuration += totalDuration;
        total.longestEvent = longestEvent.durationInMinutes > total.longestEvent.durationInMinutes ? longestEvent : total.longestEvent;
    });
    return total;
};

const createDayData = (date: Date, data: CalendarEvent[]): DayData => {
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getUTCDate()}`;
    const dayData: DayData = {
        date: dateString,
        numberOfEvents: data.length,
        totalDuration: data.reduce((acc, cur) => {
            return acc + cur.durationInMinutes;
        }, 0),
        longestEvent: data.sort((a, b) => b.durationInMinutes - a.durationInMinutes)[0],
    };

    return dayData;
};

const CalendarSummary: React.FunctionComponent = () => {
    const [weekData, setWeekData] = useState<DayData[]>([]);
    const [totalData, setTotalData] = useState<DayData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let dataLoaded = false;
        const getCalendarData = async () => {
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                try {
                    const data = await getCalendarEvents(date);
                    if (data && !dataLoaded) {
                        const dayData = createDayData(date, data);
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
            {error ? <p>{error}</p> : <DataTable weekData={weekData} totalData={totalData}></DataTable>}
        </div>
    );
};

export default CalendarSummary;
