import "../../css/popbox.css";
import React, {useState} from "react";
import Modal from "./Modal";
import {Button} from "@mui/material";

export default function CreatePopBox(){

    const [isOpen, setIsOpen] = useState(false);

    return(
       <div className= "popBox">
           <Button variant="contained"  size ="large" onClick=
               {()=>{setIsOpen(true)}}>
             Continued as Guest
           </Button>
           {isOpen && <Modal onClose={setIsOpen}/>}
       </div>

    );



}