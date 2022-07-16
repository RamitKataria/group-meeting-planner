
import React, {useState} from "react";
import Modal from "./Modal";
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