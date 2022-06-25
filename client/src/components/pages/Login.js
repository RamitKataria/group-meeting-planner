import React, {useState} from 'react';
import {Button, TextField, Typography,Link} from "@mui/material";
import "../../css/login.css"
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [Email, setEmail]=useState("");
    const [Password, setPassword] = useState("");
    const handleSubmit = () => {
        window.location.href = "./Guest.js";
    }
    return (
        <div className={"outer-div"}>
        <form className="aa" onSubmit={handleSubmit} >
            <Typography variant="h4" display="inline-box" component="h3"  align="center" sx={{ flex: '1 1 100%', fontWeight: 'bold' }}>
                Login
            </Typography>
            <br></br>
            <br></br>

            <TextField input="email" label="email" variant="outlined"   fullWidth
                       onChange={(event)=>setEmail(event.target.value)} required/>
            <br></br>
            <br></br>

            <TextField input="password" label="password" variant="outlined"   fullWidth
                       onChange={(event)=>setPassword(event.target.value)} required/>
            <br></br>
            <br></br>

            <div className="login">
                <Button variant="contained"  size ="large" type="submit" align="center"
                >Login
                </Button>
                <br></br>
                <a href="./SignUp"> Don't have a account? Sign up</a>
            </div>
        </form>
        </div>
    )
}
