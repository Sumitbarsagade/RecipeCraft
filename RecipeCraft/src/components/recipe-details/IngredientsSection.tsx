import { useMemo, useState } from "react";
import { CheckCheck, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

import type {
  IngredientGroup,
} from "../../utils/recipeDetails";

import ServingAdjuster from "./ServingAdjuster";
import IngredientItem from "./IngredientItem";

interface IngredientsSectionProps {
  groups: IngredientGroup[];
  baseServings: number;
}

export default function IngredientsSection({
  groups,
  baseServings,
}: IngredientsSectionProps) {
  const [servings, setServings] =
    useState(baseServings);

  const [checkedIngredients, setCheckedIngredients] =
    useState<Set<number>>(new Set());

  const totalIngredients = useMemo(
    () =>
      groups.reduce(
        (total, group) =>
          total + group.ingredients.length,
        0
      ),
    [groups]
  );

  const checkedCount =
    checkedIngredients.size;

  const toggleIngredient = (id: number) => {
    setCheckedIngredients((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const markAllComplete = () => {
    if (
      checkedIngredients.size ===
      totalIngredients
    ) {
      setCheckedIngredients(new Set());

      return;
    }

    const allIds = groups.flatMap((group) =>
      group.ingredients.map(
        (ingredient) => ingredient.id
      )
    );

    setCheckedIngredients(new Set(allIds));
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: -20,
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
      className="
        lg:sticky
        lg:top-24
        lg:self-start
      "
    >
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-[#E7E0D8]
          bg-[#FAF8F4]
        "
      >
        {/* Header */}

        <div className="border-b border-[#E7E0D8] p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ClipboardList
                  size={20}
                  className="text-[#C8501A]"
                />

                <h2 className="font-serif text-2xl font-bold text-[#1F2D27]">
                  Ingredients
                </h2>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {checkedCount} of{" "}
                {totalIngredients} prepared
              </p>
            </div>

            <button
              type="button"
              onClick={markAllComplete}
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                px-3
                py-2
                text-xs
                font-semibold
                text-[#C8501A]
                transition
                hover:bg-[#FFF0E7]
              "
            >
              <CheckCheck size={15} />

              {checkedCount === totalIngredients
                ? "Clear"
                : "Check all"}
            </button>
          </div>

          {/* Progress */}

          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#E7E0D8]">
            <motion.div
              animate={{
                width:
                  totalIngredients === 0
                    ? "0%"
                    : `${
                        (checkedCount /
                          totalIngredients) *
                        100
                      }%`,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                h-full
                rounded-full
                bg-[#C8501A]
              "
            />
          </div>

          {/* Serving Adjuster */}

          <div className="mt-6">
            <ServingAdjuster
              servings={servings}
              onDecrease={() =>
                setServings((value) =>
                  Math.max(1, value - 1)
                )
              }
              onIncrease={() =>
                setServings((value) =>
                  Math.min(20, value + 1)
                )
              }
            />
          </div>
        </div>

        {/* Ingredients */}

        <div className="p-6 sm:p-7">
          {groups.map((group) => (
            <div
              key={group.title}
              className="mb-7 last:mb-0"
            >
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C8501A]">
                {group.title}
              </h3>

              <div>
                {group.ingredients.map(
                  (ingredient) => {
                    const adjustedQuantity =
                      ingredient.quantity *
                      (servings / baseServings);

                    return (
                      <IngredientItem
                        key={ingredient.id}
                        name={ingredient.name}
                        quantity={
                          adjustedQuantity
                        }
                        unit={ingredient.unit}
                        checked={checkedIngredients.has(
                          ingredient.id
                        )}
                        onToggle={() =>
                          toggleIngredient(
                            ingredient.id
                          )
                        }
                      />
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}