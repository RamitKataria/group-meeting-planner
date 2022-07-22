import {Button, Container, CssBaseline, FormControlLabel, Link, TextField} from "@mui/material";
import ForgotPasswordButton from "./ForgotPasswordButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Auth from "../../../firebaseApp";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../redux/user";
import AuthProviders from "./AuthProviders";
import "./signUp.css";


export default function SignIn() {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        createUserWithEmailAndPassword(Auth, data.get('email'), data.get('password'))
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUser(user.toJSON()));

                updateProfile(Auth.currentUser, {
                    displayName: data.get('name')
                }).then(() => {
                    // Profile updated!
                    window.location.href = './'
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`${errorCode}: ${errorMessage}`);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`${errorCode}: ${errorMessage}`);
            });
    };

    return (
        <div className = "body">
            <div className = "split-screen">



                <div className = "right">
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 10,
                        ml: 5,
                        mr:5
                    }}>
                        <Typography component="h1" variant="h5"
                                    sx={{
                                            mb: 5,
                                            ml: 5,
                                            mr:5 }}>
                            Sign up
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="password"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 ,
                                backgroundColor: 'black'}}
                        >
                            Sign Up
                        </Button>
                        <Button variant = 'text'
                                href='././SignIn.js'
                                sx={{color: 'black'}}>
                            Already have an account? Sign In
                        </Button>
                    </Box>

                </div>

                <div className = "left">
                    <AuthProviders/>
                </div>






            </div>
        </div>




    )
}

