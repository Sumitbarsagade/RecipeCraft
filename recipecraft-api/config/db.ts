const mongoose = require('mongoose');
require('dotenv').config;

const connectDB= async()=>{
    try{
      const request = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${request.connection.host}`)
    }
    catch (error:any){
      console.error(`Error: ${error.message}`);
      process.exit(1)
    }
};

module.exports = connectDB;
