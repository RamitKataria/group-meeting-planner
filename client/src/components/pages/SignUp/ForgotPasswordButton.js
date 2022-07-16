import "../../../css/popbox.css";
import React, {useState} from "react";
import {Button, Link, Modal, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function ForgotPasswordButton() {
    const [isOpen, setIsOpen] = useState(false);

    const style = {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', // width: 400,
        bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
    };

    return (<>
            <Link href="#" variant="body2" onClick={() => setIsOpen(true)}>Forgot Password?</Link>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-labelledby="modal-forgot-password"
            >
                <Box sx={style}>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Typography component="p" variant="p">
                        Tell us the email address associated with your account, and we’ll send you an email with a link
                        to reset your password.
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 3}}>
                        <Grid container spacing={2}>
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
                        </Grid>
                        <div className="Reset">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 0.2}}>
                                Reset Password
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </>);
}
