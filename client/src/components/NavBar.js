import "../css/navbar.css";
import Home from "./pages/Home";
import NewMeeting from "./pages/NewMeeting";
import Account from "./pages/Account";
import AllMeetings from "./pages/AllMeetings";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/SignUp/Login";
import SignUp from "./pages/SignUp/SignUp";
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
						<Link to="/home">
							<BiBookBookmark className="fa title-icon"/>
							<span className="title-text">Meeting Planner</span>
						</Link>
					</li>
					<li className="tabs">
						<Link to="/home">
							<BiHomeAlt className="fa"/>
							<span className="nav-text">Home</span>
						</Link>
					</li>
					<li className="tabs">
						<Link to="/new-meeting">
							<BiPlus className="fa"/>
							<span className="nav-text">New Meeting</span>
						</Link>
					</li>
					<li className="tabs">
						<Link to="/all-meetings">
							<BiListOl className="fa"/>
							<span className="nav-text">All Meetings</span>
						</Link>
					</li>
					<li className="tabs">
						<Link to="/about-us">
							<BiInfoCircle className="fa"/>
							<span className="nav-text">About Us</span>
						</Link>
					</li>
				</ul>

				<ul class="logout">
					<li className="tabs">
						<Link to="/account">
							<BiUser className="fa"/>
							<span class="nav-text">Account</span>
						</Link>
					</li>
				</ul>
			</nav>
				<Routes>
					<Route exact path="/" element={<Home/>}/>
					<Route exact path="/home" element={<Home/>}/>
					<Route exact path="/new-meeting" element={<NewMeeting/>}/>
					<Route exact path="/all-meetings" element={<AllMeetings/>}/>
					<Route exact path="/about-us" element={<AboutUs/>}/>
					<Route exact path="/account" element={<Account/>}/>
					<Route exact path="/signup" element={<SignUp/>}/>
					<Route exact path="/login" element={<Login/>}/>
					<Route exact path="/guest" element={<Guest/>}/>
					<Route exact path="/availability-page/:meetingId" element={<AvailabilityPage/>}/>
				</Routes>
			</BrowserRouter>

		</div>
	);
}
