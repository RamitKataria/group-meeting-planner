import "../../css/availability-page.css";
import {useEffect, useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AvailabilityPicker from "../Availability/AvailabilityPicker";
import {getMeeting, readICSAndUpdate} from "../../redux/meetings/service";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as React from "react";
import {Typography, Box} from "@mui/material";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Stack from "@mui/material/Stack";
import TimezoneSelect, { allTimezones } from 'react-timezone-select'

import {useSelector, useDispatch} from "react-redux";
import { setGuestDialogue } from "../../redux/availability";
import Auth from "../../firebaseApp"
import DialogContentText from "@mui/material/DialogContentText";
import {onAuthStateChanged} from "firebase/auth";
import LoadingBar from "../LoadingBar";

const useViewport = () => {
	const [width, setWidth] = React.useState(window.innerWidth);

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	// Return the width so we can use it in our components
	return { width };
}

export default function AvailabilityPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { meetingId } = useParams();
	const [meetingInfo, setMeetingInfo] = useState({});
	const [creatorInfo, setCreatorInfo] = useState({});

	// make use of the new Intl browser API to set user's own timezone
	const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [allTimeZones, setAllTimeZones] = useState(allTimezones);
	// const [windowSize, setWindowSize] = React.useState(window.innerWidth);
	const { width } = useViewport();

	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(Auth.currentUser);
	const availabilityInfo = useSelector((state) => state.availability);

	useEffect(() => {
		async function populateMeetingInfo() {
			const response = await getMeeting(meetingId);
			setMeetingInfo(response);

			if (response.createdByInfo) {
				setCreatorInfo({name: response.createdByInfo.name})
			} else {
				setCreatorInfo({name: 'Guest'})
			}
			setLoading(false);
		}
		populateMeetingInfo();

		// overwrite timezone labels.
		Object.keys(allTimeZones).forEach(function(key) {
			allTimeZones[key] = key;
		});

	}, []);

	useEffect(() => {
		onAuthStateChanged(Auth, (user) => {
			setCurrentUser(user);
		})
	}, []);

	if (!currentUser) {
		setCurrentUser({
			displayName: 'Guest',
			uid: '',
			email: '',
		})
	}

	const handleCopiedToClipboard = () => {
		const link = window.location.host + "/home/" + meetingInfo.id;
		navigator.clipboard.writeText(link)
			.then(() => {
				toast("🗒️ Copied to clipboard!");
			})
			.catch(() => {
				alert("something went wrong with clipboard");
			});
	}

	const handleRedirectLink = (page) => {
		navigate("../" + page);
	}

	const importICS = async () => {
		const response = await readICSAndUpdate(meetingId, currentUser.uid);
		if (Object.keys(response).length === 0) {
			toast.error("Invalid ICS!!");
		} else {
			setMeetingInfo(response);
			toast("📅 ICS imported!!");
		}

	}

	// const createGuestAccount = (event) => {
	// 	event.preventDefault();
	// 	const name = event.target.name.value;
	// 	const email = event.target.email.value;
	// 	alert(name + " " + email);
	// 	handleClose();
	// }

	const handleClickOpen = () => {
		// setOpenGuestDialog(true);
		dispatch(setGuestDialogue(true));
	};

	const handleClose = () => {
		// setOpenGuestDialog(false);
		dispatch(setGuestDialogue(false));
	};

	const handleTimeZone = (event) => {
		// timezone object
		setSelectedTimezone(event.value);
		console.log(JSON.stringify(event));
	};

	if (loading) {
		return <LoadingBar/>
	}
	return (
		<div >
			<Box sx={{mx: "auto", my: 5, width: "70%"}}>
				<Typography
					sx={{flex: '1 1 100%', fontWeight: 'bold', my: 5, "textAlign": "center"}}
					variant="h4"
					component="div"
				>
					Choose Your Availability
				</Typography>
				<Grid
					container
					spacing={8}
				>

					<Grid item lg={5} sm={12} >
						<Paper elevation={8}>
							<Box sx={{py: 3, px: 5}}>
								<Box sx={{justifyContent: 'space-between', display: 'flex', mb: 2, mt: 1}}>
									<Typography sx={{flex: '1 1 100%', fontWeight: 'bold'}} variant='h4'  >
										{meetingInfo.name}
									</Typography>
									<ContentCopyIcon sx={{cursor: 'pointer'}} fontSize="small" onClick={handleCopiedToClipboard}></ContentCopyIcon>
								</Box>
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
								<table>
									<thead>
									<tr>
										<td className="table-header"><strong>Description: </strong></td>
										<td>{meetingInfo.description}</td>
									</tr>
									<tr>
										<td className="table-header"><strong>Created By: </strong></td>
										<td>{creatorInfo.name}</td>
									</tr>
									</thead>
								</table>
							</Box>
						</Paper>
						<Box sx={{my:4}}>
							<Typography
								sx={{flex: '1 1 100%', fontWeight: 'bold'}}
								variant="h7"
								component="div"
							>
								Time Zone:
							</Typography>
							<TimezoneSelect
								value={selectedTimezone}
								onChange={handleTimeZone}
								timezones={{
									...allTimeZones
								}}
							/>
						</Box>
						{width >= 1200 ?
						<AvailableTable
							listAvailable={availabilityInfo.available}
							listUnavailable={availabilityInfo.unavailable}/>
						: null}
					</Grid>
					<Grid item lg={7} sm={12}>

						<Box sx={{justifyContent:'flex-end', display:'flex', mb: 3}}>
							<Button variant="contained" startIcon={<SaveAltIcon />} onClick={importICS} >
								Import ICS
							</Button>
						</Box>
						<AvailabilityPicker
							meetingInfo={meetingInfo}
							currentUser={currentUser}
							timezoneLabel={selectedTimezone}
							/>
						{width < 1200 ?
							<AvailableTable
								listAvailable={availabilityInfo.available}
								listUnavailable={availabilityInfo.unavailable}/>
						: null}
					</Grid>
				</Grid>


				<Dialog open={availabilityInfo.guestDialogue} onClose={handleClose}>
					{/*{false && <DialogContent sx ={{'padding-bottom': '0em'}}>*/}
					{/*	<form onSubmit={createGuestAccount}>*/}
					{/*		<TextField*/}
					{/*			autoFocus*/}
					{/*			margin="dense"*/}
					{/*			id="name"*/}
					{/*			label="Enter your name:"*/}
					{/*			type="text"*/}
					{/*			name="name"*/}
					{/*			fullWidth*/}
					{/*			variant="standard"*/}
					{/*			required*/}
					{/*		/>*/}
					{/*		<TextField*/}
					{/*			margin="dense"*/}
					{/*			id="email"*/}
					{/*			label="Email (optional):"*/}
					{/*			type="email"*/}
					{/*			name="email"*/}
					{/*			fullWidth*/}
					{/*			variant="standard"*/}
					{/*		/>*/}
					{/*		<DialogActions sx={{mt:2}}>*/}
					{/*			<Button onClick={handleClose}>Cancel</Button>*/}
					{/*			<Button type="submit">Go</Button>*/}
					{/*		</DialogActions>*/}
					{/*	</form>*/}
					{/*</DialogContent>}*/}

					<DialogTitle>
						Oops!
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							You don't have an account with us!
						</DialogContentText>
						<DialogContentText>
							Guest account feature coming soon. Please log in or sign up for now.
						</DialogContentText>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							spacing={2}
							sx={{mt:4}}
						>
							<Button variant="contained" sx={{minWidth:150}} startIcon={<LoginIcon />}
									onClick={() => handleRedirectLink("signup")} >
								Register/Sign Up
							</Button>

							<Button variant="contained" sx={{minWidth:150}} startIcon={<PersonAddIcon />}
									onClick={() => handleRedirectLink("signin")} >
								Log In
							</Button>
						</Stack>
					</DialogContent>
				</Dialog>
			</Box>
		</div>
	);
}

