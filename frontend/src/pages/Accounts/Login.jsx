import React, { useState } from 'react';
import axios from 'axios';
import './Accounts.css';
import Header from '../../components/Header';
import {Link } from "react-router-dom";

const Login = () => {
    const [email_or_mobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email_or_mobile, password });
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
        } catch (error) {
            alert('Error during login');
        }
    };

    return (
      <>
        <Header/>
        <div class="loginbox">
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Email or Mobile Number" value={email_or_mobile} onChange={(e) => setEmailOrMobile(e.target.value)} required />
              <br/>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <br/>
              <Link to="/">
              <button type="submit">Login</button>
              </Link>
          </form>
          <Link to="/signup">
            <p>Not Have a account  ? Sign Up</p>
        </Link>
        </div>
      </>
    );
};

export default Login;