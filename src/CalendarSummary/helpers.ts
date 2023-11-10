import {CalendarEvent} from "../api-client";

export type DayData = {
    date: string;
    numberOfEvents: number;
    totalDuration: number;
    longestEvent: CalendarEvent;
};

export const getTotalData = (weekData: DayData[]): DayData => {
    const total: DayData = {date: "Total", numberOfEvents: 0, totalDuration: 0, longestEvent: {uuid: "", durationInMinutes: 0, title: ""}};
    weekData.forEach((day) => {
        const {totalDuration, numberOfEvents, longestEvent} = day;
        const newLongestEvent = longestEvent.durationInMinutes > total.longestEvent.durationInMinutes ? longestEvent : total.longestEvent;
        total.numberOfEvents += numberOfEvents;
        total.totalDuration += totalDuration;
        total.longestEvent = newLongestEvent;
    });

    return total;
};

export const createDayData = (date: Date, data: CalendarEvent[]): DayData => {
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
