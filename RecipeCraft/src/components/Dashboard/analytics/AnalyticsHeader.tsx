import { BarChart3, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsHeaderProps {
  period: string;
  setPeriod: (period: string) => void;
}

const periods = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "This year",
];

export default function AnalyticsHeader({
  period,
  setPeriod,
}: AnalyticsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8501A] text-white">
          <BarChart3 size={24} />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#C8501A]">
            Creator Insights
          </p>

          <h1 className="font-serif text-3xl font-bold text-[#1F2D27]">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-[#737D77]">
            Understand how your recipes are performing.
          </p>
        </div>
      </div>

      <div className="relative">
        <CalendarDays
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7D8781]"
        />

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="appearance-none rounded-xl border border-[#E3DDD5] bg-white py-3 pl-10 pr-9 text-sm font-medium text-[#455049] outline-none transition focus:border-[#C8501A] focus:ring-2 focus:ring-[#C8501A]/10"
        >
          {periods.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}