import "../../css/account.css";
import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from "@mui/material/Stack";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Auth from "../../firebaseApp";
import {onAuthStateChanged, signOut} from "firebase/auth";

import { getUserBasedOnFirebaseId, updateUserBasedOnUserId, deleteUserBasedOnUserId } from "../../redux/users/service";

export default function Account() {
	const navigate = useNavigate();

	const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);
	const [logOutDialogOpen, setLogOutDialogOpen] = useState(false);
	const [currentUserID, setCurrentUserID] = useState("");
	const [currentUserEmail, setCurrentUserEmail] = useState("");

	useEffect(() => {
		onAuthStateChanged(Auth, (user) => {
			if (user) {
				const uid = user.uid;
				setCurrentUserID(uid);
				setCurrentUserEmail(user.email);
			}
		});
	}, []);

	useEffect(() => {
		async function populateAccountInfo() {
			const response = await getUserBasedOnFirebaseId(currentUserID);
			setCurrentUser(response);
		}
		if (currentUserID !== "")
			populateAccountInfo();
	}, [currentUserID]);

	const submitAccount = async (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const email = event.target.email.value; // should user be able to update email??
		const content = {"name": name};
		// update user based on firebaseID (temporary?)
		const response = await updateUserBasedOnUserId({"userId": currentUserID, "updateContents": content});
		setCurrentUser(response);
		toast("👤 Account Updated!");
	};

	const submitIcs = async (event) => {
		event.preventDefault();
		const ics = event.target.ics.value;
		const content = {"ics": ics};
		const response = await updateUserBasedOnUserId({"userId": currentUserID, "updateContents": content});
		setCurrentUser(response);
		toast("📅 Calendar Updated!");
	};

	const deleteCalendar = async (event) => {
		event.preventDefault();
		const response = await updateUserBasedOnUserId({"userId": currentUserID, "updateContents": {"ics": ""}});
		setCurrentUser(response);
		toast("🗑️ Calendar Deleted!");
	};

	const deleteAccount = async () => {
		setDeleteAccountDialogOpen(false);
		await deleteUserBasedOnUserId(currentUserID);
		alert("Account Deleted!");
	};

	const handleLogout = () => {
		signOut(Auth).then(() => {
			navigate('../');
		}).catch((error) => {
			// An error happened.
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(`${errorCode}: ${errorMessage}`);
		});
	}

	const [currentUser, setCurrentUser] = useState({});

	const dispatch = useDispatch();

	return (
		<div>
			<Typography
				sx={{flex: '1 1 100%', fontWeight: 'bold', my: 5, "textAlign": "center"}}
				variant="h4"
				component="div"
			>
				Account Settings
			</Typography>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<Box sx={{mx: "auto", my: 5, width: "70%"}}>
				<Grid
					container
					spacing={4}
					justifyContent="space-between"
					alignItems="center"
				>

					<Grid item lg={6} sm={12} >
						<Paper elevation={8} >
							<Box sx={{pt: 3, pb: 10, px: 5}}>
								<form className="form-account" onSubmit={submitAccount}>
									<label htmlFor="name">Name</label>
									<input
										name="name"
										defaultValue={currentUser.name}
										type="text"
										required
									/>

									<label htmlFor="email">Email</label>
									<input
										name="email"
										defaultValue={currentUserEmail}
										type="email"
										required
										disabled
									/>

									<label htmlFor="oldPassword">Old Password</label>
									<input
										name="oldPassword"
										placeholder="old password"
										type="password"
										disabled
									/>

									<label htmlFor="newPassword">New Password</label>
									<input
										name="newPassword"
										placeholder="new password"
										type="password"
										disabled
									/>
									<br/>

									<Button variant="contained" startIcon={<SaveIcon />}
											type="submit"
											sx={{mt: 2}}>
										Update
									</Button>

								</form>
							</Box>
						</Paper>
					</Grid>
					<Grid item lg={6} sm={12}>
						<Stack
							direction="column"
							justifyContent="space-between"
							spacing={4}
						>
							<Paper elevation={8}>
								<Box sx={{pt: 3, pb: 10, px: 5}}>
									<form className="form-ics" onSubmit={submitIcs}>
										<label htmlFor="ics">ICS Link</label>
										<input
											name="ics"
											defaultValue={currentUser.ics}
											type="text"
											required
										/>
										<Stack
											direction="column"
											justifyContent="center"
											alignItems="center"
											spacing={2}
										>
											<Button variant="contained" startIcon={<SaveIcon />} type="submit" sx={{mt: 5}}>
												Update
											</Button>
											<Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deleteCalendar}>
												Delete Calendar
											</Button>
										</Stack>

									</form>
								</Box>
							</Paper>
							<Paper elevation={8}>
								<Box sx={{pt: 3, pb: 7, px: 5}}>
									<form>
										<Stack
											direction="column"
											justifyContent="center"
											alignItems="center"
											spacing={2}
										>
											<Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={() => setLogOutDialogOpen(true)} sx={{mt: 5}}>
												Log out
											</Button>
											<Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} onClick={() => setDeleteAccountDialogOpen(true)}>
												Delete Account
											</Button>

											<Dialog
												open={deleteAccountDialogOpen}
												onClose={() => setDeleteAccountDialogOpen(false)}
												aria-labelledby="alert-dialog-title"
												aria-describedby="alert-dialog-description"
											>
												<DialogTitle id="alert-dialog-title">
													{"Are you sure you want to delete this account?"}
												</DialogTitle>
												<DialogContent>
													<DialogContentText id="alert-dialog-description">
														There's no turning back !
													</DialogContentText>
												</DialogContent>
												<DialogActions>
													<Button onClick={() => setDeleteAccountDialogOpen(false)} autoFocus>Cancel</Button>
													<Button onClick={deleteAccount}>
														Delete
													</Button>
												</DialogActions>
											</Dialog>

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

										</Stack>
									</form>
								</Box>
							</Paper>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</div>

	);
}
