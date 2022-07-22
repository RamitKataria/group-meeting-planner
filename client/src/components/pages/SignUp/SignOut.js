import React from "react";
import {Button} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SaveIcon from "@mui/icons-material/Save";






export default function SignOut(){
    function SignOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            alert("Log out successfully");
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode}: ${errorMessage}`);
        });
    }


        return(
        <div>
            <Button variant="contained" color="error"  startIcon={<ExitToAppIcon />}
                    onClick= {()=>{SignOut()}} >
                Sign Out
            </Button>
        </div>

    );



}