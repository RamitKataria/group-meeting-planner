import React, {useState} from "react";
import AvailabilityTable from "./AvailabilityTable";
import {useDispatch, useSelector} from "react-redux";
import "../css/availability-picker.css"
import { setUserSlots } from "../redux/availability";

const AvailabilityPicker = () => {
    const state = useSelector((state) => state.availability);
    const dispatch = useDispatch();

    const [showEveryone, setShowEveryone] = useState(false);

    const toggleShowEveryone = () => {
      setShowEveryone(!showEveryone);
    };

    const hourInMilliS = 60 * 60 * 1000;

    return (
        <AvailabilityTable
            days={state.dates.map(d => new Date(d))}
            timeRange={state.timeRanges[0].map(x => x * hourInMilliS)}
            timeUnit={hourInMilliS}
            setUserSlots={(args) => dispatch(setUserSlots(args))}
            selectedSlots={state.userAvailability}
        />
    );
};

export default AvailabilityPicker;
