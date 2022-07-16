import "../../css/popbox.css";
import React, {useState} from "react";
import Modal from "./Modal";
import {Button} from "@mui/material";

export default function CreatePopBox(){

    const [isOpen, setIsOpen] = useState(false);

    return(
       <div className= "popBox">
           <Button variant="text" onClick=
               {()=>{setIsOpen(true)}}>
             Forgot Password?
           </Button>
           {isOpen && <Modal onClose={setIsOpen}/>}
       </div>

    );



}