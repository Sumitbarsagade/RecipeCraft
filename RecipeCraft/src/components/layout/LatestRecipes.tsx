import RecipeCard from "../common/RecipeCard";
import SectionHeader from "../common/SectionHeader";
import { motion } from "framer-motion";
import { recipes } from "../../utils/recipes";



export default function LatestRecipes() {
  return (
    <section className="bg-[#FFFDF9] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          title="Latest Recipes"
          subtitle="Fresh recipes added every day."
          buttonText="View All"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            <RecipeCard {...recipe} />
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}