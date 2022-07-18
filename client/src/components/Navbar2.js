import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
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
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import AvailabilityPage from "./pages/AvailabilityPage";
import NewMeeting from "./pages/NewMeeting";
import AllMeetings from "./pages/AllMeetings";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignUp/SignIn";
import Guest from "./pages/Guest";
import ListSubheader from "@mui/material/ListSubheader";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import Auth from "../firebaseApp";

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
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
			position: 'relative',
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

const mdTheme = createTheme();

export default function NavBar2() {
	const navigate = useNavigate();

	const [open, setOpen] = React.useState(true);

	const [userState, setUserState] = useState(true);

	onAuthStateChanged(Auth, (user) => {
		// if (user) {
		// 	setUserState(user);
		// } else {
		// 	setUserState(null);
		// }
	})

	const openDrawer = () => {
		setOpen(true);
	};
	const closeDrawer = () => {
		setOpen(false);
	};

	const navigateToPage = (link) => {
		return navigate("/" + link);
	}
	// navigate("/" + link);

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Drawer variant="permanent"
						open={open}
						onMouseOver={openDrawer}
						onMouseLeave={closeDrawer}
				>
					<List component="nav">
						<ListItemButton onClick={() => navigateToPage("home")}>
							<ListItemIcon>
								<FactCheckRoundedIcon style={{ color: "purple", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="Meeting Planner"
										  primaryTypographyProps={{fontSize: '24px', fontWeight: "bold", lineHeight: 3.5}} />
						</ListItemButton>
						<ListItemButton onClick={() => navigateToPage("home")}>
							<ListItemIcon>
								<HomeRoundedIcon style={{ color: "black", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="Home"
										  primaryTypographyProps={{lineHeight: '2.5'}}/>
						</ListItemButton>
						<ListItemButton onClick={(event) => navigateToPage("new-meeting")}>
							<ListItemIcon>
								<AddCircleOutlineRoundedIcon style={{ color: "black", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="Create Meeting"
										  primaryTypographyProps={{lineHeight: '2.5'}}/>
						</ListItemButton>
						<ListItemButton onClick={() => navigateToPage("all-meetings")}>
							<ListItemIcon>
								<FormatListBulletedRoundedIcon style={{ color: "black", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="All Meetings"
										  primaryTypographyProps={{lineHeight: '2.5'}}/>
						</ListItemButton>

						<Divider sx={{ my: 1 }} />

						<ListSubheader component="div" inset>
							Saved reports
						</ListSubheader>
						<ListItemButton onClick={() => navigateToPage("about-us")}>
							<ListItemIcon>
								<InfoRoundedIcon style={{ color: "black", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="About Us"
										  primaryTypographyProps={{lineHeight: '2.5'}}/>
						</ListItemButton>
						<ListItemButton onClick={() => navigateToPage("account")}>
							<ListItemIcon>
								< PersonRoundedIcon style={{ color: "black", fontSize: "40px"}}/>
							</ListItemIcon>
							<ListItemText primary="Account"
										  primaryTypographyProps={{lineHeight: '2.5'}}/>
						</ListItemButton>
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
						px: '8',
					}}
				>
					<Routes>
					<Route exact path="/" element={<Home/>}/>
					<Route exact path="/about-us" element={<AboutUs/>}/>
					<Route exact path="/home" element={<Home/>}/>
					<Route exact path="/home/:meetingId" element={<AvailabilityPage/>}/>

					{userState ? (
							[
								<Route exact path="/new-meeting" element={<NewMeeting/>}/>,
								<Route exact path="/all-meetings" element={<AllMeetings/>}/>,
								<Route exact path="/account" element={<Account/>}/>
							]) :
						[
							<Route exact path="/signup" element={<SignUp/>}/>,
							<Route exact path="/signin" element={<SignIn/>}/>,
							<Route exact path="/guest" element={<Guest/>}/>
						]}
					</Routes>

					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Copyright sx={{ pt: 4 }} />
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}