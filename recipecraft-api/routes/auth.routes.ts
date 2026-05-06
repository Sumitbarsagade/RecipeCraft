
/*

Auth Routes — /api/auth
POST
/api/auth/register
Register new user, send verification email
Public

POST
/api/auth/login
Login with email/password, return JWT tokens
Public
POST
/api/auth/logout
Logout user, clear refresh token cookie
Private
POST
/api/auth/refresh-token
Get new access token using refresh token
Public
GET
/api/auth/verify-email/:token
Verify email address from link
Public
POST
/api/auth/forgot-password
Send password reset email
Public
POST
/api/auth/reset-password/:token
Reset password using token from email
Public
GET
/api/auth/google
Initiate Google OAuth 2.0 flow
Public


*/


const express  = require('express');

const router = express.Router();


const {registerUser,loginUser, logoutUser, refreshToken, forgotPassword,resetPassword} = require('../controllers/authController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser );

router.post('/refresh-token', refreshToken);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

module.exports = router;

