import React, { useCallback, useState } from 'react';

import { Calendar } from '@natscale/react-calendar';
import "../../css/EventCreation/DatePicker.css"
import '@natscale/react-calendar/dist/main.css';
import ViewSwitch from './ViewSwitch';

const viewStates = {"Range": false, "Dates": true}

export default function DatePicker() {
    const [dates, setDates] = useState([]);
    const [view, setView] = useState(false);

    const onChange = useCallback(
        (val) => {
            setDates(val);
        },
        [setDates],
    );

    function onSwitch(newState) {
        if (dates.length === 2) {
            setDates(rangeToMultiDates(dates[0], dates[1]));
        } else if (dates.length > 2) {
            setDates([dates[0], dates[dates.length-1]]); // TODO: fix 'earliest date' bug
        }
        // console.log(dates)
        setView(newState);
    }

    return (
        <div className="dateChosen">
            <div>
                <ViewSwitch
                checked = {view}
                handleSwitch = {onSwitch}
                />
            </div>
            <Calendar size={360} 
            isRangeSelector={view === viewStates.Range}
            noPadRangeCell={view === viewStates.Range}
            isMultiSelector={view === viewStates.Dates}
            value={dates} onChange={onChange} />
            <h2>Date Range Chosen:</h2>
            {dates.length > 0 ? (
                <p>{dates[0].toDateString()}</p>
            ) : null}
            {dates.length > 1 ? (
                <p>{dates[1].toDateString()}</p>
            ) : null}
        </div>
    );
}


function rangeToMultiDates(start, end) {
    // convert from date range to indivitual dates within that range
    const multiDates = [];
    let next = start;
    multiDates.push(next);
    while (next.toDateString() !== end.toDateString()) {
        next = new Date(next.valueOf());
        next.setDate(next.getDate() + 1);
        multiDates.push(next);
    }
    return multiDates;
}