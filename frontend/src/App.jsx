import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import Login  from "./pages/Accounts/Login";
import Signup from "./pages/Accounts/SignUp";
import OtpVerification from "./pages/Accounts/OtpVerification";
import Stock from  "./pages/Stock/Stock";
function App() {
  return (
    <Router>
      
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otpverification" element={<OtpVerification />} />
          <Route path="/stock/:stock_name" element={<Stock />} />

          
        </Routes>
      
    </Router>
  );
}

export default App;