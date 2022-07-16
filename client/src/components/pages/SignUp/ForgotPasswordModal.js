import React, {useState} from 'react';
import "../../../css/modal.css";
import { useDispatch} from "react-redux"
import {Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import PasswordIcon from '@mui/icons-material/Password';


export default function ForgotPasswordModal({onClose}){
    const dispatch = useDispatch();

    const handleSubmit = (event)=>{
        event.preventDefault();
        window.location.href = './AvailabilityPage';
    };

    return (
        <div className="background">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button className="X"
                        onClick={() => {
                            onClose(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                            <PasswordIcon />
                            </Avatar>

                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <Typography component="p" variant="p">
                            Tell us the  email address associated with your Meeting-Planner account, and we’ll send you an email with a link to reset your password.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>

                            </Grid>
                            <div className= "Reset">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 0.2 }}
                                    id="aa">Reset Password
                                </Button>
                            </div>



                        </Box>
                    </Box>
                </Container>


            </div>

        </div>
    )
}
