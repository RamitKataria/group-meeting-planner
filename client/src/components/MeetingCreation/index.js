import DatePicker from "./DatePicker"
import TimeRangePicker from "./TimeRangerPicker";
import '../../css/EventCreation/index.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import {storeMeetingName, resetAddMeeting} from '../../redux/meetingCreation';
import { addMeetingsAsync } from "../../redux/meetings/thunks";
import { creationSliceToInstance } from "./utils";
import { useEffect } from "react";
import { REQUEST_STATE } from "../../redux/utils";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import React from "react";

function MeetingCreation() {
    const meetingCreationSlice = useSelector(state => state.meetingCreation)
    const addMeeting = useSelector(state => state.meetingCreation.addMeeting)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleCreateMeeting() {
        const instance = creationSliceToInstance(meetingCreationSlice); 
        dispatch(addMeetingsAsync(instance));
        console.log(instance)
    }

    function handleNameChange(e) {
        dispatch(storeMeetingName(e.target.value))
    }

    useEffect( () => {
        console.log(addMeeting)
        if (addMeeting.state === REQUEST_STATE.FULFILLED) {
            console.log(addMeeting.response);
            dispatch(resetAddMeeting());
            navigate('../home/' + addMeeting.response._id);
        }
    }, [addMeeting, dispatch, navigate])

    return (
        <div>
            <Typography
                sx={{flex: '1 1 100%', fontWeight: 'bold', my: 5, "textAlign": "center"}}
                variant="h4"
                component="div"
            >
                Schedule A Meeting
            </Typography>
            <Grid container spacing={2}
                columns={12}>
                <Grid item className="padding-left" xs={3}></Grid>
                <Grid item className="name-field" xs={6}>
                    <div className="input">
                        <div className="input item padding "></div>
                            <Input
                            value={meetingCreationSlice['name']}
                            onChange={handleNameChange}
                            className="input item"
                            label="name"
                            placeholder="Enter Meeting Name"></Input>
                        <div className="input item padding"></div>
                    </div>

                </Grid>
                <Grid item className="padding-right" xs={3}></Grid>

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
                                <CreateMeetingBtn
                                    handleClick={handleCreateMeeting}
                                    loading={addMeeting.state === REQUEST_STATE.PENDING}
                                />
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

function CreateMeetingBtn(props) {
    return (
        <div id='confirm'>
            <Button variant='contained' 
            id='confirm' 
            sx={{borderRadius:'2em'}}
            onClick={props.handleClick}
            disabled={props.loading}
            >Create Meeting</Button>
            {props.loading && (
                <CircularProgress
                    size={24}
                    sx={{
                    // color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                    }}
                />
            )}
        </div>
    )
}

export default MeetingCreation;