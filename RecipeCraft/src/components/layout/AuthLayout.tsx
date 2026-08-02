import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChefHat, Sparkles } from "lucide-react";


interface AuthLayoutProps {
  title: string;
  subtitle: string;
  image: string;
  children: ReactNode;
}

const floatingFoods = [
  { emoji: "🍕", top: "10%", left: "15%", delay: 0 },
  { emoji: "🍔", top: "70%", left: "10%", delay: 1 },
  { emoji: "🥗", top: "20%", right: "10%", delay: 2 },
  { emoji: "🍓", top: "80%", right: "15%", delay: 3 },
  { emoji: "🥞", top: "55%", left: "35%", delay: 1.5 },
  { emoji: "🌿", top: "35%", right: "30%", delay: 2.5 },
];

const features = [
  "Discover thousands of recipes",
  "Save your favourite meals",
  "Share recipes with the community",
];

export default function AuthLayout({
  title,
  subtitle,
  image,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[36px] bg-white shadow-2xl lg:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-white lg:flex">
            {/* Animated Blobs */}

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 18,
                ease: "linear",
              }}
              className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
            />

            <motion.div
              animate={{
                scale: [1.1, 1, 1.15],
                x: [-20, 20, -20],
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
              }}
              className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-300/30 blur-3xl"
            />

            {/* Floating Food */}

            {floatingFoods.map((item, index) => (
              <motion.div
                key={index}
                className="absolute text-4xl"
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                }}
                animate={{
                  y: [0, -25, 0],
                  rotate: [-8, 8, -8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: item.delay,
                }}
              >
                {item.emoji}
              </motion.div>
            ))}

            <div className="relative z-10 flex h-full flex-col justify-center p-12">
              {/* Badge */}

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-5 py-2 shadow-md backdrop-blur"
              >
                <ChefHat className="text-orange-600" size={18} />
                <span className="text-sm font-semibold text-orange-700">
                  Welcome to RecipeCraft
                </span>
              </motion.div>

              {/* Image */}

              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                src={image}
                alt="Recipe"
                className="h-[320px] w-full rounded-3xl object-cover shadow-2xl"
              />

              {/* Text */}

              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10 font-serif text-5xl font-bold leading-tight"
              >
                Start Your
                <span className="text-[#C8501A]"> Cooking </span>
                Journey
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-5 text-lg leading-8 text-gray-600"
              >
                Join thousands of food lovers discovering delicious recipes,
                meal plans and cooking inspiration every day.
              </motion.p>

              {/* Features */}

              <div className="mt-10 space-y-5">
                {features.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.15 }}
                    className="flex items-center gap-4"
                  >
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle2
                        className="text-green-600"
                        size={20}
                      />
                    </div>

                    <span className="text-lg text-gray-700">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Card */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="mt-10 flex items-center gap-3 rounded-2xl bg-white p-5 shadow-lg"
              >
                <Sparkles className="text-orange-600" />

                <div>
                  <h4 className="font-semibold">
                    AI Recipe Suggestions
                  </h4>

                  <p className="text-sm text-gray-500">
                    Personalized recommendations just for you.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT PANEL */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center bg-white p-6 md:p-10"
          >
            <div className="w-full max-w-md">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-serif text-4xl font-bold text-gray-900"
              >
                {title}
              </motion.h2>

              <p className="mt-4 text-gray-500">
                {subtitle}
              </p>

              <div className="mt-10">{children}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}