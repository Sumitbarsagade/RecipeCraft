import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface RecipeIntroProps {
  title: string;
  description: string;
}

export default function RecipeIntro({
  title,
  description,
}: RecipeIntroProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        mx-auto
        max-w-3xl
        text-center
      "
    >
      <div className="mb-4 flex justify-center">
        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#FFF2E9]
            px-4
            py-2
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-[#C8501A]
          "
        >
          <Sparkles size={14} />

          Recipe Story
        </span>
      </div>

      <h2
        className="
          font-serif
          text-3xl
          font-bold
          text-[#1F2D27]
          sm:text-4xl
        "
      >
        Why you'll love this {title}
      </h2>

      <p
        className="
          mt-5
          text-base
          leading-8
          text-gray-600
          sm:text-lg
        "
      >
        {description}
      </p>
    </motion.section>
  );
}