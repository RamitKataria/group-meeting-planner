 import React from "react";
import {Button} from "@mui/material";





export default function SendEmail(){
    function sendMail(){
        fetch(process.env.REACT_APP_SERVER_URL + '/sendmail', {
            method: 'GET'
        }).then(()=>{
            console.log("email sent successfully!")
        }).catch((error)=>{console.log(error.message)});
    }

    return(
        <div>
            <Button variant="text"
            onClick= {()=>{sendMail()}} >
                SendEmail
            </Button>
        </div>

    );



}