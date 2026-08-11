import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStatCardProps {
  label: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
}

export default function DashboardStatCard({
  label,
  value,
  change,
  description,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-2xl
        border border-[#E8E1D8]
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(31,45,39,0.04)]
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8EDE5] text-[#C8501A]">
          <Icon size={20} strokeWidth={1.9} />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-[#EAF6EF] px-2.5 py-1 text-xs font-semibold text-[#318153]">
          <ArrowUpRight size={13} />
          {change}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7A837E]">
          {label}
        </p>

        <p className="mt-1 font-serif text-3xl font-bold text-[#1F2D27]">
          {value}
        </p>

        <p className="mt-1 text-xs text-[#8B918D]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}