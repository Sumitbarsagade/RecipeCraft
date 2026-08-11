import { motion } from "framer-motion";

export type RecipeFilter = "all" | "published" | "draft";

interface Props {
  value: RecipeFilter;
  onChange: (value: RecipeFilter) => void;
}

const filters: {
  label: string;
  value: RecipeFilter;
}[] = [
  { label: "All Recipes", value: "all" },
  { label: "Published", value: "published" },
  { label: "Drafts", value: "draft" },
];

export default function RecipeStatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-[#E7E0D7] bg-white p-1">
      {filters.map((filter) => {
        const active = value === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className="relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium"
          >
            {active && (
              <motion.div
                layoutId="recipe-status-pill"
                className="absolute inset-0 rounded-lg bg-[#FCE8DD]"
              />
            )}

            <span
              className={`relative z-10 ${
                active
                  ? "text-[#C8501A]"
                  : "text-[#68736D] hover:text-[#1F2D27]"
              }`}
            >
              {filter.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}