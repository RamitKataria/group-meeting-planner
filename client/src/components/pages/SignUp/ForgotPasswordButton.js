import "../../../css/popbox.css";
import React, {useState} from "react";
import {Button, Link, Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Auth from "../../../firebaseApp";
import {sendPasswordResetEmail} from "firebase/auth";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";

export default function ForgotPasswordButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState(null);

    const style = {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', // width: 400,
        bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email !==""){
            console.log(email);
            console.log(typeof email);
            sendPasswordResetEmail(Auth,email)
                .then(() => {
                    alert("Email has been sent to you, Please check and verify");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`${errorCode}: ${errorMessage}`);
                });
        }else{
            alert("please write down your email address");
        }



    };

    return (<>
        <Link href="#" variant="body2" onClick={() => setIsOpen(true)}>Forgot Password?</Link>

        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tell us the email address associated with your account, and we’ll send you an email with a link
                    to reset your password.
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        autofocus
                        margin="dense"
                        id="email"
                        label="Email:"
                        type="email"
                        name="email"
                        fullWidth
                        variant="standard"
                        value = {email}
                        onChange = {(event)=>{setEmail(event.target.value)}}
                    />
                    <DialogActions sx={{mt:2}}>
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit">Reset</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    </>);
}

