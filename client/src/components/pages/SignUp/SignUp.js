import {Button, Divider, LinearProgress, Link, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Auth from "../../../firebaseApp";
import {createUserWithEmailAndPassword, onAuthStateChanged, updateProfile} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setUser} from "../../../redux/user";
import AuthProviders from "./AuthProviders";
import React, {useState} from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider } from "@mui/material/styles";
import {theme} from '../../../theme/color-theme'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import LoadingBar from "../../LoadingBar";
import {toast, ToastContainer} from "react-toastify";
import {addUser} from "../../../redux/users/service";

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
            if (user) {
                navigate('../home');
            }
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.currentTarget);
        createUserWithEmailAndPassword(Auth, data.get('email'), data.get('password'))
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUser(user.toJSON()));

                updateProfile(Auth.currentUser, {
                    displayName: data.get('name')
                }).catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    // alert(`${errorCode}: ${errorMessage}`);
                    setLoading(false);
                    toast.error('Some other error!');
                });
                addUser();
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // alert(`${errorCode}: ${errorMessage}`);
                setLoading(false);
                toast.error('Email has existed!');
            });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ThemeProvider theme={theme}>
            {loading ?
                (<LoadingBar/>) :
                <Box sx={{mx: "auto", my: 5, width: "70%"}}>
                    <Box component="div" sx={{justifyContent: "center", display: "flex", pt: 5}}>
                        <Paper elevation={8} sx={{width: 500}}>
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                            <Box component="div" sx={{px: 7, py: 7}}>
                                <Box component="div" sx={{justifyContent: "center", display: "flex", mb: 2}}>
                                    <Avatar sx={{bgcolor: 'black'}}>
                                        <LockOutlinedIcon/>
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
                                    component="form"
                                    onSubmit={handleSubmit}
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
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <Button variant="contained" fullWidth endIcon={<ArrowForwardIcon/>} type="submit"
                                            sx={{mt: 3}}>
                                        Sign Up
                                    </Button>
                                </Stack>
                                <Box display="flex" justifyContent="end" sx={{mt: 2}}>
                                    <Link href="../signin" variant="body2">
                                        Already have an account?
                                    </Link>
                                </Box>

                                <Divider style={{width: '100%', backgroundColor: 'Gainsboro'}}
                                         sx={{ borderBottomWidth: 1.5, my: 3 }}/>
                                <AuthProviders/>

                            </Box>
                        </Paper>
                    </Box>
                </Box>
            }
        </ThemeProvider>
    )
}