import "../../css/availability-page.css";
import { useDispatch } from "react-redux";
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
import ClearIcon from '@mui/icons-material/Clear';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AvailabilityPicker from "../Availability/AvailabilityPicker";
import {getMeeting} from "../../redux/meetings/service";
import {getUserBasedOnFirebaseId} from "../../redux/users/service";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as React from "react";
import {LinearProgress, Typography, Box} from "@mui/material";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Stack from "@mui/material/Stack";

import {useSelector} from "react-redux";
import Auth from "../../firebaseApp"
import {onAuthStateChanged} from "firebase/auth";

export default function AvailabilityPage() {
	const navigate = useNavigate();

	const { meetingId } = useParams();
	const [meetingInfo, setMeetingInfo] = useState({});
	const [creatorInfo, setCreatorInfo] = useState({});
	const [openGuestDialog, setOpenGuestDialog] = React.useState(false);

	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(Auth.currentUser);
	const availabilityInfo = useSelector((state) => state.availability);

	useEffect(() => {
		async function populateMeetingInfo() {
			const response = await getMeeting(meetingId);
			setMeetingInfo(response);
			// const response2 = await getUserBasedOnUserId(response.createdBy);
			// setCreatorInfo(response2);
			// console.log(response2);

			// TODO: for testing only
			if (response.creatorDisplayName) {
				setCreatorInfo({name: response.creatorDisplayName})
			} else {
				setCreatorInfo({name: 'Creator'})
			}
			setLoading(false);
		}
		populateMeetingInfo();

		}, []);

	useEffect(() => {
		onAuthStateChanged(Auth, (user) => {
			setCurrentUser(user);
		})
	}, []);

	// TODO: remove? fallback for user not logged in
	if (!currentUser) {
		setCurrentUser({
			uid: '',
			email: '',
		})
	}

	const dispatch = useDispatch();

	const handleCopiedToClipboard = () => {
		const link = window.location.host + "/home/" + meetingInfo._id;
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

	const importICS = () => {
		// TODO: populate ics into table, disabled for guest.
	}

	const removeICS = () => {
		// TODO: remove ics from table, disabled for guest.
	}

	const createGuestAccount = (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const email = event.target.email.value;
		alert(name + " " + email);
		// TODO: create guest account in firebase.
		handleClose();
	}

	const handleClickOpen = () => {
		setOpenGuestDialog(true);
	};

	const handleClose = () => {
		setOpenGuestDialog(false);
	};

	return (
		<div >
			{loading && <LoadingBar/>}
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
						<AvailableTable
							listAvailable={availabilityInfo.available}
							listUnavailable={availabilityInfo.unavailable}/>
					</Grid>
					<Grid item lg={7} sm={12}>
						<Box sx={{justifyContent:'space-around', display:'flex', mb: 3}}>
							<Button variant="contained" startIcon={<SaveAltIcon />} onClick={importICS} >
								Import ICS
							</Button>
							<Button variant="contained" startIcon={<ClearIcon />} onClick={removeICS} >
								Remove ICS
							</Button>
							<Button variant="outlined" onClick={handleClickOpen}>
								Temp Guest Dialog
							</Button>
						</Box>
						<AvailabilityPicker
							meetingInfo={meetingInfo}
							currentUser={currentUser}/>
					</Grid>
				</Grid>



				<Dialog open={openGuestDialog} onClose={handleClose}>
					<DialogTitle>Enjoy more features?</DialogTitle>
					<DialogContent>
						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							spacing={2}
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

					<DialogTitle sx={{pb:0}}>Or continue as guest?</DialogTitle>
					<DialogContent >
						<form onSubmit={createGuestAccount}>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Enter your name:"
								type="text"
								name="name"
								fullWidth
								variant="standard"
								required
							/>
							<TextField
								margin="dense"
								id="email"
								label="Email (optional):"
								type="email"
								name="email"
								fullWidth
								variant="standard"
							/>
							<DialogActions sx={{mt:2}}>
								<Button onClick={handleClose}>Cancel</Button>
								<Button type="submit">Go</Button>
							</DialogActions>
						</form>
					</DialogContent>
				</Dialog>
			</Box>
		</div>
	);
}

function LoadingBar	() {
	return (
		<Stack sx={{ width: '100%', color: '#DF7861'}}>
		{/* TODO: use theme */}
			<LinearProgress color="inherit" />
		</Stack>
	)
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
		var tableContent = [];
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