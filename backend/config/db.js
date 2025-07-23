const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if we should use local storage or MongoDB
  if (process.env.USE_LOCAL_DB === 'true') {
    console.log('Using Local JSON Database');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.log('Falling back to Local JSON Database');
    process.env.USE_LOCAL_DB = 'true';
  }
};

module.exports = connectDB;