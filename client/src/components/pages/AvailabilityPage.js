import "../../css/availabilityPage.css";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
// import { fetchMeetingInfo } from "../../redux/availabilityPage";
import { useParams } from 'react-router-dom';
import {getMeetingAsync} from "../../redux/meetings/thunks";

export default function AvailabilityPage() {
	const { meetingId } = useParams();
	const meetingInfo = useSelector((state) => state.meetingsReducer.list);

	useEffect(() => {
		dispatch(getMeetingAsync(meetingId));
		}, []);

	const dispatch = useDispatch();

	return (
		<div className="outer-div">
			<h1>Welcome to Meeting Planner!!</h1>
			<div className="meeting-summary-div">
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
						<td>{meetingInfo.name}</td>
					</tr>
				</table>
			</div>

			<div className="availability-picker-div">

				<h2>Choose your availability:</h2>
			</div>
		</div>
	);
}