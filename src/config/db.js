const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL

const connectDb = () => {
    return mongoose.connect(MONGO_URL)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
}

module.exports = { connectDb };
