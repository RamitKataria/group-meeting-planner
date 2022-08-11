import DatePicker from "./DatePicker"
import TimeRangePicker from "./TimeRangerPicker";
import '../../css/EventCreation/index.css'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch, useSelector} from 'react-redux';
import {resetAddMeeting, setCurrUser, storeDescription, storeMeetingName} from '../../redux/meetingCreation';
import {addMeetingsAsync} from "../../redux/meetings/thunks";
import {creationSliceToInstance} from "./utils";
import React, {useEffect} from "react";
import {REQUEST_STATE} from "../../redux/utils";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";

import Auth from "../../firebaseApp"
import {onAuthStateChanged} from "firebase/auth";

function MeetingCreation() {
    const meetingCreationSlice = useSelector(state => state.meetingCreation)
    const addMeeting = useSelector(state => state.meetingCreation.addMeeting)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleCreateMeeting() {
        const meetingInstance = creationSliceToInstance(meetingCreationSlice);
        dispatch(addMeetingsAsync(meetingInstance));
        console.log(meetingInstance)
    }

    function handleNameChange(e) {
        dispatch(storeMeetingName(e.target.value))
    }

    function handleDescriptionChange(e) {
        dispatch(storeDescription(e.target.value))
    }

    useEffect(() => {
        console.log(addMeeting)
        if (addMeeting.state === REQUEST_STATE.FULFILLED) {
            console.log(addMeeting.response);
            dispatch(resetAddMeeting());
            navigate('../home/' + addMeeting.response.id);
        }
    }, [addMeeting, dispatch, navigate])

    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            dispatch(setCurrUser(user.toJSON()));
        })
    }, []);

    return (
        <div>
            <Typography
                sx={{flex: '1 1 100%', fontWeight: 'bold', my: 5, "textAlign": "center"}}
                variant="h4"
                component="div"
            >
                Schedule A Meeting
            </Typography>
            <Box sx={{mx: "auto", my: 5, width: "70%"}}>
                <Grid container spacing={2} columns={12} alignItems="flex-start" justifyContent="space-around">
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={3}></Grid>

                    <Grid item xs={12}>
                        <div className="input">
                            <div className="input item padding "></div>
                            <Input
                                value={meetingCreationSlice['description']}
                                onChange={handleDescriptionChange}
                                className="input item"
                                label="name"
                                placeholder="A brief description.."></Input>
                            <div className="input item padding"></div>
                        </div>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <DatePicker/>
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <div className="picker-and-btn">
                                <TimeRangePicker/>
                                <CreateMeetingBtn
                                    handleClick={handleCreateMeeting}
                                    loading={addMeeting.state === REQUEST_STATE.PENDING}
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>)
}

function CreateMeetingBtn(props) {
    return (
        <div id='confirm'>
            <Button variant="contained" sx={{mt: 5}} startIcon={<BorderColorIcon/>} onClick={props.handleClick}
                    disabled={props.loading}>
                Create Meeting
            </Button>

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