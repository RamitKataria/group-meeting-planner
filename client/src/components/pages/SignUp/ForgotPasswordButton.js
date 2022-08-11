import React, {useState} from "react";
import {Button, Link, TextField} from "@mui/material";
import Auth from "../../../firebaseApp";
import {sendPasswordResetEmail} from "firebase/auth";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import {toast, ToastContainer} from "react-toastify";

export default function ForgotPasswordButton() {

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState(null);

    const handleSubmitResetPassword = async (e) => {
        e.preventDefault();
        sendPasswordResetEmail(Auth, email)
            .then(() => {
                toast.success('Email has been sent to you!');
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // alert(`${errorCode}: ${errorMessage}`);
                toast.error('Email does not exist!');
            });
    };

    return (<>
        <Link href="#" variant="body2" onClick={() => setIsOpen(true)}>Forgot Password?</Link>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            newestOnTop={false}
            closeOnClick
            hideProgressBar
            rtl={false}
            pauseOnFocusLoss
            draggable
        />

        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tell us the email address associated with your account, and we’ll send you an email with a link
                    to reset your password.
                </DialogContentText>
                <form onSubmit={handleSubmitResetPassword}>
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
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <DialogActions sx={{mt: 2}}>
                        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit">Reset</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    </>);
}