function AvailableTable({listAvailable, listUnavailable}) {

	function AvailRow({cell1, cell2, idx}) {
		return (
		<TableRow
		key={idx}
		sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell component="th" scope="row" align="center">
				{cell1}
			</TableCell>
			<TableCell align="center">
				{cell2}
			</TableCell>
		</TableRow>)
	}

	function generateTableContent() {
		let tableContent = [];
		for (let i = 0; i < Math.max(listAvailable.length, listUnavailable.length); i++) {
			if (listAvailable[i] && listUnavailable[i]) {
				tableContent.push([listAvailable[i], listUnavailable[i]]);
			} else if (listAvailable[i]) {
				tableContent.push([listAvailable[i], ""]);
			} else if (listUnavailable[i]) {
				tableContent.push(["", listUnavailable[i]]);
			}
		}

		return tableContent.map((row, idx) => {
			return <AvailRow
					cell1={row[0]}
					cell2={row[1]}
					idx={idx}/>
		})
	}

	return (
		<TableContainer component={Paper} sx={{ mt: 5 }}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center" sx={{ fontWeight: 'bold' }}>AVAILABLE</TableCell>
						<TableCell align="center" sx={{ fontWeight: 'bold' }}>UNAVAILABLE</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{generateTableContent()}
				</TableBody>
			</Table>
		</TableContainer>
	)
}