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
import { BiBookBookmark, BiHomeAlt, BiPlus, BiListOl, BiInfoCircle, BiUser, BiLogIn } from "react-icons/bi";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import {useEffect, useState} from "react";

export default function NavBar() {

	const [status, setStatus] = useState(true);
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
					{status ? (
					[<li className="tabs">
						<Link to="/new-meeting">
							<BiPlus className="fa"/>
							<span className="nav-text">New Meeting</span>
						</Link>
					</li>,
					<li className="tabs">
						<Link to="/all-meetings">
							<BiListOl className="fa"/>
							<span className="nav-text">All Meetings</span>
						</Link>
					</li>]
						) : null}
					<li className="tabs">
						<Link to="/about-us">
							<BiInfoCircle className="fa"/>
							<span className="nav-text">
								About Us
							</span>
						</Link>
					</li>
				</ul>

				<ul class="logout">
					<li className="tabs">
						{status ? (

								<Link to="/account">
									<BiUser className="fa"/>
									<span className="nav-text">Account</span>
								</Link>

							) :

								<Link to="/login">
									<BiLogIn className="fa"/>
									<span className="nav-text">Sign Up / Login</span>
								</Link>
							}
					</li>
				</ul>
			</nav>
				<Routes>
					<Route exact path="/" element={<Home/>}/>
					<Route exact path="/about-us" element={<AboutUs/>}/>
					<Route exact path="/home" element={<Home/>}/>
					<Route exact path="/home/:meetingId" element={<AvailabilityPage/>}/>

					{status ? (
						[
							<Route exact path="/new-meeting" element={<NewMeeting/>}/>,
							<Route exact path="/all-meetings" element={<AllMeetings/>}/>,
							<Route exact path="/account" element={<Account/>}/>
						]) :
						[
							<Route exact path="/signup" element={<SignUp/>}/>,
							<Route exact path="/login" element={<Login/>}/>,
							<Route exact path="/guest" element={<Guest/>}/>
						]}
				</Routes>
			</BrowserRouter>

		</div>
	);
}
