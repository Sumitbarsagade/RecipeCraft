import { motion } from "framer-motion";
import RecipeCard from "../common/RecipeCard";


interface Recipe {
  id: number;
  title: string;
  image: string;
  chef: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  time: string;
  saves: number;
}


interface Props {
  recipes: Recipe[];
}

export default function RecipeGrid({
  recipes,
}: Props) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="pb-20"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-3">

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
    </motion.section>
  );
}