import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card } from "./ui/card";

/**
 * Placeholder for loading data
 */
const defaultTeamTime = {
    "members": ["Joseph Moran", "Charles von Goins II", "Josiah Claudio", "Reid Taylor", "Dylan Morton", "Joshua Rubin"],
    "weeks": [
        {
            "label": "Week 0",
            "startDay": "2025-09-01",
            "hours": [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]
        }
    ]
}

const timeDataPath = "time-tracking/team.json";

type WeekBlockJSON = {
    label: string,
    startDay: string,
    hours: number[][]
}

type TeamTimeJSON = {
    members: string[]
    weeks: WeekBlockJSON[]
}

type TeamWeekBlockProps = {
    members: string[]
    week: WeekBlockJSON
}

/**
 * Increment a date by a set number of days, have to use seconds as timezones make this suprisingly difficult
 */
function incrementDate(initial: Date, inc: number): Date {
    const secInDay = 86400000;
    const newDate = new Date(initial.getTime() + inc * secInDay);
    return newDate;
}

/**
 * Format a date in MM/DD/YYYY format
 */
function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

/**
 * Fetch and process time tracking data from json statically hosted by github pages
 */
async function fetchTime(): Promise<TeamTimeJSON> {
    return new Promise((res) => {
        fetch(timeDataPath)
            .then(res => res.json())
            .then((json: TeamTimeJSON) => {
                json.weeks = json.weeks.reverse();
                res(json);
            })
            .catch(err => {
                console.error(err);
                res(defaultTeamTime);
            });
    })
}

function TimeTracking() {
    const [members, setMembers] = useState<string[]>(defaultTeamTime.members);
    const [weeks, setWeeks] = useState<WeekBlockJSON[]>(defaultTeamTime.weeks);

    /** Fetch JSON time tracking data once on initialization */
    useEffect(() => {
        const run = async () => {
            const map = await fetchTime();
            setMembers(map.members);
            setWeeks(map.weeks);
        }
        run();
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
                {weeks.map((week) => {
                    return <FullTeamWeekBlock key={week.label} members={members} week={week}></FullTeamWeekBlock>
                })}
            </div>
        </div>
    )
}

/**
 * Single week time blocks displaying each team member's contributions
 */
function FullTeamWeekBlock(props: TeamWeekBlockProps) {
    const { members, week } = props;
    const startDay = new Date(week.startDay);
    let teamTotal = 0;
    let inTotals = new Array(members.length).fill(0);

    const daysInWeek = Array.from({ length: 7 }, (_, i) => i);
    const membersInTeam = Array.from({ length: members.length }, (_, i) => i);

    return (
        <Card className="mb-10">
            <Table className="w-full table-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-bold w-[15%]">{week.label}</TableHead>
                        {members.map((member) => (
                            <TableHead key={member} className="text-center w-[14%]">{member}</TableHead>
                        ))}
                        <TableHead className="text-right w-[15%]"> Running Total (Hours)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {daysInWeek.map(day => {
                        return (
                            <TableRow key={day}>
                                <TableCell>{formatDate(incrementDate(startDay, day))}</TableCell>
                                {membersInTeam.map((memNum) => {
                                    const hoursArray = week.hours[memNum];
                                    const hasData = !!hoursArray;

                                    if (hasData) {
                                        const hours = hoursArray[day];
                                        teamTotal += hours;
                                        inTotals[memNum] += hours;
                                        return <TableCell key={memNum} className="text-center">{hours.toFixed(1)}</TableCell>;
                                    }

                                    return <TableCell key={memNum} className="text-center text-muted-foreground italic">N/A</TableCell>;
                                })}
                                <TableCell className="text-right">{teamTotal.toFixed(1)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Weekly Total</TableCell>
                        {membersInTeam.map((memNum) => {
                            const hasData = !!week.hours[memNum];
                            return (
                                <TableCell key={memNum} className="text-center">
                                    {hasData ? inTotals[memNum].toFixed(1) : "N/A"}
                                </TableCell>
                            );
                        })}
                        <TableCell className="text-right font-bold">{teamTotal.toFixed(1)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Card>
    );
}

export default TimeTracking;