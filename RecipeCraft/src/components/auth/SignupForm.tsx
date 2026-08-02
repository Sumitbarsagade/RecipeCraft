import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";
import AuthDivider from "./AuthDivider";

export default function SignupForm() {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      <AuthInput
        label="Full Name"
        type="text"
        placeholder="John Doe"
      />

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
      />

      <PasswordInput
        label="Password"
        placeholder="Create password"
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm password"
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