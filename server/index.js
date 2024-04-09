const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./src/routes/studentRoutes.js"); 
const educatorRoutes = require("./src/routes/educatorRoutes.js");
const cvRoutes= require("./src/routes/cvRoutes.js");
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
 app.use("/educator", educatorRoutes);
 app.use("/cv", cvRoutes);
const PORT = 3000;
        app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
});