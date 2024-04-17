const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Admin, Receptionist, Doctor, Patient } = require('../models/user');
const { sendEmail } = require('../nodemailer');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after some time"
});

router.use(helmet());

const JWT_SECRET = process.env.JWT_SECRET;

function generateOTP() {
  const otpLength = 6;
  const otpChars = '0123456789';
  let otp = '';
  for (let i = 0; i < otpLength; i++) {
    otp += otpChars.charAt(Math.floor(Math.random() * otpChars.length));
  }
  
  // Set OTP expiration time to 2 minutes (120 seconds)
  const expirationTime = Date.now() + (2 * 60 * 1000); // 2 minutes in milliseconds

  return { otp, expirationTime };
}

const otpStore = {};

router.post('/login', limiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ where: { email } });
    let role = 'admin';

    if (!user) {
      user = await Receptionist.findOne({ where: { email } });
      role = 'receptionist';
    }
    if (!user) {
      user = await Doctor.findOne({ where: { email } });
      role = 'doctor';
    }
    if (!user) {
      user = await Patient.findOne({ where: { email } });
      role = 'patient';
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { otp, expirationTime } = generateOTP();

    otpStore[email] = { otp, expirationTime };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'One-Time Password (OTP) Verification for Medsecura',
      text: `Dear User,\n\nWelcome to Medsecura!\n\nTo ensure secure access to your account, please use the following One-Time Password (OTP) to complete the verification process:\n\n${otp}\n\nThis OTP is valid for 2 minutes.\n\nIf you did not request this OTP or have any concerns, please contact our support team.\n\nBest regards,\nMedsecura Team`
    };
    
    await sendEmail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully', email, role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOTP = otpStore[email];

    if (storedOTP && storedOTP.expirationTime > Date.now() && storedOTP.otp === otp) {
      // OTP is valid
      const role = storedOTP.role;
      // Generate JWT token
      const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'OTP verification successful', token, role });
    } else {
      // OTP is invalid or expired
      res.status(401).json({ error: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/check-username', [
  body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });
    const receptionist = await Receptionist.findOne({ where: { username } });
    const doctor = await Doctor.findOne({ where: { username } });
    const patient = await Patient.findOne({ where: { username } });

    if (admin || receptionist || doctor || patient) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    res.status(200).json({ message: 'Username is available' });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
