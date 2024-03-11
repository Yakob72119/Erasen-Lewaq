const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect('mongodb://localhost:27017/erasen_lewaq_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  gender: String,
  university: String,
  results: [{
    result: String
  }],
  user: {
    username: String,
    password: String,
  }
});


const Student = mongoose.model('Student', studentSchema);


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});


const User = mongoose.model('User', userSchema);

app.use(express.json());


app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
