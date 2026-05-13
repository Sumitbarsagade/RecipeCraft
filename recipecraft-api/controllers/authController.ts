

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Generate JWT Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
const sendMail = require('../utils/sendMail');

 const registerUser = (async (req: { body: { username: string;  email: String; password: any; }; }, res: { status: (arg0: number, ) => { (): any; new(): any; json: { (arg0: { success?:boolean; message: string; accessToken?: any;  }): void; new(): any; }; }; } ) => {
  try{
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = generateToken(user._id.toString());

   const refreshToken = generateToken(user._id.toString());
  user.refreshToken = refreshToken;

  await user.save();

 

  return res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    accessToken,
  });


} catch(error){
   res.status(500).json({message:'Sever error'});
}
});

const loginUser = async (req: { body: {  email: String; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; token?: any; }): void; new(): any; }; }; })=>{
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

const logoutUser = async (req: { body: { username: any; email: any; password: any; }; }, res: {
  clearCookie(arg0: string, arg1: { httpOnly: boolean; secure: boolean; sameSite: string; }): unknown; status: (arg0: number) => { (): any; new(): any; json: { (arg0: {success: boolean; message: string;   token?: any; }): void; new(): any; }; }; 
})=>{
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
      message: "Logout failed"
    });
}
};

const forgetPassword = async (req: { body: { email: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: {success: boolean; message: string; token?: any; }): void; new(): any; }; }; })=>{
  try{
   const userEmail = req.body.email;
   const user = User.findOne({email: userEmail});
   if (user!) return res.status(401).json({ success: false, message: "invalid Email" });

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
        message: "Server Error"
      }
    )
  }
};

const resetPassword = async (req: { body: { email: string; newpassword: string;   resetOtp: string   }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean, message: string; token?: any; }): void; new(): any; }; }; }) => {
  const { email, newpassword, resetOtp } = req.body;

  try {

    // Missing await
    const user = await User.findOne({ email: email });

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

module.exports = {registerUser,loginUser, resetPassword, forgetPassword, logoutUser};
