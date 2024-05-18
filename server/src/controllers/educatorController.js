const Educator = require('./../models/educatorModel');
const User = require('./../models/userModel');
const md5 =require("md5");
const mongoose=require('mongoose');

const register = async (req, res) => {
  try {
    
    const {fullName, email,phone, collage,residence,bank, bankAcc, password, gender } = req.body;

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
      role: "educator",
      department: collage  
    });

    await user.save();

    
    const educator = new Educator({
      fullName: fullName,
      email: email,
      phone:phone,
      collage: collage,
      residence: residence,
      bank: bank,
      bankAcc: bankAcc,
      password: md5(password),
      gender: gender,
      user: user._id 
    });
    
    await educator.save();

    res.status(201).json({ message: 'Educator registered successfully' });
  } catch (error) {
    
    console.error('Error registering Educator:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


const getEducatoProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const educator = await Educator.findOne({ user: id });
    if (educator) {
      res.json(educator);
    } else {
      res.status(404).json({ message: 'Educator not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching educator data', error: error.message });
  }
};

const updateEducatorProfile = async (req, res) => {
  const { id } = req.params; // Assuming `id` is the user ID
  const updatedEducator = req.body;

  try {
    // Find the educator record based on the user ID
    const educatorRecord = await Educator.findOne({ user: id });

    if (educatorRecord) {
      // Update educator fields
      educatorRecord.fullName = updatedEducator.fullName;
      educatorRecord.collage = updatedEducator.collage;
      educatorRecord.phone = updatedEducator.phone;
      educatorRecord.gender = updatedEducator.gender;
      educatorRecord.email = updatedEducator.email;
      educatorRecord.bank = updatedEducator.bank;
      educatorRecord.bankAcc = updatedEducator.bankAcc;
      educatorRecord.password = md5(updatedEducator.password);

      // Save the updated educator record
      const updatedEducatorRecord = await educatorRecord.save();

      // Find the user record by ID and update
      const user = await User.findById(id);

      if (user) {
        const fullName = updatedEducator.fullName;
        const nameParts = fullName.split(" ");
        const fname = nameParts[0];

        // Update user fields
        user.fname = fname;
        user.department = updatedEducator.department;
        user.email = updatedEducator.email;
        user.password = md5(updatedEducator.password);

        // Save the updated user record
        await user.save();
      }

      res.json(updatedEducatorRecord);
    } else {
      res.status(404).json({ message: 'Educator not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating educator data', error: error.message });
  }
};

module.exports = { updateEducatorProfile };


module.exports={
  register,
  getEducatoProfile,
  updateEducatorProfile
};