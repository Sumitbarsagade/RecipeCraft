import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Heart,
  Plus,
  Star,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
DashboardStatCard
import DashboardRecipeRow, {
  type DashboardRecipe,
} from "../../components/dashboard/DashboardRecipeRow";

const recentRecipes: DashboardRecipe[] = [
  {
    id: "1",
    title: "Creamy Garlic Pasta",
    category: "Dinner",
    time: "25 min",
    difficulty: "Easy",
    rating: 4.8,
    saves: 248,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    title: "Butter Chicken",
    category: "Indian",
    time: "45 min",
    difficulty: "Medium",
    rating: 4.9,
    saves: 182,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "3",
    title: "Chocolate Fudge Cake",
    category: "Dessert",
    time: "50 min",
    difficulty: "Medium",
    rating: 4.7,
    saves: 156,
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "4",
    title: "Avocado Breakfast Toast",
    category: "Breakfast",
    time: "15 min",
    difficulty: "Easy",
    rating: 4.6,
    saves: 98,
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=500&q=80",
  },
];

const stats = [
  {
    label: "Total Recipes",
    value: "24",
    change: "12%",
    description: "recipes created",
    icon: BookOpen,
  },
  {
    label: "Total Views",
    value: "12.4K",
    change: "18%",
    description: "views this month",
    icon: BarChart3,
  },
  {
    label: "Total Saves",
    value: "1,842",
    change: "8%",
    description: "times your recipes saved",
    icon: Heart,
  },
  {
    label: "Average Rating",
    value: "4.8",
    change: "6%",
    description: "from 128 reviews",
    icon: Star,
  },
];

export default function DashboardHomePage() {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/dashboard/recipes/${id}/edit`);
  };

  const handlePreview = (id: string) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-[#C8501A]">
              Creator Studio
            </p>

            <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-[#1F2D27] sm:text-4xl">
              Good afternoon, Anya 👋
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#737C76]">
              Manage your recipes, see how your creations are
              performing, and keep your cooking profile up to date.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/recipes/new")}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#C8501A]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-[#C8501A]/15
              transition
              hover:-translate-y-0.5
              hover:bg-[#B74616]
            "
          >
            <Plus size={18} />
            Create Recipe
          </button>
        </motion.header>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <DashboardStatCard
              key={stat.label}
              {...stat}
            />
          ))}
        </section>

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Recent recipes */}
          <section className="overflow-hidden rounded-2xl border border-[#E8E1D8] bg-white shadow-[0_8px_30px_rgba(31,45,39,0.04)]">
            <div className="flex items-center justify-between border-b border-[#EEE9E2] px-5 py-5">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
                  Your Recipes
                </h2>

                <p className="mt-1 text-xs text-[#8A918C]">
                  Recently updated recipes
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/dashboard/recipes")}
                className="text-sm font-semibold text-[#C8501A] transition hover:text-[#A94012]"
              >
                View all
              </button>
            </div>

            <div>
              {recentRecipes.map((recipe) => (
                <DashboardRecipeRow
                  key={recipe.id}
                  recipe={recipe}
                  onEdit={handleEdit}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </section>

          {/* Quick actions */}
          <aside className="space-y-6">
            <section className="rounded-2xl bg-[#1F2D27] p-6 text-white shadow-[0_12px_35px_rgba(31,45,39,0.15)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C8501A]">
                <Plus size={21} />
              </div>

              <h2 className="mt-5 font-serif text-2xl font-bold">
                Share your next recipe
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Turn your favorite dish into a beautiful RecipeCraft
                recipe and share it with the community.
              </p>

              <button
                type="button"
                onClick={() => navigate("/dashboard/recipes/new")}
                className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#1F2D27] transition hover:bg-[#FFF8EF]"
              >
                Add New Recipe
              </button>
            </section>

            <section className="rounded-2xl border border-[#E8E1D8] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8EDE5] text-[#C8501A]">
                  <Users size={19} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#8A918C]">
                    Community
                  </p>

                  <p className="font-serif text-xl font-bold text-[#1F2D27]">
                    1,248 followers
                  </p>
                </div>
              </div>

              <div className="mt-5 h-px bg-[#EEE9E2]" />

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-[#737C76]">
                  Profile views
                </span>

                <span className="text-sm font-semibold text-[#318153]">
                  +14.2%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEE9E2]">
                <div className="h-full w-[72%] rounded-full bg-[#C8501A]" />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}