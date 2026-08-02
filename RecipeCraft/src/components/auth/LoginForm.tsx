import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";
import AuthDivider from "./AuthDivider";

export default function LoginForm() {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="Enter your email"
      />

      <PasswordInput
        label="Password"
        placeholder="Enter password"
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="accent-[#C8501A]"
          />

          Remember Me
        </label>

        <Link
          to="/forgot-password"
          className="font-medium text-[#C8501A]"
        >
          Forgot Password?
        </Link>
      </div>

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className="w-full rounded-xl bg-[#C8501A] py-3 font-semibold text-white shadow-lg transition hover:bg-[#a63f13]"
      >
        Sign In
      </motion.button>

      <AuthDivider />

      <GoogleButton />

      <p className="pt-3 text-center text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-[#C8501A]"
        >
          Create one
        </Link>
      </p>
    </motion.form>
  );
}