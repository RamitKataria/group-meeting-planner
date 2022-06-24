import React, { useCallback, useState } from 'react';

import { Calendar } from '@natscale/react-calendar';
import "../../css/EventCreation/DatePicker.css"
import '@natscale/react-calendar/dist/main.css';
import ViewSwitch from './ViewSwitch';
import { DateRangeSharp, ElectricalServicesRounded } from '@mui/icons-material';

export default function DatePicker() {
    const [rangeDates, setRangeDates] = useState([]);
    const [multiDates, setMultiDates] = useState([])
    const [multiDateView, setView] = useState(false); // false: range view; true: multi-date view

    const onRangeChange = useCallback(
        (val) => {
            setMultiDates(rangeToMultiDates(val[0], val[1]));
            setRangeDates(val);
        },
        [setRangeDates],
    );

    const onMultiDateChange = useCallback(
        (val) => {
            setMultiDates(val);
        },
        [setMultiDates],
    )

    function onSwitch(newState) {
        if (multiDateView & multiDates.length > 0) {
            setRangeDates(multiDatesToRange(multiDates)); 
        }
        setView(newState);
    }

    return (
        <div className="date-selection">
            <h2>What days might work? </h2>
            <div class='date-selection-switch'>
                <ViewSwitch
                checked = {multiDateView}
                handleSwitch = {onSwitch}
                />
            </div>
            <Calendar size={360} 
            fontSize={18}
            isRangeSelector={!multiDateView}
            noPadRangeCell={!multiDateView}
            isMultiSelector={multiDateView}
            value={multiDateView ? multiDates : rangeDates} onChange={multiDateView ? onMultiDateChange : onRangeChange} />
            <DateSelectionText
            multiDateView={multiDateView}
            rangeDates={rangeDates}
            multiDates={multiDates}
            />
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

function multiDatesToRange(multiDates) {
    if (multiDates < 1) {
        return [];
    }
    const earliest = multiDates.reduce((previous, current) => {
        return previous > current ? current : previous;
    })
    var latest = multiDates.reduce((previous, current) => {
        return previous > current ? previous : current;
    })
    return [earliest, latest]
}

function DateSelectionText(props) {
    const range = multiDatesToRange(props.multiDates);

    return (
        <div id="date-selection-text">
            { (props.multiDates.length > 1) ? (
                <div>
                    <p>Between <strong>{range[0].toDateString()}</strong> and <strong>{range[1].toDateString()}</strong></p>
                </div>
            ) : null}
            { (props.multiDates.length > 0 & props.multiDates.length <= 1) ? (
                <div>
                    <p>On <strong>{range[0].toDateString()}</strong></p>
                </div>
            ) : <p> </p>}
        </div>
    )
}