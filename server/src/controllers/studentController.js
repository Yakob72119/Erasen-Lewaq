const Student = require('../models/studetnModel');


exports.register = async (req, res) => {
  try {
    const { role, fullName, email, department, collage, password, gender } = req.body;

    // Create a new user instance
    const student = new Student({
      role,
      fullName,
      email,
      department,
      collage,
      password,
      gender
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
