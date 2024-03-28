const Cv = require('./../models/cvModel');

const register = async (req, res) => {
  try {

    const {fullName, education_status, experience, department, link} = req.body;

    await user.save();

    
    const educator = new Educator({
      fullName: fullName,
      email: email,
      collage: collage,
      residence: residence,
      bankAcc: bankAcc,
      password: password,
      gender: gender
    });
    
    await educator.save();

    res.status(201).json({ message: 'Educator registered successfully' });
  } catch (error) {
    
    console.error('Error registering Educator:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports={
  register
};