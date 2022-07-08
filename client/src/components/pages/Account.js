import "../../css/account.css";
import SignUp from './SignUp.js';
import Login from './Login.js';
import { useForm } from "react-hook-form";
import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';

import {useDispatch, useSelector} from "react-redux";
import {getUserAsync} from "../../redux/users/thunks";

export default function Account() {
	const { register, handleSubmit } = useForm();
	// or you can set up the defaultValues at useForm
	// const { register, handleSubmit } = useForm({
	//   defaultValues,
	// });
	const onSubmit = (data) => {
		alert(JSON.stringify(data));
	};

	const deleteCalendar = () => {
		// alert(JSON.stringify(data));
	};

	const deleteAccount = () => {
		// alert(JSON.stringify(data));
	};

	const currentUser = useSelector((state) => state.usersReducer.list);

	useEffect(() => {
		const temp = dispatch(getUserAsync("d515b255-0691-4778-9796-cb4f41840136"));
		console.log(temp);
	}, []);
	const dispatch = useDispatch();

	return (
		<div className="outer-div">
			{/*<Login/>*/}
			<Typography variant="h4" display="inline-box" component="h3"  align="center" sx={{ flex: '1 1 100%', fontWeight: 'bold', marginBottom: '20px'}}>
				Account Settings
			</Typography>

			<div className="account-info">
			<Paper elevation={8}>
				<div className="paper-div">
				<form className="form-account" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Name</label>
				<input
					defaultValue={currentUser.name}
					type="text"
					{...register("name")}
				/>

				<label htmlFor="email">Email</label>
				<input
					defaultValue={currentUser.email}
					type="email"
					{...register("email")}
				/>

				<label htmlFor="oldPassword">Old Password</label>
				<input
					// defaultValue={currentUser.oldPassword}
					placeholder="old password"
					type="password"
					{...register("oldPassword")}
				/>

				<label htmlFor="newPassword">New Password</label>
				<input
					// defaultValue={currentUser.newPassword}
					placeholder="new password"
					type="password"
					{...register("newPassword")}
				/>
				<br/>
					<Button variant="contained" startIcon={<SaveIcon />}>
						Update
					</Button>
				{/*<input type="submit" value="Save"/>*/}
			</form>
				</div>
			</Paper>
			</div>

			<div className="ics-div">
				<Paper elevation={8}>
					<div className="paper-div">
						<form className="form-ics" >
						<label htmlFor="icsCalendar">ICS Link</label>
						<input
							defaultValue={currentUser.ics}
							type="text"
							{...register("icsCalendar")}
						/>
							<br/>
							<Button variant="contained" startIcon={<SaveIcon />}>
								Update
							</Button>
							{/*<input type="submit" value="Update"/>*/}
						</form>

						<br/><br/><br/><br/><br/><br/><br/>

						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							spacing={2}
						>
							<Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deleteCalendar}>
								Delete Calendar
							</Button>
							<Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} onClick={deleteAccount}>
								Delete Account
							</Button>

						</Stack>
						{/*<input type="button" value="Delete Calendar "/>*/}
						{/*<input type="button" value="Delete Account"/>*/}
					</div>
				</Paper>

			</div>

		</div>

	);
}