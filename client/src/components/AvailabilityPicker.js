import React, {useState} from "react";
import AvailabilityTable from "./AvailabilityTable";
import {useDispatch, useSelector} from "react-redux";
import "../css/availability-picker.css"
import { setUserSlots } from "../redux/availability";

const AvailabilityPicker = ({meetingInfo}) => {
    const state = useSelector((state) => state.availability);
    const dispatch = useDispatch();

    const [showEveryone, setShowEveryone] = useState(false);

    const toggleShowEveryone = () => {
      setShowEveryone(!showEveryone);
    };

    const hourInMilliS = 60 * 60 * 1000;


    // convert meetingInfo to availabilityTable format
    var dates = state.dates;
    var timeRange = state.timeRanges[0]; 
    
    if (meetingInfo.range && meetingInfo.range.length && meetingInfo.range[0].length) {
        dates = meetingInfo.range.map(arr => {
            const day = new Date(arr[0]);
            day.setHours(0);
            return day;
        })
        timeRange = meetingInfo.range[0].map(time => new Date(time).getHours())
    }


    return (
        <AvailabilityTable
            days={dates.map(d => new Date(d))}
            //TODO: support multi ranges
            timeRange={timeRange.map(x => x * hourInMilliS)} 
            timeUnit={hourInMilliS}
            setUserSlots={(args) => dispatch(setUserSlots(args))}
            selectedSlots={state.userAvailability}
        />
    );
};

export default AvailabilityPicker;
