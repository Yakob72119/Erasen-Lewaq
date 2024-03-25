const Student = require('./../models/studentModel');


const register = async (req, res) => {
  try {
    const {fullName, email, department, collage, password, gender } = req.body;

    // Create a new user instance
    const student = new Student({
      fullName:fullName,
      email:email,
      department: department,
      collage: collage,
      password: password,
      gender: gender
    });

    // Save the student to the database
    await student.save();

    // Send success response
    res.status(201).json({ message: 'student registered successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports={
  register
};