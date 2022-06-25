import "./SignUp.css";
import React, {useState} from 'react';
import {Grid, Button, TextField, Typography, Link} from "@mui/material";
import CreatePopBox from "./popbox";
import {useNavigate} from "react-router-dom";


export default function SignUp(){
    const navigate = useNavigate();
    const [Name, setName]=useState("");
    const [Password, setPassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    const [email, setEmail] = useState("");

    const validate= (Password, cPassword)=>{
        if(cPassword === Password){

        }
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(cPassword === Password){
            navigate("/guestPage");
        }else{
            return null;
        }


    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <form className="aa" onSubmit={handleSubmit} >
                    <Typography variant = "h4" display="inline-box" component="h3"  align="center">
                        Sign Up
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
                    <TextField input="password" label="Confirm password" variant="outlined"   fullWidth

                               onChange={(event)=>setcPassword(event.target.value)} required/>
                    <br></br>
                    <br></br>


                    <br></br>


                    <div className = "SignUp">
                        <Button variant="contained"  size ="large" type="submit" align="center" type="submit"
                        >Sign Up
                        </Button>
                        <br></br>
                        <Link
                            component = "button"
                            variant="body2"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Already have a account? Login in
                        </Link>
                    </div>
                </form>
            </Grid>

            <Grid item xs={6}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                    <CreatePopBox/>
            </Grid>

        </Grid>



    )
}
