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

function generateOTP(role) {
  const otpLength = 6;
  const otpChars = '0123456789';
  let otp = '';
  for (let i = 0; i < otpLength; i++) {
    otp += otpChars.charAt(Math.floor(Math.random() * otpChars.length));
  }
  
  // Set OTP expiration time to 2 minutes (120 seconds)
  const expirationTime = Date.now() + (2 * 60 * 1000); // 2 minutes in milliseconds

  return { otp, expirationTime, role };
}

const otpStore = {};

router.post('/login', limiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ where: { email } });
    let userType = 'admin';

    if (!user) {
      user = await Receptionist.findOne({ where: { email } });
      userType = 'receptionist';
    }
    if (!user) {
      user = await Doctor.findOne({ where: { email } });
      userType = 'doctor';
    }
    if (!user) {
      user = await Patient.findOne({ where: { email } });
      userType = 'patient';
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { otp, expirationTime, role } = generateOTP(userType);

    otpStore[email] = { otp, expirationTime, role };

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

    if (!storedOTP) {
      // If no OTP is stored for the given email
      return res.status(401).json({ error: 'No OTP found for this email' });
    }

    if (storedOTP.expirationTime < Date.now()) {
      // If the stored OTP has expired
      return res.status(401).json({ error: 'OTP has expired' });
    }

    if (storedOTP.otp !== otp) {
      // If the provided OTP does not match the stored OTP
      return res.status(401).json({ error: 'Incorrect OTP' });
    }

    // If all checks pass, OTP is verified successfully
    const { role } = storedOTP;
    // Generate JWT token
    const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: '1h' });
    // Remove the OTP from the store
    delete otpStore[email];
    res.status(200).json({ message: 'OTP verification successful', token, role });
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

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Admin.findOne({ where: { email } })
      || await Receptionist.findOne({ where: { email } })
      || await Doctor.findOne({ where: { email } })
      || await Patient.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found with this email' });
    }

    const { otp, expirationTime } = generateOTP(user.role);

    otpStore[email] = { otp, expirationTime };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'One-Time Password (OTP) Verification for Medsecura',
      text: `Dear User,\n\nWelcome to Medsecura!\n\nTo reset your password, please use the following One-Time Password (OTP) to complete the verification process:\n\n${otp}\n\nThis OTP is valid for 2 minutes.\n\nIf you did not request this OTP or have any concerns, please contact our support team.\n\nBest regards,\nMedsecura Team`
    };

    await sendEmail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully', email });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email across all user types
    let user = await Admin.findOne({ where: { email } }) ||
               await Receptionist.findOne({ where: { email } }) ||
               await Doctor.findOne({ where: { email } }) ||
               await Patient.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found with this email' });
    }

    // Update user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });

    // Remove the OTP from the store
    delete otpStore[email];

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/forgot-password-verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOTP = otpStore[email];

    if (!storedOTP) {
      return res.status(401).json({ error: 'No OTP found for this email' });
    }

    if (storedOTP.expirationTime < Date.now()) {
      return res.status(401).json({ error: 'OTP has expired' });
    }

    if (storedOTP.otp !== otp) {
      return res.status(401).json({ error: 'Incorrect OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully', email });
  } catch (error) {
    console.error('Forgot password OTP verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/add-patient',async(req,res)=>{
  const details = req.body;
  /* 
  details = {
    name: "John Doe",
    middleName: "Smith",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    gender: "male/female",
    email: "ex@gmail.com",
    ABHAID: "1234567890",
    homeAddress: "123, Main Street, City, State, Country",
    bloodGroup: "A+",
    maritalStatus: "single/married",
    occupation: "Engineer",
    Religion: "Hindu"
  }
   */
  try {

    // check if patient already exists
    const patientExists = await Patient.findOne({ where: { email: details.email } });
    if (patientExists) {
      return res.status(409).json({ error: 'Patient with this email already exists' });
    }
    // create default password for the patient
    details.password =  Math.random().toString(36).slice(-8);
    // insert patient details into the database
    const patient = await Patient.create(details);

    if(!patient){
      return res.status(500).json({ error: 'Error adding patient' });
    }
    // send email to the patient with the default password
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: details.email,
      subject: 'Welcome to Medsecura!',
      text: `Dear ${details.name},\n\nWelcome to Medsecura!\n\nYour account has been successfully created. Please use the following credentials to log in to your account:\n\nEmail: ${details.email}\nPassword: ${details.password}\n\nPlease remember to change your password after logging in for the first time.\n\nBest regards,\nMedsecura Team`
    };

    await sendEmail(mailOptions);

    res.status(200).json({ message: 'Patient added successfully', patient });
  }catch(error){
    console.error('Error adding patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/add-doctor',async(req,res)=>{
  const details = req.body;
  /* 
  details = {
     name: "",
    email: "",
    specialty: "",
    contactNumber: "",
    address: "",
    qualification: "",
}*/
  try{
    // check if doctor already exists
    const doctorExists = await Doctor.findOne({ where: { email: details.email } });
    if (doctorExists) {
      return res.status(409).json({ error: 'Doctor with this email already exists' });
    }
    // create default password for the doctor
    details.password =  Math.random().toString(36).slice(-8);
    // insert doctor details into the database
    const doctor = await Doctor.create(details);

    if(!doctor){
      return res.status(500).json({ error: 'Error adding doctor' });
    }
    // send email to the doctor with the default password
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: details.email,
      subject: 'Welcome to Medsecura!',
      text: `Dear ${details.name},\n\nWelcome to Medsecura!\n\nYour account has been successfully created. Please use the following credentials to log in to your account:\n\nEmail: ${details.email}\nPassword: ${details.password}\n\nPlease remember to change your password after logging in for the first time.\n\nBest regards,\nMedsecura Team`
    };

    await sendEmail(mailOptions);

    res.status(200).json({ message: 'Doctor added successfully', doctor });

  }catch(error){
    console.error('Error adding doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.get('/get-patients',async(req,res)=>{
  try{
    const patients = await Patient.findAll();
    // do not return the password field
    patients.forEach(patient => {
      delete patient.dataValues.password;
      delete patient.dataValues.otp;
    });

    res.status(200).json({ patients });
  }catch(error){
    console.error('Error getting patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/get-doctors',async(req,res)=>{
  try{
    const doctors = await Doctor.findAll();
    // do not return the password field
    doctors.forEach(doctor => {
      delete doctor.dataValues.password;
      delete doctor.dataValues.otp;
    });

    res.status(200).json({ doctors });
  }catch(error){
    console.error('Error getting doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/get-patient',async(req,res)=>{
  const { email } = req.body;
  try{
    const patient = await Patient.findOne({ where: { email } });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    // do not return the password field
    delete patient.dataValues.password;
    delete patient.dataValues.otp;

    res.status(200).json({ patient });
}catch(error){
  console.error('Error getting patient:', error);
  res.status(500).json({ error: 'Internal server error' });
}
})

router.put('/update-patient',async(req,res)=>{

  const details = req.body;
  /* 
  details = {
    id: 1,
    email:"xyz@gmail.com"
    name: "John Doe",
    middleName: "Smith",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
})
*/
  try{
    const patient = await Patient.findOne({ where: { email: details.email } });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await patient.update(details);

    res.status(200).json({ message: 'Patient updated successfully', patient });
  }catch(error){
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


})
module.exports = router;
