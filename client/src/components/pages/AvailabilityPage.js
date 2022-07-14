import "../../css/availability-page.css";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {getMeetingAsync} from "../../redux/meetings/thunks";
import Paper from '@mui/material/Paper';
import AvailabilityPicker from "../AvailabilityPicker";

export default function AvailabilityPage() {
	const { meetingId } = useParams();
	const meetingInfo = useSelector((state) => state.meetingsReducer.list);

	useEffect(() => {
		dispatch(getMeetingAsync(meetingId));
		}, []);

	const dispatch = useDispatch();

	return (
		<div className="outer-div">
			<div className="meeting-summary-div">

				<Paper elevation={8} style={{borderRadius: 15}}>
					<div style={{marginTop: '20px', padding: '10px 30px'}}>
						{/*<br/>*/}
						<h2>Meeting Summary</h2>
						<table>
							<tr>
								<td className="table-header"><strong>Meeting ID: </strong></td>
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
