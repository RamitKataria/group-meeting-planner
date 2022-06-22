import React, { useCallback, useState } from 'react';

import { Calendar } from '@natscale/react-calendar';
import "../../css/EventCreation/DatePicker.css"
import '@natscale/react-calendar/dist/main.css';
import CalendarToggles from './CalendarToggles'

const toggleStates = ['Range', 'Dates']

export default function DatePicker() {
    const [dates, setDates] = useState([]);
    const [toggleState, setState] = useState('Range');

    const onChange = useCallback(
        (val) => {
            setDates(val);
        },
        [setDates],
    );

    function onToggle(newState) {
        if (dates.length === 2) {
            setDates(rangeToMultiDates(dates[0], dates[1]));
        } else if (dates.length > 2) {
            setDates([dates[0], dates[dates.length-1]]); // todo: fix 'earliest date' bug
        }
        // console.log(dates)
        setState(newState);
    }

    return (
        <div className="dateChosen">
            <div>
                <CalendarToggles
                toggleState = {toggleState}
                setState = {onToggle}/>
            </div>
            <Calendar size={360} 
            // showDualCalendar={true} 
            isRangeSelector={toggleState === toggleStates[0]} 
            noPadRangeCell={toggleState === toggleStates[0]}
            isMultiSelector={toggleState === toggleStates[1]} 
            value={dates} onChange={onChange} />
            <h2>Date Range Chosen:</h2>
            {dates.length !== 0 ? (
                // <p>{getMonthName(value[0].getMonth()) + " " + value[0].getDate() + ", " + value[0].getFullYear()}</p>
                <p>{dates[0].toDateString()}</p>
            ) : null}
            {dates.length > 1 ? (
                // <p>{getMonthName(value[1].getMonth()) + " " + value[1].getDate() + ", " + value[1].getFullYear()}</p>
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

// const getMonthName = (num) => {
//     switch (num) {
//         case 0:
//             return "Jan";
//         case 1:
//             return "Feb";
//         case 2:
//             return "Mar";
//         case 3:
//             return "Apr";
//         case 4:
//             return "May";
//         case 5:
//             return "Jun";
//         case 6:
//             return "Jul";
//         case 7:
//             return "Aug";
//         case 8:
//             return "Sep";
//         case 9:
//             return "Oct";
//         case 10:
//             return "Nov";
//         default:
//             return "Dec";
//     }
// }