import DatePicker from "./DatePicker"
import TimeRangePicker from "./TimeRangerPicker";
import '../../css/EventCreation/index.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

function EventCreation() {
    return (<div id="event-creation">
        {/* <EventName/> */}
        <Grid container spacing={2}
        columns={12}
        // sx={{margin:'0 auto', paddingLeft: '10%', paddingRight: '10%'}}
        >
            <Grid item className="padding-left" xs={4}></Grid>
            <Grid item className="name-field" xs={4}>
                <h1>Schedule An Event</h1>
                <div className="input">
                    <div className="input item left-padding "></div>
                        <Input 
                        className="input item"
                        label="event-name" 
                        placeholder="Enter Event Name"></Input>
                    <div className="input item right-padding"></div>
                </div>
                
            </Grid>
            <Grid item className="padding-right" xs={4}></Grid>

            <Grid item className="padding-left" md={2} xs={2}></Grid>
            <Grid item md={4} xs={8} >
                <div className="inner-flex">
                    <div className="item"></div>
                    
                    <DatePicker/>
                    <div className="item"></div>
                </div>
            </Grid>
            <Grid item className="padding-right-single-column"  md={0.1} xs={2}> </Grid>
            <Grid item className="padding-left-single-column"  md={0.1} xs={2} ></Grid>
            <Grid item id="time-range-picker-and-btn" md={4} xs={8}>
            
                <div className="inner-flex">
                    <div className="item"></div>
                        <div className="picker-and-btn">
                            <TimeRangePicker/>
                            <div id='confirm'>
                                <Button variant='contained' 
                                // color='success'
                                id='confirm' 
                                sx={{borderRadius:'2em'}}
                                >Create Event</Button>
                            </div>
                        </div>
                    <div className="item"></div>
                </div>
            </Grid>
            <Grid item className="padding-right" md={1.6} xs={2}></Grid>
            
            <Grid className="padding-left" item xs={6}></Grid>
            <Grid item xs={4}>
                
            </Grid>
            <Grid className="padding-right" item xs={2}></Grid>
        </Grid>        
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