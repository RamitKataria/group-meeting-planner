import React, {useState} from 'react';
import {Button, TextField, Typography,Link} from "@mui/material";
import "./login.css"
import {useNavigate} from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [Email, setEmail]=useState("");
    const [Password, setPassword] = useState("");
    const handleSubmit=()=>{
        navigate("/guestPage");
    }
    return (
        <form className="aa" onSubmit={handleSubmit} >
            <Typography variant = "h4" display="inline-box" component="h3"  align="center">
                Login in
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

            <div className = "Loginin">
                <Button variant="contained"  size ="large" type="submit" align="center"
                >Login in
                </Button>
                <br></br>
                <Link
                    component = "button"
                    variant="body2"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Don't have a account? Sign up
                </Link>
            </div>










        </form>
    )
}
