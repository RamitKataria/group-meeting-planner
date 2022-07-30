import "../../css/home.css";
import React , {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import {theme} from '../../theme/color-theme'
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { getUserBasedOnUserId, getMeetingsBasedOnUserId, } from "../../redux/users/service";
import {getMeeting} from "../../redux/meetings/service";

const handleCopiedToClipboard = (id) => {
	const link = "http://localhost:3000/home/" + id;
	navigator.clipboard.writeText(link)
		.then(() => {
			toast("🗒️ Copied to clipboard!");
		})
		.catch(() => {
			alert("something went wrong with clipboard");
		});
}

export default function RegisteredHome() {
	const navigate = useNavigate();
	const [linkMeetingID, setLinkMeetingID] = useState("");
	const [currentUserID, setCurrentUserID] = useState("d515b255-0691-4778-9796-cb4f41840136"); // temporary
	const [currentUser, setCurrentUser] = useState({}); // user info
	const [allMeetings, setAllMeetings] = useState([]); // meetings (including details) belonged to user
	const [allMeetingsID, setAllMeetingsID] = useState([]); // meetingsID (only IDs) belonged to user

	useEffect(() => {
		async function populateAccountInfo() {
			const response = await getUserBasedOnUserId(currentUserID);
			setCurrentUser(response);
		}
		populateAccountInfo();
	}, []);

	useEffect( () => {
		async function populateAllMeetingsList() {
			const currentUserMeetingsID = await getMeetingsBasedOnUserId(currentUserID);
			setAllMeetingsID(currentUserMeetingsID);

			const response = await Promise.all(currentUserMeetingsID.map((meetingID) => {
				return getMeeting(meetingID);
			}));

			const sortedMeetings = response.sort(
				(meetingA, meetingB) => new Date(meetingA.dateTimeUpdated) - new Date(meetingB.dateTimeUpdated),
			);
			setAllMeetings(sortedMeetings);
		}
		populateAllMeetingsList();
	}, []);

	const handleRedirectLink = (page) => {
		navigate(page);
	}

	const handleInputChange = (event) => {
		setLinkMeetingID(event.target.value);
	};

	const dateOptions = {
		weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
		hour12: false,
		timeZoneName: 'short',
	};

	const dateTimeFormat = new Intl.DateTimeFormat('default', dateOptions);

	function MeetingCard(props) {
		return (
			<Card elevation={2} sx={{ minWidth: 275,  mb: 3}}>
				<CardContent>
					<ToastContainer
						position="top-right"
						autoClose={1000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
					<Box sx={{justifyContent: 'space-between', display: 'flex'}}>
						<Typography sx={{ fontSize: 14,}} color="text.secondary" gutterBottom>
							{dateTimeFormat.format(new Date(props.meeting.dateTimeUpdated))}
						</Typography>
						<ContentCopyIcon sx={{cursor: 'pointer'}} fontSize="small" onClick={() => handleCopiedToClipboard(props.meeting._id)}></ContentCopyIcon>
					</Box>

					<Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
						{props.meeting.name}
					</Typography>
					{/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
					{/*	adjective*/}
					{/*</Typography>*/}
					<Typography variant="body2" color="text.secondary">
						{props.meeting.description}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" onClick={() => handleRedirectLink("./" + props.meeting._id)}>Go to Meeting</Button>
				</CardActions>
			</Card>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					// backgroundImage: 'url(https://images.unsplash.com/photo-1489769002049-ccd828976a6c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&dl=john-mark-arnold-ti4kGLkGgmU-unsplash.jpg)',
					// backgroundRepeat: 'no-repeat',
					// backgroundPosition: 'center center',
					// backgroundSize: 'cover',
					// height: '100%',
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
							// backgroundSize: 'cover',
				}}
			>
				<Box sx={{mx: "auto", my: 5, width: "70%"}}>
					<Grid
						container
						sx={{pt: 5}}
						spacing={6}
						justifyContent="center"
						alignItems="center"
					>

						<Grid item lg={6} sm={12} >
							<Paper elevation={8} sx={{maxWidth: 600}}>
								<Box sx={{px:7, py: 7}} >
									<Typography
										sx={{flex: '1 1 100%', fontWeight: 'bold', mb: 5, "textAlign": "center"}}
										variant="h3"
										component="div"
									>
										Welcome back {currentUser.name} !
									</Typography>

									<Typography
										sx={{flex: '1 1 100%', my: 5, "textAlign": "center"}}
										variant="h5"
										component="div"
									>
										Let's continue where you left off!
									</Typography>

									<Box sx={{minHeight: 40}}></Box>
									<Stack
										direction="column"
										justifyContent="center"
										alignItems="center"
										spacing={2}
									>

										<Button variant="contained" sx={{minWidth:250}} startIcon={<BorderColorIcon/>}
												onClick={() => handleRedirectLink("../new-meeting")} >
											Create New Meeting
										</Button>

										<Typography
											sx={{flex: '1 1 100%', mb: 5, "textAlign": "center"}}
											variant="h6"
											component="div"
										>
											or
										</Typography>

										<Box sx={{minHeight: 10}}></Box>

									</Stack>
									<Typography
										sx={{flex: '1 1 100%', mb: 5, "textAlign": "center"}}
										variant="h6"
										component="div"
									>
										Have a meeting id? Paste it below:
									</Typography>

									<input
										className="link-input"
										placeholder="meeting id"
										name="link"
										type="text"
										onChange={handleInputChange}
										required
									/>

									<Box sx={{mt: 5, justifyContent: 'flex-end', display: 'flex'}}>
										<Button variant="contained" endIcon={<ArrowForwardIcon/>} onClick={() => handleRedirectLink("./" + linkMeetingID)}>
											Go!
										</Button>
									</Box>
								</Box>
							</Paper>
						</Grid>

						<Grid item lg={6} sm={12}>
							<Paper elevation={8} sx={{maxWidth: 600}}>
								<Box sx={{px:7, py: 7}} >
									<Typography
										sx={{flex: '1 1 100%', mb: 5, "textAlign": "center"}}
										variant="h4"
										component="div"
									>
										Upcoming Meetings
									</Typography>

									{allMeetings.length !== 0 ? ([
										<MeetingCard key="first-card" meeting={allMeetings[0]}></MeetingCard>,

										<MeetingCard key="second-card" meeting={allMeetings[1]}></MeetingCard>]
									) : null}
									<Box sx={{justifyContent: 'flex-end', display: 'flex'}}>
										<Button onClick={() => handleRedirectLink("../all-meetings")}>Show All Meetings</Button>
									</Box>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</ThemeProvider>
	);
}