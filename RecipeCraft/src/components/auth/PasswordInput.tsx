import { type InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function PasswordInput({
  label,
  error,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`
            w-full rounded-xl border bg-gray-50 px-4 py-3 pr-12
            outline-none transition-all duration-300
            focus:border-[#C8501A]
            focus:bg-white
            focus:ring-4
            focus:ring-orange-100
            ${error ? "border-red-500" : "border-gray-200"}
          `}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C8501A]"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </motion.div>
  );
}