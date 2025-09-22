import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";

type WeekBlockProps = {
    label: string,
    startDay: Date,
    hoursWorked: number[]
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

function TimeTracking() {
    const [selectedUser] = useState("Joe Moran");
    const [weeks, setWeeks] = useState<WeekBlockProps[] | null>(null);

    useEffect(() => {
        fetch("time-tracking/joe.json")
            .then(res => res.json())
            .then((json: WeekBlockJson[]) => {
                const mapped: WeekBlockProps[] = json.map((raw: WeekBlockJson) => {
                    const [year, month, day] = raw.startDay.split("-").map(Number);
                    return {
                        label: raw.label,
                        hoursWorked: raw.hoursWorked,
                        startDay: new Date(year, month - 1, day)
                    };
                });
                setWeeks(mapped);
            })
            .catch(err => console.error(err));
    })

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
                {weeks?.map((week) => {
                    return <WeekBlock key={week.label} {...week} />
                })}
            </div>
        </div>
    )
}

function WeekBlock(props: WeekBlockProps) {
    let runningWorkTotal = 0;

    return (
        <Table className="w-full table-auto">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/3 text-bold">Week 1</TableHead>
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