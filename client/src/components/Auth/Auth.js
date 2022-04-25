import React, { useState } from 'react';
import { Avatar, Paper,Grid, Button, Container,Typography, TextField} from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import Icon from './icon';
import useStyles from './styles'
import { AUTH } from '../../constants/actionType';
import {signUp, signIn} from '../../actions/auth'


const Auth = () => {
    const initialState = {firstName:'', lastName:'', email:'' ,password:'' ,confirmPassword:'' }
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );
    const [isSignup, setIsSignUp] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setFormData] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            dispatch(signUp(formData,history));
        }else{
            dispatch(signIn(formData,history));
        }

    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const switchMode = () => {
        setIsSignUp ((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false)

    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId
        
        try {
            dispatch({type:AUTH , data:{result, token}})
            history.push('/')
        } catch (error) {
            
        }
        console.log("Success");
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Login Failed");
    }
    return (
        <Container component= "main" maxWidth = "xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up ' : 'Sign In'} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    
                                    <Input name="firstName" label = "First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label = "Last Name" handleChange={handleChange} autoFocus half/>
                                    
                                </>
                            )
                        }
                        <Input name = "email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="749645136392-s63fllfeg1kmgr7d62dhiip70q00okr7.apps.googleusercontent.com"
                        render = {(renderProps) => (
                            <Button 
                              className={classes.googleButton} 
                              color="primary" fullWidth 
                              onClick={renderProps.onClick} 
                              disabled={renderProps.disabled} 
                              startIcon= {<Icon />} 
                              variant="contained" > Google Sign In </Button>
                        )}

                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Create an account."}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
