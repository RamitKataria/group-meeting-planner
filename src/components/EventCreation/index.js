import DatePicker from "./DatePicker"
import TimeRangePicker from "./TimeRangerPicker";
import './index.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function EventCreation() {
    return (<div id="event-creation">
        <EventName/>
        <Grid container spacing={2}
        columns={11}
        sx={{margin:'0 auto', paddingLeft: '6em', paddingRight: '6em'}}>
            <Grid item xs={11} sx={{maxWidth: '200px'}}>
                <DatePicker/>
                <div/>
            </Grid>
            {/* <Grid item xs={6}>
                <TimeRangePicker/>
            </Grid> */}
        </Grid>
        <div id='confirm'>
            <Button variant='contained' 
            color='success'
            id='confirm' 
            sx={{borderRadius:'2em'}}
            >Create Event</Button>
        </div>
        
    </div>)
}

function EventName() {
    return (
        <div>
            <h1>Schedule An Event</h1>
            {/* <input defaultValue='Event Name' type='text' size='50' ></input> */}
        </div>
    )
}

export default EventCreation;