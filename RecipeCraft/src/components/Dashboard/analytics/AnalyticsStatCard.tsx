import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsStatCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ReactNode;
  positive?: boolean;
  index?: number;
}

export default function AnalyticsStatCard({
  title,
  value,
  change,
  description,
  icon,
  positive = true,
  index = 0,
}: AnalyticsStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCE8DD] text-[#C8501A]">
          {icon}
        </div>

        <div
          className={`flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold ${
            positive
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}

          {change}
        </div>
      </div>

      <p className="mt-5 text-sm font-medium text-[#737D77]">
        {title}
      </p>

      <p className="mt-1 font-serif text-3xl font-bold text-[#1F2D27]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#969E99]">
        {description}
      </p>
    </motion.div>
  );
}