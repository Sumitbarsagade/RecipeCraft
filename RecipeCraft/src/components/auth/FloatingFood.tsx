import { motion } from "framer-motion";

interface FloatingFoodProps {
  emoji: string;
  className?: string;
  delay?: number;
  duration?: number;
  size?: string;
}

export default function FloatingFood({
  emoji,
  className = "",
  delay = 0,
  duration = 5,
  size = "text-4xl",
}: FloatingFoodProps) {
  return (
    <motion.div
      className={`absolute select-none ${size} ${className}`}
      animate={{
        y: [0, -18, 0],
        rotate: [-10, 10, -10],
        scale: [1, 1.08, 1],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}