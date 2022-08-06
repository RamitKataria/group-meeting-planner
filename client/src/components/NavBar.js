import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import {Link} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import ListItemText from "@mui/material/ListItemText";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import {Route, Routes, useNavigate, Navigate} from "react-router-dom";
import GuestHome from "./pages/GuestHome";
import RegisteredHome from "./pages/RegisteredHome";
import AboutUs from "./pages/AboutUs";
import AvailabilityPage from "./pages/AvailabilityPage";
import NewMeeting from "./pages/NewMeeting";
import AllMeetings from "./pages/AllMeetings";
import Account from "./pages/Account";
import SignIn from "./pages/SignUp/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import Auth from "../firebaseApp";
import {theme} from "../theme/color-theme";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="./about-us">
				Dip Honey Donut
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const drawerWidth = 280;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		'& .MuiDrawer-paper': {
			// position: 'relative', // squeeze screen to the right
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			boxSizing: 'border-box',
			...(!open && {
				overflowX: 'hidden',
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				width: theme.spacing(7),
				[theme.breakpoints.up('sm')]: {
					width: theme.spacing(9),
				},
			}),
		},
	}),
);

export default function NavBar() {
	const navigate = useNavigate();

	const [open, setOpen] = React.useState(false);
	const [logOutDialogOpen, setLogOutDialogOpen] = useState(false);

	const [userState, setUserState] = useState(Auth.currentUser);

	useEffect(() => {
		onAuthStateChanged(Auth, (user) => {
			setUserState(user);
		})
	}, []);

	const openDrawer = () => {
		setOpen(true);
	};
	const closeDrawer = () => {
		setOpen(false);
	};

	const navigateToPage = (link) => {
		return navigate("/" + link);
	}

	const handleLogout = () => {
		signOut(Auth).then(() => {
			setLogOutDialogOpen(false);
			navigate('../');
			setOpen(false);
		}).catch((error) => {
			// An error happened.
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(`${errorCode}: ${errorMessage}`);
		});
	}

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex'}}>
				<CssBaseline />
				<Drawer variant="permanent"
						open={open}
						onMouseOver={openDrawer}
						onMouseLeave={closeDrawer}
						PaperProps={{ sx: {
								backgroundColor: "black"
							} }}
				>
					<List component="nav">
						<ListItemButton key="icon" onClick={() => navigateToPage("home")}>
							<ListItemIcon>
								<FactCheckRoundedIcon sx={{ color: "white", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="Meeting Planner"
										  primaryTypographyProps={{fontSize: '24px', fontWeight: "bold", lineHeight: 3.5, color: "white"}} />
						</ListItemButton>
						<ListItemButton key="home" onClick={() => navigateToPage("home")}>
							<ListItemIcon>
								<HomeRoundedIcon sx={{ color: "lightgrey", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="Home"
										  primaryTypographyProps={{lineHeight: '2.5', color: "lightgrey"}}/>
						</ListItemButton>
						<ListItemButton key="new-meeting" onClick={(event) => navigateToPage("new-meeting")}>
							<ListItemIcon>
								<AddCircleOutlineRoundedIcon sx={{ color: "lightgrey", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="Create Meeting"
										  primaryTypographyProps={{lineHeight: '2.5', color: "lightgrey"}}/>
						</ListItemButton>
						{userState ? (
								[
									<ListItemButton key="all-meetings" onClick={() => navigateToPage("all-meetings")}>
										<ListItemIcon>
											<FormatListBulletedRoundedIcon sx={{ color: "lightgrey", fontSize: "40px"}}/>
										</ListItemIcon>
										<ListItemText primary="All Meetings"
													  primaryTypographyProps={{lineHeight: '2.5', color: "lightgrey"}}/>
									</ListItemButton>
								]) : null}


						<Divider sx={{ my: 1, borderColor: "white" }} />

						{userState ? (
							[
								<ListItemButton key="logout"  onClick={() => setLogOutDialogOpen(true)}>
									<ListItemIcon>
										<LogoutRoundedIcon sx={{ color: "lightgrey", fontSize: "40px"}}/>
									</ListItemIcon>
									<ListItemText primary="Log out"
												  primaryTypographyProps={{lineHeight: '2.5', color: "lightgrey"}}/>
								</ListItemButton>,
								<ListItemButton key="account" onClick={() => navigateToPage("account")} >
									<ListItemIcon>
										<PersonRoundedIcon sx={{ color: "lightgrey", fontSize: "40px"}}/>
									</ListItemIcon>
									<ListItemText primary="Account"
												  primaryTypographyProps={{lineHeight: '2.5', color: "lightgrey"}}/>
								</ListItemButton>
							]) : <ListItemButton key="signin" onClick={() => navigateToPage("signin")} >
									<ListItemIcon>
										<LoginRoundedIcon sx={{ color: "lightgrey", fontSize: "40px"}}/>
									</ListItemIcon>
									<ListItemText primary="Sign In"
												  primaryTypographyProps={{lineHeight: '2.5', color: "lightgrey"}}/>
								</ListItemButton>
						}

						<Dialog
							open={logOutDialogOpen}
							onClose={() => setLogOutDialogOpen(false)}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
								{"Are you sure you want to log out?"}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									You can log back in after !
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setLogOutDialogOpen(false)} autoFocus>Cancel</Button>
								<Button onClick={handleLogout}>
									Log out
								</Button>
							</DialogActions>
						</Dialog>

					</List>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
						p: '0',
						m: '0',
					}}
				>
					<Routes>
						<Route key="new-meeting-route" exact path="/new-meeting" element={<NewMeeting/>}/>,
						<Route key="about-us-route" exact path="/about-us" element={<AboutUs/>}/>
						<Route key="availability-route" exact path="/home/:meetingId" element={<AvailabilityPage/>}/>

					{userState ? (
							[
								<Route key="registered-home-root-route" exact path="/" element={<RegisteredHome/>}/>,
								<Route key="registered-home-route" exact path="/home" element={<RegisteredHome/>}/>,
								<Route key="all-meetings-route" exact path="/all-meetings" element={<AllMeetings/>}/>,
								<Route key="account-route" exact path="/account" element={<Account/>}/>,
								<Route key="sign-in-route" exact path="/signin" element={ <Navigate to="/" /> }/>
							]) :
						[
							<Route key="guest-home-root-route" exact path="/" element={<GuestHome/>}/>,
							<Route key="guest-home" exact path="/home" element={<GuestHome/>}/>,
							<Route key="sign-up-route" exact path="/signup" element={<SignUp/>}/>,
							<Route key="sign-in-route" exact path="/signin" element={<SignIn/>}/>
						]}
					</Routes>

					<Container maxWidth="lg"
					>
						<Copyright sx={{ pt: 4 }} />
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}