import {
  BookOpen,
  Bookmark,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

interface ProfileStatsProps {
  recipesPublished: number;
  savedRecipes: number;
  followers: number;
}

export default function ProfileStats({
  recipesPublished,
  savedRecipes,
  followers,
}: ProfileStatsProps) {
  const stats = [
    {
      label: "Recipes Published",
      value: recipesPublished,
      icon: BookOpen,
    },
    {
      label: "Saved Recipes",
      value: savedRecipes,
      icon: Bookmark,
    },
    {
      label: "Followers",
      value: followers,
      icon: Users,
    },
  ];

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCE8DD] text-[#C8501A]">
                <Icon size={19} />
              </div>

              <span className="font-serif text-2xl font-bold text-[#1F2D27]">
                {stat.value}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-[#737D77]">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}