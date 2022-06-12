import "../css/navbar.css";
import Home from "./pages/Home.js";
import Route from "./Route.js";
import NewMeeting from "./pages/NewMeeting.js";
import Account from "./pages/Account.js";
import AllMeetings from "./pages/AllMeetings.js";
import { BiBookBookmark, BiHomeAlt, BiPlus, BiListOl, BiUser } from "react-icons/bi";

export default function NavBar() {
	return (
		<div className="">
			<html>
			<head></head>
			<body>
			<div className="area"></div>
			<nav className="main-menu">
				<ul>
					<li>
						<a href="./home" >
							<BiBookBookmark className="fa title-icon"/>
							<span className="title-text">Meeting Planner</span>
						</a>
					</li>
					<li className="tabs">
						<a href="./home">
							<BiHomeAlt className="fa"/>
							<span className="nav-text">Home</span>
						</a>
					</li>
					<li className="tabs">
						<a href="./newMeeting">
							<BiPlus className="fa"/>
							<span className="nav-text">New Meeting</span>
						</a>
					</li>
					<li className="tabs">
						<a href="./allMeetings">
							<BiListOl className="fa"/>
							<span className="nav-text">All Meetings</span>
						</a>
					</li>
				</ul>

				<ul class="logout">
					<li className="tabs">
						<a href="./account">
							<BiUser className="fa"/>
							<span class="nav-text">Account</span>
						</a>
					</li>
				</ul>
			</nav>

			<Route path="/">
				<Home />
			</Route>
			<Route path="/home">
				<Home />
			</Route>
			<Route path="/newMeeting">
				<NewMeeting />
			</Route>
			<Route path="/allMeetings">
				<AllMeetings />
			</Route>
			<Route path="/account">
				<Account />
			</Route>
			</body>
			</html>
		</div>
	);
}
