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
      department: department,
      balance: 0 
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


const getStudentProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({ user: id });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student data', error: error.message });
  }
};

const updateStudentProfile = async (req, res) => {
  const { id } = req.params; // Assuming `id` is the user ID
  const updatedStudent = req.body;

  try {
    // Find the student record based on the user ID
    const studentRecord = await Student.findOne({ user: id });

    if (studentRecord) {
      // Update student fields
      studentRecord.fullName = updatedStudent.fullName;
      studentRecord.department = updatedStudent.department;
      studentRecord.collage = updatedStudent.collage;
      studentRecord.gender = updatedStudent.gender;

      // Save the updated student record
      const updatedStudentRecord = await studentRecord.save();

      // Find the user record by ID and update
      const user = await User.findById(id);

      if (user) {
        const fullName = updatedStudent.fullName;
        const nameParts = fullName.split(" ");
        const fname = nameParts[0];

        // Update user fields
        user.fname = fname;
        user.department = updatedStudent.department;
        user.email = updatedStudent.email;
        user.password = updatedStudent.password;

        // Save the updated user record
        await user.save();
      }

      res.json(updatedStudentRecord);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating student data', error: error.message });
  }
};

module.exports={
  register,
  getStudentProfile,
  updateStudentProfile
};