import React, { useState } from 'react';
import axios from 'axios';
import './Accounts.css';
import Header from '../../components/Header';
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/signup', { name, email, mobile_number, password });
            alert('Signup successful! Check your email for the OTP.');
            
        } catch (error) {
            alert('Error during signup');
        }
    };

    return (
      <>
        <Header/>
        <div class="box">
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Mobile Number" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
        </form>
        </div>
        </>
    );
};

export default Signup;