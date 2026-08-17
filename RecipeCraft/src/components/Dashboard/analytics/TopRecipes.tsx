import { ArrowUpRight, Eye, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

const recipes = [
  {
    id: 1,
    title: "Creamy Butter Chicken",
    category: "Indian",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    views: 8240,
    saves: 482,
    engagement: "9.8%",
  },
  {
    id: 2,
    title: "Classic Pasta Primavera",
    category: "Italian",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    views: 6820,
    saves: 391,
    engagement: "8.2%",
  },
  {
    id: 3,
    title: "Chocolate Fudge Cake",
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    views: 5430,
    saves: 284,
    engagement: "7.6%",
  },
];

export default function TopRecipes() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#E8E1D8] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#EEE8E0] p-5">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
            Top Performing Recipes
          </h2>

          <p className="mt-1 text-sm text-[#737D77]">
            Your recipes with the highest engagement.
          </p>
        </div>

        <button
          type="button"
          className="hidden items-center gap-1 text-sm font-semibold text-[#C8501A] sm:flex"
        >
          View all
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="divide-y divide-[#EEE8E0]">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center gap-4 p-4 transition hover:bg-[#FCFAF7]"
          >
            <span className="hidden w-5 text-center text-sm font-bold text-[#A1AAA4] sm:block">
              {index + 1}
            </span>

            <img
              src={`${recipe.image}?auto=format&fit=crop&w=160&q=80`}
              alt={recipe.title}
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-bold text-[#1F2D27]">
                {recipe.title}
              </h3>

              <p className="mt-1 text-xs text-[#8A938D]">
                {recipe.category}
              </p>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              <div>
                <p className="flex items-center gap-1 text-xs text-[#8A938D]">
                  <Eye size={13} />
                  Views
                </p>

                <p className="mt-1 text-sm font-bold text-[#354139]">
                  {recipe.views.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="flex items-center gap-1 text-xs text-[#8A938D]">
                  <Bookmark size={13} />
                  Saves
                </p>

                <p className="mt-1 text-sm font-bold text-[#354139]">
                  {recipe.saves}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8A938D]">
                  Engagement
                </p>

                <p className="mt-1 text-sm font-bold text-green-600">
                  {recipe.engagement}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}