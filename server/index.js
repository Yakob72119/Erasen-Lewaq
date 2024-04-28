require('dotenv').config();

        // packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors= require("cors");
const session = require('express-session');

        // utilites
const studentRoutes = require("./src/routes/studentRoutes.js"); 
const educatorRoutes = require("./src/routes/educatorRoutes.js");
const cvRoutes= require("./src/routes/cvRoutes.js");
const userRoutes=require("./src/routes/userRoutes.js");
const examRoutes=require("./src/routes/examRoutes.js");


const app = express();
app.use(express.json());
app.use(cors());

/// setup our session

app.use(session({
    secret:"our little secrete.",
    resave: false,
    saveUninitialized:false
}));



mongoose.connect('mongodb://localhost:27017/erasen_lewaq_db')
    .then(() => {
        console.log('Connected to MongoDB');

    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

 app.use("/student", studentRoutes);
 app.use("/educator", educatorRoutes);
 app.use("/cv", cvRoutes);
 app.use("/user", userRoutes);
 app.use("/exam", examRoutes);
const PORT = 3000;
        app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
});