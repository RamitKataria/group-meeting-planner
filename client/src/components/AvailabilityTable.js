import React, { useState } from "react";
import AvailabilityPeriod from "./AvailabilityPeriod";

const AvailabilityTable = ({ days, timeRange, timeUnit, setUserSlots, selectedSlots }) => {
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
        setUserSlots(currSelection);
    }

    const slotHandleMouseEnter = (e) => {
        if (selectionMode === 'add') {
            selectSlot(e.target.id);
        } else if (selectionMode === 'remove') {
            unselectSlot(e.target.id);
        }
    }

    const slots = days.map(() => []);
    for (let i = 0; i < days.length; i++) {
        const start = days[i].getTime() + timeRange[0];
        const end = days[i].getTime() + timeRange[1];
        for (
            let slot = start;
            new Date(slot).getTime() <= end - timeUnit;
            slot += timeUnit
        ) {
            slots[i].push(new Date(slot));
        }
    }

    const colDateFormat = new Intl.DateTimeFormat('default', {month: 'short', day: 'numeric'})

    return (
        <table onMouseDown={startSelection} onMouseUp={endSelection} onMouseLeave={endSelection}>
            <thead>
            <tr>
                <th>Time</th>
                {days.map((d, i) => <th key={i}>
                    {colDateFormat.format(d)}</th>)}
            </tr>
            </thead>
            <tbody>
                {slots[0].map((pStart, i) => (
                    <tr key={i}>
                        <th>{pStart.getHours()}</th>
                        {days.map((d, j) => (
                            <AvailabilityPeriod
                                key={j}
                                start={slots[j][i].getTime()}
                                duration={1}
                                availability={1}
                                processSelection={slotHandleMouseEnter}
                                selected={currSelection.includes(slots[j][i].getTime())}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AvailabilityTable;
