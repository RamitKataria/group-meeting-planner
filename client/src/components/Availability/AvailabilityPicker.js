import React, {useEffect, useState} from "react";
import AvailabilityTable from "./AvailabilityTable";
import {useDispatch, useSelector} from "react-redux";
import "../../css/availability-picker.css"
import { setUserSlots, setOthersAvailability, setGuestDialogue } from "../../redux/availability";
import { updateAvailAsync } from "../../redux/meetings/thunks";
import { current } from "@reduxjs/toolkit";

// root/index component of Availability components
const AvailabilityPicker = ({meetingInfo, currentUser, timezoneLabel='UTC'}) => {
    const state = useSelector((state) => state.availability);
    const dispatch = useDispatch();

    const [showEveryone, setShowEveryone] = useState(false);

    const toggleShowEveryone = () => {
      setShowEveryone(!showEveryone);
    };

    const hourInMilliS = 60 * 60 * 1000;
    // const offsetInHours = timezoneOffset ? timezoneOffset : -(new Date().getTimezoneOffset() / 60)
    // console.log(offsetInHours)
    // convert meetingInfo to availabilityTable format
    // let dates = [new Date().getTime()];
    // let timeRanges = [9, 17]; 
    let newRanges = [];
    if (Array.isArray(meetingInfo.range) && Array.isArray(meetingInfo.range[0])) {
        // dates = meetingInfo.range.map(arr => {
        //     const day = new Date(arr[0]);
        //     day.setHours(0);
        //     return day;
        // })
        // timeRanges = meetingInfo.range[0].map(time => new Date(time).getHours())
        
        for (let i = 0; i < meetingInfo.range.length; i++) {
            newRanges.push(meetingInfo.range[i].map(time => new Date(time)))
        }
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
    }, [meetingInfo, currentUser])

    /**
     * Behaviour upon clicking an availability slot
     */
    function changeAvailSlots(args) {
        if (currentUser.uid === '') {
            dispatch(setGuestDialogue(true));
        } else {
            dispatch(setUserSlots(args));
            dispatch(updateAvailAsync({
                meetingId: meetingInfo.id,
                userId: currentUser.uid,
                body: {
                    user: currentUser.uid,
                    availableSlots: args.map(e => new Date(e))
                }
            }))
        }
    }

    function timeRangeInMilliS(timeRanges) {
        return timeRanges = timeRanges.map(x => x * hourInMilliS);
    }

    return (
        <AvailabilityTable
            timeUnit={hourInMilliS}
            timeZoneLabel={timezoneLabel}
            setUserSlots={changeAvailSlots}
            selectedSlots={state.userAvailability}
            othersAvailability={state.othersAvailability}
            ranges={newRanges}
        />
    );
};

export default AvailabilityPicker;
