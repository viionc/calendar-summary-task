import {CalendarEvent} from "../api-client";

export type DayInformation = {
    date: string;
    numberOfEvents: number;
    totalDuration: number;
    longestEvent: CalendarEvent;
};

export const toDateString = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getUTCDate()}`;

export const getTotalData = (weekData: DayInformation[]): DayInformation => {
    const total: DayInformation = {date: "Total", numberOfEvents: 0, totalDuration: 0, longestEvent: {uuid: "", durationInMinutes: 0, title: ""}};
    weekData.forEach((day) => {
        const {totalDuration, numberOfEvents, longestEvent} = day;
        // Check if Day Event is longer than what we had stored before
        const newLongestEvent = longestEvent.durationInMinutes > total.longestEvent.durationInMinutes ? longestEvent : total.longestEvent;
        // Update total values
        total.numberOfEvents += numberOfEvents;
        total.totalDuration += totalDuration;
        total.longestEvent = newLongestEvent;
    });

    return total;
};

export const createDayData = (currentDate: Date, eventData: CalendarEvent[]): DayInformation => {
    const dateString = toDateString(currentDate);

    // Create new day object
    const dayInformation: DayInformation = {
        date: dateString,
        numberOfEvents: eventData.length,
        totalDuration: eventData.reduce((acc, cur) => {
            return acc + cur.durationInMinutes;
        }, 0),
        longestEvent: eventData.sort((a, b) => b.durationInMinutes - a.durationInMinutes)[0],
    };

    return dayInformation;
};
