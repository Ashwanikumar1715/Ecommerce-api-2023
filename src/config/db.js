const mongoose = require("mongoose");

const mongoUrl = "mongodb+srv://ashwani:kumar@cluster0.rld6x4n.mongodb.net/?retryWrites=true&w=majority";

const connectDb = () => {
    return mongoose.connect(mongoUrl)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
}

module.exports = { connectDb };
