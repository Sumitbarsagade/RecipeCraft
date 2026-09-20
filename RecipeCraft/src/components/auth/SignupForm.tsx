import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";
import AuthDivider from "./AuthDivider";



import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";

import {
  login,
  clearAuthError,
  signup,
} from "../../features/auth/authSlice";

export default function SignupForm() {

  const dispatch= useAppDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.auth
  );

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword]= useState("");
const [confirmPassword, setConfirmPassword]= useState("");

const handleSubmit= async (e: React.InputEvent<HTMLFormElement>)=>{
  e.preventDefault();
 
  dispatch(clearAuthError());

  try{
    if(confirmPassword!==password){
      return;
    }

    const result = await dispatch(signup({username, email, password, confirmPassword})).unwrap();

    if (result.success) {
        navigate("/dashboard", {
          replace: true,
        });
      }

  }
  catch (error){
    console.error("Login failed:", error);
  }

}

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      <AuthInput
        label="User Name"
        type="text"
        placeholder="John Doe"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
      />

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
      />

      <PasswordInput
        label="Password"
        placeholder="Create password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e)=> setConfirmPassword(e.target.value)}
      />

      <label className="flex items-start gap-3 text-sm text-gray-600">
        <input
          type="checkbox"
          className="mt-1 accent-[#C8501A]"
        />

        <span>
          I agree to the{" "}
          <Link
            to="/terms"
            className="font-medium text-[#C8501A]"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="font-medium text-[#C8501A]"
          >
            Privacy Policy
          </Link>
        </span>
      </label>

      <motion.button
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className="w-full rounded-xl bg-[#C8501A] py-3 font-semibold text-white shadow-lg transition hover:bg-[#a63f13]"
      >
        Create Free Account
      </motion.button>

      <AuthDivider />

      <GoogleButton />

      <p className="text-center text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#C8501A]"
        >
          Sign In
        </Link>
      </p>
    </motion.form>
  );
}