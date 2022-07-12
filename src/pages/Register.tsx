import { Button, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <form>
                <h1>Register for an account</h1>
                <h2>Please do not leave any fields blank.</h2>
                <div className='formContainer'>
                    {/* <label htmlFor='username'>Username</label> <br/> */}
                    <TextField  sx={{mt:2}} label='Username' id='username' required variant='outlined' ></TextField>
                </div>
                <div className='formContainer'>
                    {/* <label htmlFor='password'>Password</label><br/> */}
                    <TextField  sx={{mt:3}} label='Password' id='password' required variant='outlined'></TextField>
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
                                
                                
                                
                    }} variant='contained'>Register</Button>
                <br/>
                <br/>
                <Link to={'/login'} > Have an account? Log in!</Link>
               
            </form>
          
            
        </div>
    );
};

export default Register;