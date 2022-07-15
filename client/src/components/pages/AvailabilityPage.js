import "../../css/availability-page.css";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {getMeetingAsync} from "../../redux/meetings/thunks";
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AvailabilityPicker from "../AvailabilityPicker";

export default function AvailabilityPage() {
	const { meetingId } = useParams();
	const meetingInfo = useSelector((state) => state.meetingsReducer.list);

	useEffect(() => {
		dispatch(getMeetingAsync(meetingId));
		}, []);

	const dispatch = useDispatch();

	const copyClipboard = () => {
		navigator.clipboard.writeText(meetingInfo.meetingId)
			.then(() => {
				alert("Copied the text: " + meetingInfo.meetingId);
			})
			.catch(() => {
				alert("something went wrong with clipboard");
			});
	}

	return (
		<div className="outer-div">
			<div className="meeting-summary-div">

				<Paper elevation={8} style={{borderRadius: 15}}>
					<div style={{marginTop: '20px', padding: '10px 30px'}}>
						{/*<br/>*/}
						<h2>Meeting Summary</h2>
						<table>
							<thead>
								<tr>
									<td className="table-header"><strong>Meeting ID: &emsp;</strong><ContentCopyIcon fontSize="small" onClick={copyClipboard}></ContentCopyIcon></td>
									<td>{meetingInfo.meetingId}</td>
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
									<td>{meetingInfo.createdBy}</td>
								</tr>
							</thead>
						</table>
					</div>
				</Paper>

				
			</div>

			<div className="availability-picker-div">

				<h2>Choose your availability:</h2>
				<AvailabilityPicker/>
			</div>
		</div>
	);
}
