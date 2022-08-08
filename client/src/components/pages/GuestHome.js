import "../../css/home.css";
import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import {theme} from '../../theme/color-theme'
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function GuestHome() {
	const navigate = useNavigate();
	const [meetingID, setMeetingID] = useState("");

	const handleRedirectLink = (page) => {
		if(page == "")
			navigate("./" + meetingID);
		else
			navigate("../" + page);
	}

	const handleInputChange = (event) => {
		setMeetingID(event.target.value);
	};

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
				}}
			>
				<Box sx={{mx: "auto", my: 5, width: "70%"}}>
					<Grid
						container
						sx={{pt: 5}}
						spacing={6}
						justifyContent="center"
						alignItems="center"
					>

						<Grid item lg={6} sm={12} >
							<Paper elevation={8} sx={{maxWidth: 600}}>
								<Box sx={{px:7, py: 7}}>
									<Typography
										sx={{flex: '1 1 100%', fontWeight: 'bold', mb: 5, "textAlign": "center"}}
										variant="h3"
										component="div"
									>
										Welcome to Meeting Planner !
									</Typography>

									<Typography
										sx={{flex: '1 1 100%', my: 5, "textAlign": "center"}}
										variant="h5"
										component="div"
									>
										Let's get you started!
									</Typography>

									<Box sx={{minHeight: 130}}></Box>
									<Stack
										direction="column"
										justifyContent="center"
										alignItems="center"
										spacing={2}
									>
										<Button variant="contained" sx={{minWidth:250}} startIcon={<BorderColorIcon/>}
												onClick={() => handleRedirectLink("new-meeting")} >
											Create Meeting as Guest
										</Button>

										<Button variant="contained" sx={{minWidth:250}} startIcon={<LoginIcon />}
												onClick={() => handleRedirectLink("signup")} >
											Register/Sign Up
										</Button>

										<Button variant="contained" sx={{minWidth:250}} startIcon={<PersonAddIcon />}
												onClick={() => handleRedirectLink("signin")} >
											Log In
										</Button>
									</Stack>
								</Box>
							</Paper>
						</Grid>

						<Grid item lg={6} sm={12}>
							<Paper elevation={8} sx={{maxWidth: 600}}>
								<Box sx={{px:7, py: 7}}>
									<Typography
										sx={{flex: '1 1 100%', mb: 5, "textAlign": "center"}}
										variant="h6"
										component="div"
									>
										Have a link? Paste it in the browser.
									</Typography>

									<Typography
										sx={{flex: '1 1 100%', mb: 5, "textAlign": "center"}}
										variant="h6"
										component="div"
									>
										Have a meeting id? Paste it below:
									</Typography>

									<input
										className="link-input"
										placeholder="meeting id"
										name="link"
										type="text"
										onChange={handleInputChange}
										required
									/>

									<Box sx={{mt: 5, justifyContent: 'flex-end', display: 'flex'}}>
										<Button variant="contained" endIcon={<ArrowForwardIcon/>} onClick={() => handleRedirectLink("")}>
											Go!
										</Button>
									</Box>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</ThemeProvider>
	);
}