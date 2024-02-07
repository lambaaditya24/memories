import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { Avatar, Button, Container, Grid, Paper,  Typography, } from "@mui/material";
import useStyles from "./styles";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { signup, signin} from '../../actions/auth';


const initialState = { firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
const Auth = () => {
  const [showPassowrd, setShowPassword] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  // const state = null;
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignUp){
      dispatch(signup(formData, navigate));
    }else{
      dispatch(signin(formData, navigate));
    }
  };

  const switchMode = () => {
    setIsSignUp((value) => !value);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log(res)
    const token = res?.credential;
    const result = jwtDecode(token);
    console.log(result);
    try{
        dispatch({type:'AUTH', data:{result, token}});
        navigate('/');
    }catch(error){
        console.log(error,"Google Login Failed");
    }
  };

  const googleFailure = (error) => {
    console.log(error)
    console.log("Google Sign IN Unsuccessful");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon color="primary" />
        </Avatar>
        <Typography variant="h6" sx={classes.text}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form sx={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus type="text" half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus type="text" half />
              </>
            )}

            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassowrd ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignUp && (
              <Input name="confirmPassword" label="Confirm Passowrd" handleChange={handleChange} type="password" />
            )}
          </Grid>

          
          <Button type="submit" fullWidth variant="contained" color="primary" sx={classes.submit} >
            {isSignUp ? "SignUp" : "Sign In"}
          </Button>

          {/* Google LOGIN */}
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}> {isSignUp ? "Already have an Account? Sign In" : "Don't have an account? Sign Up!"} </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
