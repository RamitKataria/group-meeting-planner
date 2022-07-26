import "../../css/account.css";
import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
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

import {useDispatch, useSelector} from "react-redux";
import { getUserBasedOnUserId, updateUserBasedOnUserId, deleteUserBasedOnUserId } from "../../redux/users/service";

export default function Account() {
	const [inputs, setInputs] = useState({});
	const [ics, setIcs] = useState({});
	const [showDeleteAccDialog, setShowDeleteAccDialog] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentUserID, setCurrentUserID] = useState("d515b255-0691-4778-9796-cb4f41840136");

	const handleAccountChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleIcsChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setIcs((values) => ({[name]: value}));
	};

	const submitAccount = async (event) => {
		event.preventDefault();
		const response = await updateUserBasedOnUserId({"userId": currentUserID, "updateContents": inputs});
		setCurrentUser(response);
		toast("👤 Account Updated!");
	};

	const submitIcs = async (event) => {
		event.preventDefault();
		const response = await updateUserBasedOnUserId({"userId": currentUserID, "updateContents": ics});
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
		setDialogOpen(false);
		await deleteUserBasedOnUserId(currentUserID);
		alert("Account Deleted!");
	};

	const handleLogout = () => {
		alert("logout!");
	}

	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		async function populateAccountInfo() {
			const response = await getUserBasedOnUserId(currentUserID);
			setCurrentUser(response);
		}
		populateAccountInfo();
	}, []);

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

			<Box sx={{mx: "auto", my: 5, width: "80%"}}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Paper elevation={8} sx={{ width: '45%' }}>
						<Box sx={{pt: 3, pb: 10, px: 5}}>
							<form className="form-account">
								<label htmlFor="name">Name</label>
								<input
									name="name"
									defaultValue={currentUser.name}
									type="text"
									onChange={handleAccountChange}
									required
								/>

								<label htmlFor="email">Email</label>
								<input
									name="email"
									defaultValue={currentUser.email}
									type="email"
									onChange={handleAccountChange}
									required
								/>

								<label htmlFor="oldPassword">Old Password</label>
								<input
									name="oldPassword"
									// defaultValue={currentUser.oldPassword}
									placeholder="old password"
									type="password"
									// onChange={handleAccountChange}
									required
								/>

								<label htmlFor="newPassword">New Password</label>
								<input
									name="newPassword"
									// defaultValue={currentUser.newPassword}
									placeholder="new password"
									type="password"
									// onChange={handleAccountChange}
									required
								/>
								<br/>
								{/*<div className="message-warning">*/}
								{/*	Incorrect Old Password.*/}
								{/*</div>*/}

								<Button variant="contained" startIcon={<SaveIcon />} onClick={submitAccount} sx={{mt: 2}}>
									Update
								</Button>

							</form>
						</Box>
					</Paper>

					<Box sx={{ justifyContent: 'space-between', display: "flex", flexDirection: "column", width: '45%' }}>
						<Paper elevation={8}>
							<Box sx={{pt: 3, pb: 10, px: 5}}>
								<form className="form-ics" >
									<label htmlFor="ics">ICS Link</label>
									<input
										name="ics"
										defaultValue={currentUser.ics}
										type="text"
										onChange={handleIcsChange}
										required
									/>
									<Stack
										direction="column"
										justifyContent="center"
										alignItems="center"
										spacing={2}
									>
										<Button variant="contained" startIcon={<SaveIcon />} onClick={submitIcs} sx={{mt: 5}}>
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
										<Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{mt: 5}}>
											Log out
										</Button>
										<Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} onClick={() => setDialogOpen(true)}>
											Delete Account
										</Button>

										<Dialog
											open={dialogOpen}
											onClose={() => setDialogOpen(false)}
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
												<Button onClick={() => setDialogOpen(false)}>Cancel</Button>
												<Button onClick={deleteAccount} autoFocus>
													Delete
												</Button>
											</DialogActions>
										</Dialog>

									</Stack>

								</form>
							</Box>
						</Paper>
					</Box>
				</Box>
			</Box>
		</div>

	);
}
