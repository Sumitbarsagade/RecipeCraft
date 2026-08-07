import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  Heart,
  Share2,
  Printer,
} from "lucide-react";

interface RecipeActionsProps {
  recipeTitle: string;
}

export default function RecipeActions({
  recipeTitle,
}: RecipeActionsProps) {
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: recipeTitle,
          text: `Check out this recipe: ${recipeTitle}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("Recipe link copied!");
      }
    } catch {
      // User cancelled the share dialog.
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Save */}

      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setSaved((previous) => !previous)}
        className={`
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          px-5
          py-2.5
          text-sm
          font-semibold
          transition-all
          duration-200
          ${
            saved
              ? "border-[#C8501A] bg-[#FFF2E9] text-[#C8501A]"
              : "border-gray-200 bg-white text-[#2D4A3E] hover:border-[#C8501A] hover:text-[#C8501A]"
          }
        `}
      >
        <Heart
          size={17}
          className={
            saved
              ? "fill-[#C8501A]"
              : ""
          }
        />

        {saved ? "Saved" : "Save"}
      </motion.button>

      {/* Share */}

      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleShare}
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-gray-200
          bg-white
          px-5
          py-2.5
          text-sm
          font-semibold
          text-[#2D4A3E]
          transition-all
          duration-200
          hover:border-[#C8501A]
          hover:text-[#C8501A]
        "
      >
        <Share2 size={17} />

        Share
      </motion.button>

      {/* Print */}

      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={handlePrint}
        className="
          hidden
          items-center
          gap-2
          rounded-full
          border
          border-gray-200
          bg-white
          px-5
          py-2.5
          text-sm
          font-semibold
          text-[#2D4A3E]
          transition-all
          duration-200
          hover:border-[#C8501A]
          hover:text-[#C8501A]
          sm:inline-flex
        "
      >
        <Printer size={17} />

        Print
      </motion.button>
    </div>
  );
}