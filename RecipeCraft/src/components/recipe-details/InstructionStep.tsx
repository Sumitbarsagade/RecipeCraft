import { Check, Clock3 } from "lucide-react";
import { motion } from "framer-motion";

interface InstructionStepProps {
  number: number;
  title: string;
  description: string;
  duration?: string;
  completed: boolean;
  onComplete: () => void;
}

export default function InstructionStep({
  number,
  title,
  description,
  duration,
  completed,
  onComplete,
}: InstructionStepProps) {
  return (
    <motion.article
      layout
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.45,
      }}
      className="
        relative
        border-b
        border-[#EAE4DD]
        pb-8
        pt-2
        last:border-b-0
        last:pb-2
      "
    >
      <div className="flex gap-4 sm:gap-6">
        {/* Step number */}

        <button
          type="button"
          onClick={onComplete}
          aria-label={`Mark step ${number} complete`}
          className="relative z-10 shrink-0"
        >
          <motion.span
            animate={{
              backgroundColor: completed
                ? "#C8501A"
                : "#FFF2E9",
              color: completed
                ? "#FFFFFF"
                : "#C8501A",
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              text-sm
              font-bold
              sm:h-12
              sm:w-12
            "
          >
            {completed ? (
              <Check
                size={20}
                strokeWidth={3}
              />
            ) : (
              String(number).padStart(2, "0")
            )}
          </motion.span>
        </button>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3
              className={`
                font-serif
                text-xl
                font-bold
                transition-all
                sm:text-2xl
                ${
                  completed
                    ? "text-gray-400 line-through"
                    : "text-[#1F2D27]"
                }
              `}
            >
              {title}
            </h3>

            {duration && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F1EC] px-3 py-1.5 text-xs font-medium text-gray-500">
                <Clock3 size={13} />

                {duration}
              </span>
            )}
          </div>

          <p
            className={`
              mt-3
              max-w-2xl
              text-base
              leading-7
              transition-all
              ${
                completed
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            {description}
          </p>

          <button
            type="button"
            onClick={onComplete}
            className="
              mt-4
              text-xs
              font-bold
              text-[#C8501A]
              hover:underline
            "
          >
            {completed
              ? "Mark as incomplete"
              : "Mark step complete"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}