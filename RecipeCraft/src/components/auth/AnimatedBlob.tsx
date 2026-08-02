import { motion } from "framer-motion";

interface AnimatedBlobProps {
  className?: string;
  color?: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedBlob({
  className = "",
  color = "bg-orange-300/30",
  duration = 15,
  delay = 0,
}: AnimatedBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${color} ${className}`}
      animate={{
        scale: [1, 1.25, 1],
        x: [0, 25, -20, 0],
        y: [0, -20, 20, 0],
        rotate: [0, 180, 360],
        borderRadius: [
          "45% 55% 60% 40%",
          "60% 40% 45% 55%",
          "50% 50% 55% 45%",
          "45% 55% 60% 40%",
        ],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}