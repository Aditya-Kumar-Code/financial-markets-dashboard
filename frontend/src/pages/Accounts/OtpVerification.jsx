import React, { useState } from 'react';
import axios from 'axios';
import './Accounts.css';
import Header from '../../components/Header';

const OtpVerification = () => {
    const [email, setEmail] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/validate-otp', { email, mobile_number, otp });
            alert('OTP validated successfully!');
        } catch (error) {
            alert('Error validating OTP');
        }
    };

    return (
        <>
        <Header/>
        <div class="otpbox">
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br/>
                <input type="text" placeholder="Mobile Number" value={mobile_number} onChange={(e) => setMobileNumber(e.target.value)} />
                <br/>
                <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                <br/>
                <button type="submit">Verify OTP</button>
            </form>
        </div>
        </>
    );
};

export default OtpVerification;