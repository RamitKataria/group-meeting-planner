import "../css/navbar.css";
import Home from "./pages/Home";
import NewMeeting from "./pages/NewMeeting";
import Account from "./pages/Account";
import AllMeetings from "./pages/AllMeetings";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Guest from "./pages/Guest";
import AvailabilityPage from "./pages/AvailabilityPage";
import { BiBookBookmark, BiHomeAlt, BiPlus, BiListOl, BiInfoCircle, BiUser } from "react-icons/bi";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

export default function NavBar() {
	return (
		<div className="">
			<div className="area"></div>
			<BrowserRouter>
			<nav className="main-menu">
				<ul>
					<li>
						<Link to="/Home">
							<BiBookBookmark className="fa title-icon"/>
							<span className="title-text">Meeting Planner</span>
						</Link>
					</li>
					<li className="tabs">
						<Link to="/Home">
							<BiHomeAlt className="fa"/>
							<span className="nav-text">Home</span>
						</Link>
					</li>
					<li className="tabs">
						<Link to="/NewMeeting">
							<BiPlus className="fa"/>
							<span className="nav-text">New Meeting</span>
						</Link>
					</li>
					<li className="tabs">
						<Link to="/AllMeetings">
							<BiListOl className="fa"/>
							<span className="nav-text">All Meetings</span>
						</Link>
					</li>
					<li className="tabs">
						<Link to="/AboutUs">
							<BiInfoCircle className="fa"/>
							<span className="nav-text">About Us</span>
						</Link>
					</li>
				</ul>

				<ul class="logout">
					<li className="tabs">
						<Link to="/Account">
							<BiUser className="fa"/>
							<span class="nav-text">Account</span>
						</Link>
					</li>
				</ul>
			</nav>
				<Routes>
					<Route exact path="/" element={<Home/>}/>
					<Route exact path="/Home" element={<Home/>}/>
					<Route exact path="/NewMeeting" element={<NewMeeting/>}/>
					<Route exact path="/AllMeetings" element={<AllMeetings/>}/>
					<Route exact path="/AboutUs" element={<AboutUs/>}/>
					<Route exact path="/Account" element={<Account/>}/>
					<Route exact path="/SignUp" element={<SignUp/>}/>
					<Route exact path="/Login" element={<Login/>}/>
					<Route exact path="/Guest" element={<Guest/>}/>
					<Route exact path="/AvailabilityPage" element={<AvailabilityPage/>}/>
				</Routes>
			</BrowserRouter>

		</div>
	);
}
