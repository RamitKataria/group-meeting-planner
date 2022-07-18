import React, { useState } from 'react';
import '../../css/EventCreation/time-range-picker.css';
import TimeSlider from './TimeSlider';
import {storeStartTime, storeEndTime} from '../../redux/meetingCreation'
import { useSelector, useDispatch } from 'react-redux';
import { sliderTimeToString, sliderTime, roundToHour } from './utils';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";

const sliderMarks = [
    {value: 9, label: '09:00'},
    {value: 12, label: 'Noon'},
    {value: 17, label: '17:00'}
]

function TimeRangePicker() {
    const dispatch = useDispatch();
    const meetingCreationStore = useSelector(state => state.meetingCreation);

    const [startTime, setStartTime] = useState(sliderTimeToString(meetingCreationStore['startTime']));
    const [endTime, setEndTime] = useState(sliderTimeToString(meetingCreationStore['endTime']));
    const [sliderNums, setSliderNums] = useState([meetingCreationStore['startTime'], meetingCreationStore['endTime']]);
    
    function handleSliderChange(event, newValues) {
        setSliderNums(newValues);
        if (sliderNums[0] != newValues[0]) {
            setStartTime(sliderTimeToString(newValues[0]));
            dispatch(storeStartTime(newValues[0]))
        } else {
            setEndTime(sliderTimeToString(newValues[1]));
            dispatch(storeEndTime(newValues[1]))
        }
    }

    function handleStartTimeChange(e) {
        const targetValue = sliderTime(e.target.value) < sliderTime(endTime) ? 
        e.target.value : endTime; 
        setSliderNums([sliderTime(targetValue), sliderNums[1]])
        setStartTime(roundToHour(targetValue))
        dispatch(storeStartTime(sliderTime(targetValue)))
    }

    function handleEndTimeChange(e) {
        const targetValue = sliderTime(e.target.value) > sliderTime(startTime) ? 
        e.target.value : startTime; 
        setSliderNums([sliderNums[0], sliderTime(targetValue)])
        setEndTime(roundToHour(targetValue))
        dispatch(storeEndTime(sliderTime(targetValue)))
    }

    return (
        <Box sx={{minHeight: 400, minWidth: 350}}>
            <h2>What time might work? </h2>
            <Box sx={{minHeight: 35}}></Box>
            <Paper elevation={8}>
                <div className='pick-time-range' id='pick-time-range'>
                    <div className='time-field'>
                        <label className="time-label">No Earlier Than: </label>
                        <input type='time' value={startTime}
                            onChange={handleStartTimeChange}
                            step={3600} />
                        {/* <TimePicker value={startTime} onChange={setStartTime} disableClock={true}/> */}
                    </div>
                    <div className='time-field'>
                        <label className="time-label">No Later Than: </label>
                        <input type='time' value={endTime}
                            onChange={handleEndTimeChange}
                            step={3600} />
                        {/* <TimePicker value={endTime} onChange={setEndTime} disableClock={true}/> */}
                    </div>
                    <TimeSlider
                    sliderNums = {sliderNums}
                    handleSliderChange={handleSliderChange}
                    sliderMarks = {sliderMarks}/>
                </div>
            </Paper>
            <TimeRangeText
            startTime={startTime}
            endTime={endTime}/>
        </Box>
    );
}

function TimeRangeText(props) {

    return (
        <div id="time-range-text">
            { (props.startTime !== null & props.endTime !== null) ? (
                <div>
                    <p>Between <strong>{props.startTime}</strong> and <strong>{props.endTime}</strong></p>
                </div>
            ) : <p></p>}
        </div>
    )
}

export default TimeRangePicker;