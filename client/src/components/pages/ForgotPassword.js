
import React, {useState} from "react";
import ForgotPasswordModal from "./SignUp/ForgotPasswordModal";
import {Button} from "@mui/material";

export default function ForgotPassword(){

    return(
        <div className= "forgotPassword">
            <Button variant="text" onClick=
                {()=>{alert("forgot password?")}}>
                Forgot Password?
            </Button>
        </div>

    );



}