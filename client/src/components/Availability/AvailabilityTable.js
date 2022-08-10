import React, { useEffect, useState } from "react";
import AvailabilityPeriod from "./AvailabilityPeriod";
import { usersAvailableAt, fractionOfUsersAvailableAt } from "./utils";

const locale = 'en-CA';

const AvailabilityTable = ({ 
    timeZoneLabel, timeUnit, setUserSlots, selectedSlots, othersAvailability, ranges
}) => {
    const [selectionMode, setSelectionMode] = useState(null);
    const [currSelection, setCurrSelection] = useState(selectedSlots);

    const selectSlot = (s) => {
        setCurrSelection([...currSelection, parseInt(s)]);
    }

    const unselectSlot = (s) => {
        setCurrSelection(currSelection.filter(x => x !== parseInt(s)));
    }

    const startSelection = (e) => {
        if (e.target.classList.contains('selected')) {
            setSelectionMode('remove');
            unselectSlot(e.target.id);
        } else {
            setSelectionMode('add');
            selectSlot(e.target.id);
        }
    }

    const endSelection = (e) => {
        setSelectionMode(null);
        // only update when the list is updated
        if (currSelection.length !== selectedSlots.length || 
            !currSelection.every(e => selectedSlots.includes(e))) {  
            setUserSlots(currSelection);
        }
    }

    const slotHandleMouseEnter = (e) => {
        if (selectionMode === 'add') {
            selectSlot(e.target.id);
        } else if (selectionMode === 'remove') {
            unselectSlot(e.target.id);
        }
    }

    const slots  = ranges.map(() => [])
    for (let i = 0; i < ranges.length; i++) {
        const start = ranges[i][0].getTime()
        const end = ranges[i][1].getTime();
        for (
            let slot = start;
            new Date(slot).getTime() <= end - timeUnit;
            slot += timeUnit
        ) {
            slots[i].push(new Date(slot));
        }
    }

    const colDateFormat = new Intl.DateTimeFormat('default', {month: 'short', day: 'numeric', timeZone: timeZoneLabel})
    const timeFormat = new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric', timeZone: timeZoneLabel})

    useEffect(() => {
        setCurrSelection(selectedSlots)
    }, [selectedSlots])

    return (
        <table onMouseDown={startSelection} onMouseUp={endSelection} onMouseLeave={endSelection}
        className="availability-table">
            <thead>
            <tr>
                <th></th>
                {ranges.map((range, i) => <th key={i} className='date'>
                    {colDateFormat.format(range[0])}</th>)}
            </tr>
            </thead>
            <tbody>
                {slots[0].map((pStart, i) => (
                    <tr key={i}>
                        <th className="hour">{timeFormat.format(pStart)}</th>
                        {ranges.map((range, j) => (
                            <AvailabilityPeriod
                                key={j}
                                start={slots[j][i].getTime()}
                                duration={1}
                                availability={1}
                                processSelection={slotHandleMouseEnter}
                                selected={currSelection.includes(slots[j][i].getTime())}
                                fractionAvailable={fractionOfUsersAvailableAt(slots[j][i].getTime(), othersAvailability)}
                                availableList={usersAvailableAt(slots[j][i].getTime(), othersAvailability)}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AvailabilityTable;
