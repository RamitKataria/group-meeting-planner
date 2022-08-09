import {Button, Divider, FormControlLabel, LinearProgress, Link, TextField} from "@mui/material";
import ForgotPasswordButton from "./ForgotPasswordButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useDispatch} from "react-redux";
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {setUser} from "../../../redux/user";
import AuthProviders from "./AuthProviders";
import React, {useState} from "react";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {ThemeProvider } from "@mui/material/styles";
import {theme} from '../../../theme/color-theme'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Auth from "../../../firebaseApp";
import {toast, ToastContainer} from "react-toastify";
import LoadingBar from "../../LoadingBar";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.currentTarget);
        signInWithEmailAndPassword(Auth, data.get('email'), data.get('password'))
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUser(user.toJSON()));
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // alert(`${errorCode}: ${errorMessage}`);
                setLoading(false);
                toast.error('Wrong username or password!');
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
                            <Box component="div" sx={{px:7, py: 7}}>
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
                                    Welcome back !
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
                                        required
                                        fullWidth
                                        type="email"
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
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

                                    <Button variant="contained" fullWidth endIcon={<ArrowForwardIcon/>} type="submit" sx={{mt: 3}}>
                                        Log in
                                    </Button>
                                </Stack>


                                <Box display="flex" justifyContent="space-between" sx={{mt: 2}}>
                                    <ForgotPasswordButton/>
                                    <Link href="../signup" variant="body2" >
                                        Don't have an account?
                                    </Link>
                                </Box>

                                <Divider style={{width:'100%', backgroundColor:'Gainsboro'}} sx={{ borderBottomWidth: 1.5, my: 3 }}/>
                                <AuthProviders/>

                            </Box>
                        </Paper>
                    </Box>
                </Box>
            }
        </ThemeProvider>
    )
}