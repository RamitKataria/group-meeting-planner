import React, {useEffect} from "react";
import AvailabilityTable from "./AvailabilityTable";
import {useDispatch, useSelector} from "react-redux";
import "../../css/availability-picker.css"
import { setUserSlots, setOthersAvailability, setGuestDialogue } from "../../redux/availability";
import { updateAvailAsync } from "../../redux/meetings/thunks";

const AvailabilityPicker = ({meetingInfo, currentUser, timezoneLabel='UTC'}) => {
    const state = useSelector((state) => state.availability);
    const dispatch = useDispatch();

    const hourInMilliS = 60 * 60 * 1000;
    let newRanges = [];
    if (Array.isArray(meetingInfo.range) && Array.isArray(meetingInfo.range[0])) {
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
                    // edge case for robustness
                    else if (entry.userInfo.displayName && currentUser.displayName) { 
                        return entry.userInfo.displayName === currentUser.displayName;
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
