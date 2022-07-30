import "../../css/availability-page.css";
import { useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AvailabilityPicker from "../AvailabilityPicker";
import {getMeeting} from "../../redux/meetings/service";
import {getUserBasedOnUserId} from "../../redux/users/service";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as React from "react";
import {Typography, Box} from "@mui/material";

export default function AvailabilityPage() {
	const { meetingId } = useParams();
	const [meetingInfo, setMeetingInfo] = useState({});
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		async function populateMeetingInfo() {
			const response = await getMeeting(meetingId);
			setMeetingInfo(response);
			const response2 = await getUserBasedOnUserId(response.createdBy);
			setUserInfo(response2);
		}
		populateMeetingInfo();

		}, []);

	const dispatch = useDispatch();

	const handleCopiedToClipboard = () => {
		const link = "http://localhost:3000/home/" + meetingInfo._id;
		navigator.clipboard.writeText(link)
			.then(() => {
				toast("🗒️ Copied to clipboard!");
			})
			.catch(() => {
				alert("something went wrong with clipboard");
			});
	}

	const importICS = () => {
		// TODO: populate ics into table, disabled for guest.
	}

	const removeICS = () => {
		// TODO: remove ics from table, disabled for guest.
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
										<td>{userInfo.name}</td>
									</tr>
									</thead>
								</table>
							</Box>
						</Paper>

						<TableContainer component={Paper} sx={{mt: 5}}>
							<Table  aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="center" sx={{fontWeight: 'bold'}}>AVAILABLE</TableCell>
										<TableCell align="center" sx={{fontWeight: 'bold'}}>UNAVAILABLE</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow
										key="some-key"
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row" align="center">
											Sophie
										</TableCell>
										<TableCell align="center">May</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
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
						<AvailabilityPicker meetingInfo={meetingInfo}/>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}
