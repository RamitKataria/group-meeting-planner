import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import Auth from "../../../firebaseApp";
import {setUser} from "../../../redux/user";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function AuthProviders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    getRedirectResult(Auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            dispatch(setUser(user.toJSON()));
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(`${errorCode}: ${errorMessage}`);
    });

    const handleGoogleSignIn = async (e) => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(Auth, provider);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            margin: 'auto',
        }}>
            <Button onClick={handleGoogleSignIn} sx={{backgroundColor: 'none', minHeight: 50, color:'black',mr:4
            }} >
                <GoogleIcon/>   Continue with Google
            </Button>
            <Button onClick={() => {navigate('/')}} sx={{backgroundColor: 'none', minHeight: 50, color:'black'
            }} >
                <GitHubIcon/>   Continue with GitHub
            </Button>
        </Box>
    )
}



