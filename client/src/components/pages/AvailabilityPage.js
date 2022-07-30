import "../../css/availability-page.css";
import { useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AvailabilityPicker from "../AvailabilityPicker";
import {getMeeting} from "../../redux/meetings/service";
import {getUserBasedOnUserId} from "../../redux/users/service";
import Box from "@mui/material/Box";
import {LinearProgress, Typography} from "@mui/material";
import React from "react";
import Auth from "../../firebaseApp"
import Stack from '@mui/material/Stack';

export default function AvailabilityPage() {
	const { meetingId } = useParams();
	const [meetingInfo, setMeetingInfo] = useState({});
	const [creatorInfo, setCreatorInfo] = useState({});
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(Auth.currentUser);

	useEffect(() => {
		async function populateMeetingInfo() {
			const response = await getMeeting(meetingId);
			setMeetingInfo(response);
			const response2 = await getUserBasedOnUserId(response.createdBy);
			setCreatorInfo(response2);
			setLoading(false);
		}
		populateMeetingInfo();

		}, []);

	// user not logged in
	if (currentUser === null) {
		// TODO: link with guest form
		setCurrentUser({
			uid: 'd515b255-0691-4778-9796-cb4f41840136',
			email: '',
		})
	}

	const dispatch = useDispatch();

	const copyClipboard = () => {
		navigator.clipboard.writeText(meetingInfo._id)
			.then(() => {
				alert("Copied the text: " + meetingInfo._id);
			})
			.catch(() => {
				alert("something went wrong with clipboard");
			});
	}

	return (
		<div>
			{loading && <LoadingBar/>}
			<Box sx={{mx: "auto", my: 5, width: "80%"}}>
				<Typography
					sx={{flex: '1 1 100%', fontWeight: 'bold', my: 5, "textAlign": "center"}}
					variant="h4"
					component="div"
				>
					Choose Your Availability
				</Typography>
				<div className="meeting-summary-div">
					<Paper elevation={8} style={{borderRadius: 15}}>
						<div sx={{mt: 20, p: '10px 30px'}}>
							<h2>Meeting Summary</h2>
							<table>
								<thead>
									<tr>
										<td className="table-header"><strong>Meeting ID: &emsp;</strong><ContentCopyIcon fontSize="small" onClick={copyClipboard}></ContentCopyIcon></td>
										<td>{meetingInfo._id}</td>
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
										<td>{creatorInfo.name}</td>
									</tr>
								</thead>
							</table>
						</div>
					</Paper>
				</div>

				<div className="availability-picker-div">
					<AvailabilityPicker
						meetingInfo={meetingInfo}
						currentUser={currentUser}/>
				</div>
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