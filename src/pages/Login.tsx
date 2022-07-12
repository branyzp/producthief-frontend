import { CheckBox } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <form>
                <h1>Log in to steal back your time!</h1>
                <h2>Please fill in your username and password</h2>
                <div className='formContainer'>
                    {/* <label htmlFor='username'>Username</label> <br/> */}
                    <TextField  sx={{mt:2}} label='Username' id='username' required variant='outlined' ></TextField>
                </div>
                <div className='formContainer'>
                    {/* <label htmlFor='password'>Password</label><br/> */}
                    <TextField sx={{ mt: 3 }} label='Password' id='password' required variant='outlined'></TextField>
                </div>
                <div className='formContainer'>
                    
                    
                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                        
                    
                </div>
                
                <Button
                className='btn'
                
                sx={{
								':hover': {
									bgcolor: 'black',
									color: 'white',
								},
								backgroundColor: 'white',
                                color: 'black',
                                fontFamily: 'Oxygen',
                                mt: 2,
                                px: 10,
                                py: 1.5
                                
                                
                                
                    }} variant='contained'>Login</Button>
                
                <br/>
                <br/>
                <Link to={'/register'} > New? Register here</Link>
               
            </form>
        </div>
    );
};

export default Login;