import type { InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AuthInput({
  label,
  error,
  ...props
}: AuthInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full rounded-xl border bg-gray-50 px-4 py-3
          outline-none transition-all duration-300
          focus:border-[#C8501A]
          focus:bg-white
          focus:ring-4
          focus:ring-orange-100
          ${error ? "border-red-500" : "border-gray-200"}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </motion.div>
  );
}