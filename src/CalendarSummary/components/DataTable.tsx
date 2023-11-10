import {DayData} from "../helpers";

interface DataTableProps {
    weekData: DayData[];
    totalData: DayData | null;
    error: string | null;
}

function DataTable({weekData, totalData, error}: DataTableProps) {
    return (
        <>
            {error ? <p>{error}</p> : null}
            <table>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Number of Events</th>
                        <th>Total Duration [min]</th>
                        <th>Longest Event</th>
                    </tr>
                    {weekData.map((day, index) => (
                        <tr key={index}>
                            <td>{day.date}</td>
                            <td>{day.numberOfEvents}</td>
                            <td>{day.totalDuration}</td>
                            <td>{day.longestEvent.title}</td>
                        </tr>
                    ))}
                    {totalData ? (
                        <tr>
                            <td>Total</td>
                            <td>{totalData.numberOfEvents}</td>
                            <td>{totalData.totalDuration}</td>
                            <td>{totalData.longestEvent.title}</td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </>
    );
}

export default DataTable;
