
const bcrypt = require('bcrypt');
const { Admin } = require('./models/user'); 

async function createAdmin(email, password) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const admin = await Admin.create({
      email: email,
      password: hashedPassword
    });

    console.log('Admin user created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Example usage:
const adminEmail = 'jadhavjitendra3207@gmail.com';
const adminPassword = '@Saurabh9833@';

createAdmin(adminEmail, adminPassword);