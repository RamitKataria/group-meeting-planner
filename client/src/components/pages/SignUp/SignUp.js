import {Button, Container, CssBaseline, Divider, FormControlLabel, Link, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Auth from "../../../firebaseApp";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../redux/user";
import AuthProviders from "./AuthProviders";
import styles from './styles.module.css';
import React, {useState} from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider } from "@mui/material/styles";
import {theme} from '../../../theme/color-theme'

export default function SignIn() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{mx: "auto", my: 5, width: "80%"}}>
                <Box component="div" sx={{justifyContent: "center", display: "flex", pt: 5}}>
                <Paper elevation={8} sx={{maxWidth: 500}}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{px:7, py: 7}}>
                        <Box component="div" sx={{justifyContent: "center", display: "flex", mb: 2}}>
                            <Avatar sx={{bgcolor: 'black'}}>
                                <LockOutlinedIcon />
                            </Avatar>
                        </Box>
                        <Typography
                            sx={{flex: '1 1 100%', fontWeight: 'bold', mb: 5, textAlign: "center"}}
                            variant="h4"
                            component="h1"
                        >
                            Sign Up !
                        </Typography>

                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <TextField
                                autoComplete="name"
                                name="name"
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField
                                required
                                id="password"
                                name="password"
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                InputProps={{
                                    endAdornment:(
                                    <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Stack>

                        <Button variant="contained" fullWidth endIcon={<ArrowForwardIcon/>} type="submit" sx={{mt: 3}}>
                            Sign Up
                        </Button>

                        <Box display="flex" justifyContent="end" sx={{mt: 2}}>
                            <Link href="././signin" variant="body2" >
                                Already have an account?
                            </Link>
                        </Box>

                        <Divider style={{width:'100%', backgroundColor:'Gainsboro'}} sx={{ borderBottomWidth: 1.5, mt: 3, mb: 2 }}/>
                        <AuthProviders/>

                    </Box>
                </Paper>
                </Box>
            </Box>
        </ThemeProvider>
    )
}