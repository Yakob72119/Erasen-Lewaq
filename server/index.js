const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/erasen_lewaq_db')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));


const studentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    department: String,
    collage: String,
    password: String,
    gender: String
});
const Student = mongoose.model('Student', studentSchema);


const register = async (req, res) => {
    try {
        const { fullName, email, department, collage, password, gender } = req.body;
        const student = new Student({
            fullName: fullName,
            email: email,
            department: department,
            collage: collage,
            password: password,
            gender: gender
        });
        await student.save();
        res.status(201).json({ message: 'student registered successfully' });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

app.post('/student/register', register);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
