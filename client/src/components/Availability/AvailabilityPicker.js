import React, {useEffect, useState} from "react";
import AvailabilityTable from "./AvailabilityTable";
import {useDispatch, useSelector} from "react-redux";
import "../../css/availability-picker.css"
import { setUserSlots, setOthersAvailability } from "../../redux/availability";
import { updateAvailAsync } from "../../redux/meetings/thunks";

// root/index component of Availability components
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
    
    
    useEffect(() => {
        // update userAvailability & save in state
        if (Array.isArray(meetingInfo.userAvailability) && currentUser) {
            const currentUserAvail = meetingInfo.userAvailability.find(
                (entry) => {
                    // check if availabilty entry belongs to current user
                    if (entry.user && currentUser.uid) { // firebase user
                        return entry.user === currentUser.uid;
                    } 
                    // TODO: remove
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
            

            const othersAvailability = meetingInfo.userAvailability.filter((entry) => {
                if (entry.user && currentUser.uid) {
                    return entry.user !== currentUser.uid;
                }
                return true;
            }).map(
                (entry) => {
                    return {
                        ...entry,
                        availableSlots: entry.availableSlots.map(d => new Date(d).getTime())
                    }   
            });
            dispatch(setOthersAvailability(othersAvailability));
        }
    }, [meetingInfo])

    function changeAvailSlots(args) {
        dispatch(setUserSlots(args));
        dispatch(updateAvailAsync({
            meetingId: meetingInfo._id,
            userId: currentUser.uid,
            body: {
                user: currentUser.uid,
                availableSlots: args.map(e => new Date(e))
            }
        }))
    }

    return (
        <AvailabilityTable
            days={dates.map(d => new Date(d))}
            timeRange={timeRange.map(x => x * hourInMilliS)} 
            timeUnit={hourInMilliS}
            // setUserSlots={(args) => dispatch(setUserSlots(args))}
            setUserSlots={changeAvailSlots}
            selectedSlots={state.userAvailability}
            othersAvailability={state.othersAvailability}
        />
    );
};

export default AvailabilityPicker;
