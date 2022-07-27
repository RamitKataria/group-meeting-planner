import {Button, Container, CssBaseline, Divider, FormControlLabel, Link, TextField} from "@mui/material";
import ForgotPasswordButton from "./ForgotPasswordButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import {useDispatch} from "react-redux";
import {signInWithEmailAndPassword} from "firebase/auth";
import Auth from "../../../firebaseApp";
import {setUser} from "../../../redux/user";
import AuthProviders from "./AuthProviders";
import styles from "./styles.module.css";


export default function SignIn() {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        signInWithEmailAndPassword(Auth, data.get('email'), data.get('password'))
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUser(user.toJSON()));
                window.location.href = './'
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`${errorCode}: ${errorMessage}`);
            });
    };

    return (
        <div className = {styles.body}>
            <div className = {styles.splitscreen}>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt:5,
                    ml: 5,
                    mr:5,
                    mb: 5
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5"
                                sx={{
                                    mb: 5,
                                    ml: 5,
                                    mr:5 }}>
                        Welcome back
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />

                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        type="submit"

                        sx={{ mt: 3, mb: 2 ,
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'black',
                            }

                        }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <ForgotPasswordButton/>
                        </Grid>
                        <Grid item>
                            <Link href="././SignUp" variant="body2" sx={{color: 'black',textDecoration: 'none'}}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>

                    <Divider style={{width:'100%',backgroundColor:'Gainsboro'}} sx={{ borderBottomWidth: 1.5, mt:2, mb:1 }}/>
                    <AuthProviders/>
                </Box>
            </div>
        </div>
    )}
