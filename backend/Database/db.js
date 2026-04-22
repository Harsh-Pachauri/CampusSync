require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

mongoose.set("bufferCommands", false);

const connectToMongo = async () => {
  if (!mongoURI) {
    throw new Error("MONGODB_URI is missing in environment variables");
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    throw error;
  }
};

module.exports = connectToMongo;
