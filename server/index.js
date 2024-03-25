const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./src/routes/studentRoutes.js"); 
const bodyParser = require("body-parser");
const cors= require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/erasen_lewaq_db')
    .then(() => {
        console.log('Connected to MongoDB');

    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

 app.use("/student", studentRoutes);

const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
});