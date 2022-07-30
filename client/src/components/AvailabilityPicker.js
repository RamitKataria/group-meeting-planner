import React, {useEffect, useState} from "react";
import AvailabilityTable from "./AvailabilityTable";
import {useDispatch, useSelector} from "react-redux";
import "../css/availability-picker.css"
import { setUserSlots } from "../redux/availability";

const AvailabilityPicker = ({meetingInfo, currentUser}) => {
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
    if (Array.isArray(meetingInfo.range) && Array.isArray(meetingInfo.range[0])) {
        dates = meetingInfo.range.map(arr => {
            const day = new Date(arr[0]);
            day.setHours(0);
            return day;
        })
        timeRange = meetingInfo.range[0].map(time => new Date(time).getHours())
    }
    
    // update userSlots in state
    useEffect(() => {
        if (Array.isArray(meetingInfo.userAvailability)) {
            const currentUserAvail = meetingInfo.userAvailability.find(
                (entry) => {
                    // check if availabilty entry belongs to current user
                    if (entry.user && currentUser.uid) { // firebase user
                        return entry.user === currentUser.uid;
                    } 
                    // guest user TODO: remove
                    else if (entry.user.displayName && currentUser.displayName) { 
                        return entry.user.displayName === currentUser.displayName;
                    }
                    else return false;
                }
            )
            if (currentUserAvail) {
                dispatch(setUserSlots(currentUserAvail.availableSlots.map(
                    d => new Date(d).getTime()
                )))
            }
        }
    }, [meetingInfo])
    

    return (
        <AvailabilityTable
            days={dates.map(d => new Date(d))}
            timeRange={timeRange.map(x => x * hourInMilliS)} 
            timeUnit={hourInMilliS}
            setUserSlots={(args) => dispatch(setUserSlots(args))}
            selectedSlots={state.userAvailability}
            //TODO: other-user availability
        />
    );
};

export default AvailabilityPicker;
