import { motion } from "framer-motion";

import type {
  ChefTip,
  Equipment,
  NutritionItem,
  Substitution,
} from "../../utils/recipeDetails";

import ChefTips from "./ChefTips";
import Substitutions from "./Substitutions";
import EquipmentList from "./EquipmentList";
import NutritionCard from "./NutritionCard";

interface RecipeInfoGridProps {
  tips: ChefTip[];
  substitutions: Substitution[];
  equipment: Equipment[];
  nutrition: NutritionItem[];
}

export default function RecipeInfoGrid({
  tips,
  substitutions,
  equipment,
  nutrition,
}: RecipeInfoGridProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className="
        mt-20
        space-y-8
        sm:mt-24
      "
    >
      {/* Chef Tips */}

      <ChefTips tips={tips} />

      {/* Substitution + Equipment */}

      <div
        className="
          grid
          gap-8
          lg:grid-cols-2
        "
      >
        <Substitutions
          substitutions={substitutions}
        />

        <EquipmentList
          equipment={equipment}
        />
      </div>

      {/* Nutrition */}

      <NutritionCard
        nutrition={nutrition}
      />
    </motion.section>
  );
}