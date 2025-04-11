const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const uri =
    process.env.MONGO_ENV === 'cloud'
      ? process.env.MONGODB_ATLAS_URI
      : process.env.LOCAL_MONGODB_URI;

  try {
    await mongoose.connect(uri);
    console.log(`✅ Connected to MongoDB (${process.env.MONGO_ENV})`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
