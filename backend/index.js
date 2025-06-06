const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors=require('cors');
const pool=require('./db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

app.get('/companies-list',async(req,res)=>{
    try{
        const newtodo=await pool.query("select * from companies_list",)
        const p=res.json(newtodo.rows);
        return p;
    }
    catch(err)
    {
        console.log(err);
    }
})

const sendOtp = async (email, mobile_number, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'invebiz5@gmail.com',
            pass: process.env.GMAIL_SECRET,
        },
    });

    const message = {
        from: 'invebiz5@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        await transporter.sendMail(message);
        console.log('OTP sent');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

app.post('/api/signup', async (req, res) => {
    const { name, email, mobile_number, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    try {
        await pool.query(
            'INSERT INTO users (name, email, mobile_number, hashed_password, otp, otp_expiry) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, email, mobile_number, hashedPassword, otp, otpExpiry]
        );

        await sendOtp(email, mobile_number, otp);
        res.status(201).send({ message: 'Signup successful. OTP sent.' });
    } catch (error) {
        res.status(500).send({ error: 'Error during signup' });
    }
});

app.post('/api/validate-otp', async (req, res) => {
    const { email, mobile_number, otp } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE (email = $1 OR mobile_number = $2) AND otp = $3 AND otp_expiry > NOW()',
            [email, mobile_number, otp]
        );

        if (result.rowCount === 0) {
            return res.status(400).send({ error: 'Invalid or expired OTP' });
        }

        await pool.query(
            'UPDATE users SET otp = NULL, otp_expiry = NULL WHERE email = $1 OR mobile_number = $2',
            [email, mobile_number]
        );

        res.send({ message: 'OTP validated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error during OTP validation' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email_or_mobile, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR mobile_number = $2',
            [email_or_mobile, email_or_mobile]
        );

        if (result.rowCount === 0) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.hashed_password);

        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ error: 'Error during login' });
    }
});



app.get('/stock-data/:stock_id', async (req, res) => {
    const stock_id = req.params.stock_id; // Retrieve stock_id from the route parameters
    try{
        const result = await pool.query('SELECT * FROM "' + stock_id + '"');
        const limitedResult = result.rows.slice(0, 40);

        return res.json(limitedResult);
        
    }
    catch(err)
    {
        console.log(err);
    }
});

app.get('/stock-fundamental/:stock_id', async (req, res) => {
    const stock_id = req.params.stock_id; 
    try{
        const result = await pool.query("SELECT * FROM fundamental where company='" + stock_id+"'");
        const limitedResult = result.rows.slice(0, 40);

        return res.json(limitedResult);
        
    }
    catch(err)
    {
        console.log(err);
    }
});

  


app.listen(process.env.PORT,()=>{
    console.log('listening on port '+process.env.PORT);
});

