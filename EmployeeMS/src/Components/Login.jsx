import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Login = () => {

    //State variable tpo store email, password & error messages
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null); //State variable to store error messages
    const navigate = useNavigate();  //Hook for programmatic navigation

    //to store cookies
    axios.defaults.withCredentials = true;

    //Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        //Axios library to call server side 
        axios.post('http://localhost:3000/auth/adminlogin', values)// post data
        .then(result => {
            //If login is successful, navigate to the dashboard
            if (result.data.loginStatus) {
                 navigate('/dashboard');
            } else {
                //If login fails, set error message
                setError(result.data.Error);
            }
            
        })
        .catch(err =>
            //if an error occurs during login request, set error message
             console.log(err));
    }; 

    //JSX to render login form
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2 className='text-center'>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
                    <input 
                    type="email" 
                    name='email' 
                    autoComplete= 'off' 
                    placeholder='Enter Email'
                    onChange={(e) => setValues({...values, email : e.target.value})}
                    className='form-control rounded-0'
                    /> 
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
                    <input 
                    type="password" 
                    name='password' 
                    placeholder='Enter Password'
                    onChange={(e) => setValues({...values, password : e.target.value})}className='form-control rounded-0'
                    /> 
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log In</button>
                <div className='mb-1'>
                    <input 
                    type="checkbox" 
                    name="tick" 
                    id="tick" 
                    className='me-2' 
                    />
                    <label htmlFor="password">You Agree with the terms & conditions</label>         
                </div>
            </form>
        </div>
    </div>
  );
};