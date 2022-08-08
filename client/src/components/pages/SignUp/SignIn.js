import {Button, Divider, FormControlLabel, LinearProgress, Link, TextField} from "@mui/material";
import ForgotPasswordButton from "./ForgotPasswordButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
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

function LoadingBar	() {
    return (
        <Stack sx={{ width: '100%', color: '#DF7861'}}>
            <LinearProgress color="inherit" />
        </Stack>
    )
}

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
        setLoading(true);
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        signInWithEmailAndPassword(Auth, data.get('email'), data.get('password'))
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUser(user.toJSON()));
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
            {loading ?
                (<LoadingBar/>) :
                <Box sx={{mx: "auto", my: 5, width: "70%"}}>
                    <Box component="div" sx={{justifyContent: "center", display: "flex", pt: 5}}>
                        <Paper elevation={8} sx={{width: 500}}>
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
                                    Welcome back !
                                </Typography>
                                <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <TextField
                                        required
                                        fullWidth
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
                                </Stack>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                    sx={{mt: 2}}
                                />

                                <Button variant="contained" fullWidth endIcon={<ArrowForwardIcon/>} type="submit" sx={{mt: 3}}>
                                    Log in
                                </Button>

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