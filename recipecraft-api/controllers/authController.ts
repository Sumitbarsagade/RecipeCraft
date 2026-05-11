const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res)=>{
   //get username, email, password from request body
   const {username, email, password} = req.body;

   const lowercaseUsername:string = username.toLowerCase();

   //use try catch block to register new User
   try{
     //Verify used email already exists in database
     const existingEmail = await User.findOne({email});
     if (existingEmail) return res.status(400).json({message: 'Email already exists'});
     // encrypt the password
     const hashedPassword = await bcrypt.hash(password, 10);
     // create an new User Object and store in newUser variable
     const newUser = new User({username: lowercaseUsername, email: email, password: hashedPassword});
     // Save the users details in database
     await newUser.save();
     
     //generate token
     const token = generateToken(newUser._id);
     res.status(201).json({token:token, message: 'User registed successfully'});

   }
   catch(error){
      res.status(500).json({message: 'Server error'})
   }
};


const loginUser = async (req, res)=>{
   const {email, password} = req.body;
   try{
     const user = await User.findOne({email});
     if(!user) return res.status(400).json({message: 'Invalid email or password'});

     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) return res.status(400).json({message: 'Invalid email or password'});

     const token = generateToken(user._id);
     res.status(200).json({token: token, message: 'login Successfully'});
   }
   catch(error){
     res.status(500).json({message:'Sever error'});
   }
};

exports.logoutUser = async (req: any, res:any)=>{
    try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
};


exports.refreshToken = async (req, res)=>{

};


exports.forgetPassword = async (req, res)=>{

};


exports.resetPassword = async (req, res)=>{

};


module.exports = {registerUser,loginUser};
