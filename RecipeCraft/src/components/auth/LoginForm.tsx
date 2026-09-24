import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
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
} from "../../features/auth/authSlice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    dispatch(clearAuthError());

    try {
      const result = await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();
    
      toast.success(
      result.message || "Login successful!"
    );


      if (result.success) {
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(
      typeof error === "string"
        ? error
        : "Unable to sign in. Please try again."
    );
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <PasswordInput
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

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
        type="submit"
        whileHover={{
          scale: isLoading ? 1 : 1.02,
        }}
        whileTap={{
          scale: isLoading ? 1 : 0.98,
        }}
        disabled={isLoading}
        className="w-full rounded-xl bg-[#C8501A] py-3 font-semibold text-white shadow-lg transition hover:bg-[#a63f13] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading
          ? "Signing In..."
          : "Sign In"}
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