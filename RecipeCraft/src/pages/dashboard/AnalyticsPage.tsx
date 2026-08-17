import { useState } from "react";
import {
  BookOpen,
  Bookmark,
  Eye,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import AnalyticsHeader from "../../components/dashboard/analytics/AnalyticsHeader";
import AnalyticsStatCard from "../../components/dashboard/analytics/AnalyticsStatCard";
import AnalyticsChart from "../../components/dashboard/analytics/AnalyticsChart";
import EngagementOverview from "../../components/dashboard/analytics/EngagementOverview";
import TopRecipes from "../../components/dashboard/analytics/TopRecipes";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("Last 30 days");

  const stats = [
    {
      title: "Total Views",
      value: "24,580",
      change: "18.4%",
      description: "Compared with previous period",
      icon: <Eye size={21} />,
    },
    {
      title: "Recipe Saves",
      value: "1,284",
      change: "12.2%",
      description: "People saved your recipes",
      icon: <Bookmark size={21} />,
    },
    {
      title: "Followers",
      value: "3,842",
      change: "8.7%",
      description: "New audience growth",
      icon: <Users size={21} />,
    },
    {
      title: "Published Recipes",
      value: "24",
      change: "4",
      description: "Recipes published this period",
      icon: <BookOpen size={21} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <AnalyticsHeader
          period={period}
          setPeriod={setPeriod}
        />

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <AnalyticsStatCard
              key={stat.title}
              {...stat}
              index={index}
            />
          ))}
        </div>

        {/* Main Analytics */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <AnalyticsChart />

          <EngagementOverview />
        </div>

        {/* Top Recipes */}
        <TopRecipes />

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 rounded-2xl border border-[#F0D5C5] bg-[#FFF6F0] p-5"
        >
          <p className="text-sm font-semibold text-[#C8501A]">
            RecipeCraft Insight
          </p>

          <h3 className="mt-1 font-serif text-lg font-bold text-[#26352D]">
            Your recipes are getting more attention this month.
          </h3>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6F7772]">
            Your recipe views increased by 18.4%. Consider publishing
            more recipes similar to your highest-performing content.
          </p>
        </motion.div>

      </div>
    </div>
  );
}