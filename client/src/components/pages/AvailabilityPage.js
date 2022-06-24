import "../../css/availabilityPage.css";

export default function AvailabilityPage() {
	return (
		<div className="outer-div">
			<h1>Welcome to Meeting Planner!!</h1>
			<div className="meeting-summary-div">
				<h2>Meeting Summary</h2>
				<table>
					<tr>
						<td className="table-header"><strong>Meeting ID: </strong></td>
						<td>1234567</td>
					</tr>
					<tr>
						<td className="table-header"><strong>Name: </strong></td>
						<td>Hiking Day</td>
					</tr>
					<tr>
						<td className="table-header"><strong>Description: </strong></td>
						<td>Let's go for a hike on a sunny day!</td>
					</tr>
				</table>
			</div>

			<div className="availability-picker-div">

				<h2>Choose your availability:</h2>
			</div>
		</div>
	);
}