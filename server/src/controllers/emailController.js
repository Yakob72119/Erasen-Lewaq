// controllers/authController.js

const nodemailer = require('nodemailer');
const User = require('./../models/userModel');
const md5=require("md5");

const sendEmail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.hmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME, // Your email address
            pass: process.env.EMAIL_PASSWORD // Your email password
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address
        to: to, // Recipient's email from the form
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

const generatePassword = () => {
    const passwordLength = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$_&';
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log('Generated Password:', password);
    return password;
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Generate a new password
        const newPassword = generatePassword();

        // Send the new password to the user's email
        await sendEmail(email, 'Password Reset', `Your new password is: ${newPassword}`);

        // Update the user's password in the database
        user.password = md5(newPassword);
        await user.save();

        // Respond with a success message
        res.send({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password: ', error);
        res.status(500).send('Error resetting password');
    }
};

module.exports = {
    forgetPassword
};
