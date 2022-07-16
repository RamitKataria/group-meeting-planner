import "../../../css/popbox.css";
import React, {useState} from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";
import {Button} from "@mui/material";

export default function CreatePopBox(){

    const [isOpen, setIsOpen] = useState(false);

    return(
       <div className= "popBox">
           <Button variant="text" onClick=
               {()=>{setIsOpen(true)}}>
             Forgot Password?
           </Button>
           {isOpen && <ForgotPasswordModal onClose={setIsOpen}/>}
       </div>

    );



}