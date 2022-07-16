// https://github.com/cyber-wolve/AuthInMern/blob/Authentication-In-MERN/client/src/components/Singup/index.jsx
import { useState } from "react";
import signUp from "../../css/signUp.module.css";
import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';



export default function login(){


    const handleChange = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <div className={signUp.signup_container}>
            <div className={signUp.signup_form_container}>
                <div className={signUp.left}>
                    <form className={signUp.form_container} onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        <input
                            type="Username"
                            placeholder="Username"
                            name="Username"
                            onChange={handleChange}

                            required
                            className={signUp.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}

                            required
                            className={signUp.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}

                            required
                            className={signUp.input}
                        />
                        <input
                            type="password"
                            placeholder="Confirmed Password"
                            name="password"
                            onChange={handleChange}

                            required
                            className={signUp.input}
                        />

                        <button type="submit" className={signUp.green_btn}>
                            Sign Up
                        </button>
                        <Button variant="text"
                                href="./Login" >
                            Already have an account? Login
                        </Button>
                    </form>
                </div>
                <div className={signUp.right1}>
                    <button type="submit" className={signUp.white_btn}>
                        <GoogleIcon /> Continue with Google
                    </button>
                    <button type="submit" className={signUp.white_btn}>
                        <AppleIcon /> Continue with Apple
                    </button>
                    <button type="submit" className={signUp.white_btn}>
                        <FacebookIcon /> Continue with Facebook
                    </button>
                    <button type="submit" className={signUp.white_btn}>
                        <GitHubIcon /> Continue with Github
                    </button>


                </div>
            </div>
        </div>
    );
};


