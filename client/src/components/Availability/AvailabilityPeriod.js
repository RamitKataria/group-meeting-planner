import React from "react";
import {useDispatch} from "react-redux";
import {setAvailable, setUnavailable} from "../../redux/availability";

const AvailabilityPeriod = ({
                                start, duration, processSelection, selected, fractionAvailable, availableList
                            }) => {
    const dispatch = useDispatch();

    function availabilityClass(fraction) {
        if (fraction === 1) {
            return ' allAvail';
        } else if (fraction > 0) {
            return ' someAvail';
        } else {
            return ' noneAvail';
        }
    }

    function onEnter(event) {
        processSelection(event);
        dispatch(setAvailable(availableList.availables));
        dispatch(setUnavailable(availableList.unavailables));
    }

    function onLeave() {
        dispatch(setAvailable([]));
        dispatch(setUnavailable([]));
    }

    const availAlpha = fractionAvailable ? Math.max(0.1, fractionAvailable) : 0

    const cellColour = {
        backgroundColor: selected ?
            '#5fa2db' :
            'rgb(236, 120, 97, ' + availAlpha + ')'
    }

    return (
        <>
            <td
                className={"availability-table-cell"
                    + (selected ? " selected" : "")}
                onMouseEnter={onEnter} onMouseLeave={onLeave}
                id={start}
                style={cellColour}>
            </td>
        </>
    );
};

export default AvailabilityPeriod;
