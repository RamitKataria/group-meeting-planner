import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux';
import { setDates } from '../../actions/EventCreation';
import './DatePicker.css'

function DatePicker() {
    // const [date, setDate] = useState(new Date());

    const datesPicked = useSelector(state => state.datesPicked);
    const dispatch = useDispatch();

    function handleChange(dates) {
        // dispatch action to set dates in store
        console.log(dates)
        dispatch(setDates(dates[0], dates[1]))
    }

    function printDate(date) {
        if (date.length > 0) {
            return (
                <p className='text-center'>
                    <span className='bold'>Start:</span>{' '}
                    {new Date(date[0]).toDateString()}
                    &nbsp;|&nbsp;
                    <span className='bold'>End:</span> {new Date(date[1]).toDateString()}
                </p>
            )
        } else {
            return (
                <p className='text-center'>
                    <span className='bold'>Selected Date:</span>{' '}
                    {date}
                </p>
            )
        }
    }

    return (
      <div id='possible-days'>
        <div>
            <text>Possible Day(s)</text>
        </div>
        <div className='calendar-container'>
          <Calendar onChange={handleChange} selectRange={true}/>
        </div>
        {/* {printDate(datesPicked)} */}
      </div>
    );

}

export default DatePicker;