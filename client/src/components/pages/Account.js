import "../../css/account.css";
import SignUp from './SignUp/SignUp.js';
import SignIn from './SignUp/SignIn.js';
import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';

import {useDispatch, useSelector} from "react-redux";
import {getUserAsync, updateUserAsync, deleteUserAsync} from "../../redux/users/thunks";
import { getUserBasedOnUserId, updateUserBasedOnUserId } from "../../redux/users/service";
import Box from "@mui/material/Box";


export default function Account() {
	const [inputs, setInputs] = useState({});
	const [ics, setIcs] = useState({});
	const [updateAccSucceed, setUpdateAccSucceed] = useState(false);
	const [updateIcsSucceed, setUpdateIcsSucceed] = useState(false);
	const [deleteIcsSucceed, setDeleteIcsSucceed] = useState(false);
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
		// await dispatch(updateUserAsync({"userId": "d515b255-0691-4778-9796-cb4f41840136", "updateContents": inputs}));
		const response = await updateUserBasedOnUserId({"userId": currentUserID, "updateContents": inputs});
		setCurrentUser(response);
		setUpdateAccSucceed(true);
	};

	const submitIcs = async (event) => {
		event.preventDefault();
		// dispatch(updateUserAsync({"userId": "d515b255-0691-4778-9796-cb4f41840136", "updateContents": ics}));
		const response = await updateUserBasedOnUserId({"userId": currentUserID, "updateContents": ics});
		setCurrentUser(response);
		setUpdateIcsSucceed(true);
	};

	const deleteCalendar = async (event) => {
		event.preventDefault();
		// dispatch(updateUserAsync({"userId": "d515b255-0691-4778-9796-cb4f41840136", "updateContents": {"ics": ""}}));
		const response = await updateUserBasedOnUserId({"userId": currentUserID, "updateContents": {"ics": ""}});
		setCurrentUser(response);
		setDeleteIcsSucceed(true);
	};

	const deleteAccount = () => {
		setDialogOpen(false);
		dispatch(deleteUserAsync(currentUserID));
		window.location.href = "http://localhost:3000/about-us";
	};

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

			<Box sx={{mx: "auto", my: 5, width: "80%"}}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Paper elevation={8} sx={{ width: '45%' }}>
						<Box sx={{pt: 3, pb: 7, px: 5}}>
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

								{updateAccSucceed ? (
									<div className="message-success">
										Your account is updated!<br/>
									</div>
								) : null}

							</form>
						</Box>
					</Paper>

					<Box sx={{ justifyContent: 'space-between', display: "flex", flexDirection: "column", width: '45%' }}>
						<Paper elevation={8}>
							<Box sx={{pt: 3, pb: 7, px: 5}}>
								<form className="form-ics" >
									<label htmlFor="ics">ICS Link</label>
									<input
										name="ics"
										defaultValue={currentUser.ics}
										type="text"
										onChange={handleIcsChange}
										required
									/>
									<Button variant="contained" startIcon={<SaveIcon />} onClick={submitIcs} sx={{mt: 5}}>
										Update
									</Button>
									{updateIcsSucceed ? (
										<span className="message-success">
											Your ICS Calendar is updated!<br/>
										</span>
									) : null}
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
										<Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deleteCalendar} sx={{mt: 5}}>
											Delete Calendar
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

									{deleteIcsSucceed ? (
										<span className="message-success">
											Calendar Deleted!
										</span>
									) : null}

								</form>
							</Box>
						</Paper>
					</Box>
				</Box>
			</Box>
		</div>

	);
}
