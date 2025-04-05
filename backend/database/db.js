const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const MONGO_URL=process.env.DB_URL;
const DbConnection=async()=>{
  try {
    await mongoose.connect( MONGO_URL);
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports=DbConnection;