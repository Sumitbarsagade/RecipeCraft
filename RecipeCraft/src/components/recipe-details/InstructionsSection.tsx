import { useMemo, useState } from "react";
import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";

import type {
  InstructionStep as InstructionStepType,
} from "../../utils/recipeDetails";

import InstructionStep from "./InstructionStep";

interface InstructionsSectionProps {
  instructions: InstructionStepType[];
}

export default function InstructionsSection({
  instructions,
}: InstructionsSectionProps) {
  const [completedSteps, setCompletedSteps] =
    useState<Set<number>>(new Set());

  const completedCount =
    completedSteps.size;

  const progress = useMemo(() => {
    if (instructions.length === 0) {
      return 0;
    }

    return Math.round(
      (completedCount /
        instructions.length) *
        100
    );
  }, [
    completedCount,
    instructions.length,
  ]);

  const toggleStep = (id: number) => {
    setCompletedSteps((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      {/* Heading */}

      <div className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#C8501A]">
              Let's cook
            </span>

            <h2 className="mt-2 font-serif text-3xl font-bold text-[#1F2D27] sm:text-4xl">
              Instructions
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Follow each step and check it off as
              you cook.
            </p>
          </div>

          {/* Progress */}

          <div className="min-w-[150px]">
            <div className="mb-2 flex justify-between text-xs font-semibold">
              <span className="text-gray-400">
                Progress
              </span>

              <span className="text-[#C8501A]">
                {progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#E8E2DB]">
              <motion.div
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="h-full rounded-full bg-[#C8501A]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cooking card */}

      <div
        className="
          rounded-[28px]
          border
          border-[#E7E0D8]
          bg-white
          p-6
          sm:p-8
          lg:p-10
        "
      >
        {/* Intro */}

        <div className="mb-8 flex items-center gap-3 rounded-2xl bg-[#FAF8F4] p-4">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#FFF0E7]
              text-[#C8501A]
            "
          >
            <ChefHat size={20} />
          </div>

          <p className="text-sm leading-6 text-gray-600">
            Take your time, follow the steps in order,
            and enjoy the process.
          </p>
        </div>

        {/* Steps */}

        <div className="space-y-8">
          {instructions.map(
            (instruction, index) => (
              <InstructionStep
                key={instruction.id}
                number={index + 1}
                title={instruction.title}
                description={
                  instruction.description
                }
                duration={
                  instruction.duration
                }
                completed={completedSteps.has(
                  instruction.id
                )}
                onComplete={() =>
                  toggleStep(
                    instruction.id
                  )
                }
              />
            )
          )}
        </div>

        {/* Completion */}

        {completedCount ===
          instructions.length &&
          instructions.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                mt-8
                rounded-2xl
                bg-[#EEF6F1]
                p-5
                text-center
              "
            >
              <p className="font-serif text-xl font-bold text-[#2D4A3E]">
                🎉 You've finished cooking!
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Enjoy your delicious {` `}
                meal.
              </p>
            </motion.div>
          )}
      </div>
    </motion.section>
  );
}