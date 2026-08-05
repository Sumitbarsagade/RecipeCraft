import { motion } from "framer-motion";
import RecipeSearch from "./RecipeSearch";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function RecipeHero({
  search,
  setSearch,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5EF] via-white to-white py-24">

      {/* Blob */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-orange-100 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-green-100 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <p className="font-semibold uppercase tracking-[5px] text-[#C8501A]">
              Discover Recipes
            </p>

            <h1 className="mt-5 font-serif text-6xl font-bold leading-tight">
              Find Your Next
              <span className="text-[#C8501A]">
                {" "}
                Favorite Meal
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-xl leading-9 text-gray-500">
              Explore more than 25,000 delicious recipes from
              professional chefs and home cooks around the world.
            </p>

            <div className="mt-12 flex gap-12">

              <div>
                <h2 className="text-4xl font-bold text-[#2D4A3E]">
                  25K+
                </h2>

                <p className="text-gray-500">
                  Recipes
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-[#2D4A3E]">
                  300+
                </h2>

                <p className="text-gray-500">
                  Chefs
                </p>
              </div>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
          >
            <img
              src="/recipes/hero-food.png"
              className="w-full"
              alt=""
            />
          </motion.div>

        </div>

        <div className="mt-20">
          <RecipeSearch
            value={search}
            onChange={setSearch}
          />
        </div>

      </div>
    </section>
  );
}