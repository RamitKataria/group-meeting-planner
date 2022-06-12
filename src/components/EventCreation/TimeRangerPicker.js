import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import '../../css/EventCreation/TimeRangePicker.css';

const sliderMarks = [
    {value: 9, label: '09:00'},
    {value: 12, label: 'Noon'},
    {value: 17, label: '17:00'}
]

function roundToHour(timeStr) {
    let time = timeStr.split(':')
    if (time[1] !== '00') {
        time[1] = '00'
    }
    return time[0] + ':' + time[1];
}

function sliderTime(timeStr) {
    return Number(timeStr.split(':')[0]);
}

function sliderTimeToString(sliderTime) {
    let timeStr = sliderTime+':00'
    timeStr = ((sliderTime / 10) < 1) ? ('0'+timeStr) : timeStr;

    return timeStr;
}

function TimeRangePicker() {
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [sliderNums, setSliderNums] = useState([9, 17]);
    
    //TODO: add redux states for start time & end time

    function handleSliderChange(event, newValues) {
        setSliderNums(newValues);
        setStartTime(sliderTimeToString(newValues[0]));
        setEndTime(sliderTimeToString(newValues[1]));
    }

    return (
        <div id='time-of-day'>
            <div>Time of Day</div>
            <div className='time-range' id='pick-time-range'>
                <div className='time-field'>
                    <label>No Earlier Than: </label>
                    <input type='time' value={startTime} max={endTime}
                        onChange={(e) => setStartTime(roundToHour(e.target.value))}
                        step={3600} />
                    {/* <TimePicker value={startTime} onChange={setStartTime} disableClock={true}/> */}
                </div>
                <div className='time-field'>
                    <label>No Later Than: </label>
                    <input type='time' value={endTime} min={startTime}
                        onChange={(e) => setEndTime(roundToHour(e.target.value))}
                        step={3600} />
                    {/* <TimePicker value={endTime} onChange={setEndTime} disableClock={true}/> */}
                </div>
                <div className='time-slider'>
                    <Box sx={{ width: '97%', paddingTop: '2em'}}>
                        <Slider
                            color='success'
                            min={4}
                            max={23}
                            step={1}
                            value={sliderNums}
                            onChange={handleSliderChange}
                            marks={sliderMarks}
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default TimeRangePicker;