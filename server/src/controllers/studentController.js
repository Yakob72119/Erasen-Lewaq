const Student = require('./../models/studentModel');
const User = require('./../models/userModel');
const md5=require("md5");
const mongoose = require('mongoose');


const register = async (req, res) => {
  try {
    const {fullName, email, department, collage, password, gender } = req.body;

    const existingUser  = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    const Name = fullName;
    const firstName = Name.split(" ")[0];
    const user = new User({
      email: email,
      fname: firstName,
      password: md5(password),
      role: "student",
      department: department 
    });

    await user.save();

    
    const student = new Student({
      fullName:fullName,
      email:email,
      department: department,
      collage: collage,
      password: md5(password),
      gender: gender,
      user: user._id
        });

    await student.save();

    res.status(201).json({ message: 'student registered successfully' });
  } catch (error) {
    
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports={
  register
};