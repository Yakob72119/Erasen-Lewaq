const Educator = require('./../models/educatorModel');
const User = require('./../models/userModel');
const md5 =require("md5");

const register = async (req, res) => {
  try {
    
    const {fullName, email, collage,residence,bank, bankAcc, password, gender } = req.body;

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
      role: "educator" 
    });

    await user.save();

    
    const educator = new Educator({
      fullName: fullName,
      email: email,
      collage: collage,
      residence: residence,
      bank: bank,
      bankAcc: bankAcc,
      password: md5(password),
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