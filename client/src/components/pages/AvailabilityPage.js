import "../../css/availability-page.css";
import { useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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

	return (
		<div >
			<Box sx={{mx: "auto", my: 5, width: "80%"}}>
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

					<Grid item lg={6} sm={12} >
						<Paper elevation={8}>
							<Box sx={{py: 3, px: 5}}>
								<h2>Meeting Summary</h2>
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
										<td className="table-header">
											<strong>Link: &emsp;</strong>
											<ContentCopyIcon sx={{cursor: 'pointer'}} fontSize="small" onClick={handleCopiedToClipboard}></ContentCopyIcon>
										</td>
										<td>{"http://localhost:3000/home/" + meetingInfo._id}</td>
									</tr>
									<tr>
										<td className="table-header"><strong>Name: </strong></td>
										<td>{meetingInfo.name}</td>
									</tr>
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
					</Grid>
					<Grid item lg={6} sm={12} >
						<AvailabilityPicker meetingInfo={meetingInfo}/>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}
