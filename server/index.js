const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes"); 

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/erasen_lewaq_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

     app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
});