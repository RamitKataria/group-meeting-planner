import React, {useState} from 'react';
import "../../css/modal.css";
import { useDispatch} from "react-redux"
import {addGuest} from "./GuestSlice";
import {Button, TextField, Typography} from "@mui/material";

export default function Modal({onClose}){
    const dispatch = useDispatch();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");


    const handleFormSubmit = (event)=>{
        event.preventDefault();
        dispatch(addGuest({Name:Name, Email:Email}));
		window.location.href = './AvailabilityPage';
    };

    return (
        <div className="background">
            <div className="modalContainer">
                <div className="title">
                    <Typography variant = "h4" display="inline-box" component="h3"  align="center">
                        Continued As Guest
                    </Typography>
                </div>


                <br></br>
                <br></br>
                <div className="body">
                    <form className="Guest" onSubmit={handleFormSubmit}>
                        <TextField  label="Name" variant="outlined"  fullWidth
                                    onChange={(event)=>setName(event.target.value)} required/>
                        <br></br>
                        <br></br>

                        <TextField input="email" label="Email" variant="outlined"   fullWidth
                                   onChange={(event)=>setEmail(event.target.value)}/>

                        <br></br>
                        <br></br>
                        <br></br>
                        <div className= "footer">
                            <Button variant="contained"  size ="large" id="cancel"
                                onClick={()=>onClose(false)}>Cancel
                            </Button>

                            <Button variant="contained"  size ="large" type="submit"
                            >Continue
                            </Button>

                        </div>
                    </form>
                </div>


            </div>

        </div>
    )
}

