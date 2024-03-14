const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/erasen_lewaq_db");

app.use("/articles", articleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
