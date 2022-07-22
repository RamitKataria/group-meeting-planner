import "../../css/home.css";
import AvailabilityPage from "./AvailabilityPage";
import SignOut from "./SignUp/SignOut";

export default function Home() {
	return (
		<div className="outer-div">
			<h1>Home Page</h1>
			<p>Do home/:meetingID to show availability page :)</p>
			<SignOut/>
		</div>
	);
}