import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function JumpToRecipe() {
  const scrollToRecipe = () => {
    const element =
      document.getElementById("recipe-cooking-section");

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToRecipe}
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        group
        inline-flex
        items-center
        gap-3
        rounded-full
        bg-[#C8501A]
        px-6
        py-3.5
        text-sm
        font-bold
        text-white
        shadow-[0_10px_30px_rgba(200,80,26,0.2)]
        transition-shadow
        hover:shadow-[0_14px_35px_rgba(200,80,26,0.3)]
      "
    >
      Jump to Recipe

      <motion.span
        animate={{
          y: [0, 3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <ArrowDown size={17} />
      </motion.span>
    </motion.button>
  );
}