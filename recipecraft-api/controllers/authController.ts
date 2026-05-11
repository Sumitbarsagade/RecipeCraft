

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
const sendMail = require('../utils/sendMail');

const registerUser = async (req: { body: { username: any; email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; token?: any; }): void; new(): any; }; }; })=>{
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


const loginUser = async (req: { body: { username: any; email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; token?: any; }): void; new(): any; }; }; })=>{
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

const logoutUser = async (req: { body: { username: any; email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; token?: any; }): void; new(): any; }; }; })=>{
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
}
};

const refreshToken = async (req: { body: { username: any; email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; token?: any; }): void; new(): any; }; }; })=>{
     try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing"
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      success: true,
      accessToken
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const forgetPassword = async (req: { body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; token?: any; }): void; new(): any; }; }; })=>{
  try{
   const userEmail = req.email;
   const user = User.findOne({userEmail});
   if (user!) return res.status(401).json({message: 'invalid Email '});

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  //Expiry: 10 minutes
  const otpExpire = Date.now() + 10 * 60 * 1000;

  User.resetOtp = otp;
  User.resetOtpExpire = otpExpire;

  await user.save();

  //Send Email
  await sendMail( user.email, "Password Rest OTP", `Your OTP for password reset is: ${otp}`);

  return res.status(200).json({success: true, message: "OTP sent to registered email"});
  }
  catch (error){
    return res.status(500).json(
      {
        success: false,
        message: error.message
      }
    )
  }
};


const resetPassword = async (req: { body: { email: string; newpassword: string, resetOtp: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean, message: string; token?: any; }): void; new(): any; }; }; }) => {
  const { email, newpassword, resetOtp } = req.body;

  try {

    // Missing await
    const user = await User.findOne({ email });

    // Check user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // OTP validation
    if (resetOtp !== user.resetOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // Expiry check
    if (user.resetOtpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired"
      });
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    // Save new password
    user.password = hashedPassword;

    // Clear OTP
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error resetting password"
    });

  }
};

module.exports = {registerUser,loginUser};
