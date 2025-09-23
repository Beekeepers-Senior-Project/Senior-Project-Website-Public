import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";

const defaultTimeMap: Map<string, SingleUserWeekBlockProps[]> = new Map();

/**
 * Map names of users to their time tracking json routes
 */
const NameToJson: Map<string, string> = new Map();
NameToJson.set("Joseph Moran", "time-tracking/joe.json");
NameToJson.set("Charles Von Goins II", "time-tracking/charles.json");
NameToJson.set("Dylan Morton", "time-tracking/dylan.json");
NameToJson.set("Reid Taylor", "time-tracking/reid.json");
NameToJson.set("Josiah Claudio", "time-tracking/josiah.json")

type SingleUserWeekBlockProps = {
    label: string,
    startDay: Date,
    hoursWorked: number[]
}

type FullTeamWeekBlockProps = {
    label: String,
    startDay: Date,
    timeMap: Map<String, SingleUserWeekBlockProps>
}

type WeekBlockJson = {
    label: string,
    startDay: string, // Will need to be converted to date obj
    hoursWorked: number[]
}

function dateIterate(initial: Date, inc: number): Date {
    const secInDay = 86400000;
    const newDate = new Date(initial.getTime() + inc * secInDay);
    return newDate;
}

function formatDate(date: Date): String {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

async function fetchMemberTime(path: string): Promise<SingleUserWeekBlockProps[]>{
    return new Promise((res, rej) => {
        fetch(path)
        .then(res => res.json())
        .then((json: WeekBlockJson[]) => {
            const mapped: SingleUserWeekBlockProps[] = json.map((raw: WeekBlockJson) => {
                const [year, month, day] = raw.startDay.split("-").map(Number);
                return {
                    label: raw.label,
                    hoursWorked: raw.hoursWorked,
                    startDay: new Date(year, month - 1, day)
                };
            });
            res(mapped);
        })
        .catch(err => {
            console.error(err);
            res([]);
        });
    })
}

function TimeTracking() {
    const [selectedUser] = useState("Team Stats");
    const [timeMap, setTimeMap] = useState<Map<string, SingleUserWeekBlockProps[]>>(defaultTimeMap);

    /** Fetch JSON time tracking data */
    useEffect(() => {
        const newMap: Map<string, SingleUserWeekBlockProps[]> = new Map();
        const fetchData = async () => {
            for(const [key, value] of NameToJson.entries()){
                newMap.set(key, await fetchMemberTime(value));
            }
            setTimeMap(newMap);
        }
        fetchData();
    }, [])

    return (
        <div>
            <div className="container pt-5">
                <div className="text-center pt-3">
                    <h1 className="text-4xl font-bold">Time Tracking</h1>
                </div>
                <hr className="my-4" />
            </div>

            <div className="container">
                <div>{selectedUser}</div>
                {timeMap.get("Joseph Moran")?.map((week) => {
                    return <SingleUserWeekBlock key={week.label} {...week} />
                })}
            </div>
        </div>
    )
}

function FullTeamWeekBlock(timeMap: FullTeamWeekBlockProps) {
    
}

function SingleUserWeekBlock(props: SingleUserWeekBlockProps) {
    let runningWorkTotal = 0;

    return (
        <Table className="w-full table-auto mb-10">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/3 text-bold">{props.label}</TableHead>
                    <TableHead className="w-1/3">Hours Worked</TableHead>
                    <TableHead className="w-1/3 text-right">Running Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.hoursWorked.map((time, index) => (
                    <TableRow key={dateIterate(props.startDay, index).toString()}>
                        <TableCell>
                            {formatDate(dateIterate(props.startDay, index))}
                        </TableCell>
                        <TableCell>
                            {time.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-right">
                            {(runningWorkTotal += time).toFixed(1)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Weekly Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">
                        {runningWorkTotal.toFixed(1)} Hours
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default TimeTracking;