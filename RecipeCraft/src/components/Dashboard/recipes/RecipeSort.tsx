import { ArrowDownUp } from "lucide-react";

export type RecipeSort =
  | "newest"
  | "oldest"
  | "views"
  | "az";

interface Props {
  value: RecipeSort;
  onChange: (value: RecipeSort) => void;
}

export default function RecipeSort({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <ArrowDownUp
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7A837D]"
      />

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as RecipeSort)
        }
        className="appearance-none rounded-xl border border-[#E7E0D7] bg-white py-2.5 pl-9 pr-9 text-sm font-medium text-[#36413B] outline-none transition focus:border-[#C8501A]"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="views">Most viewed</option>
        <option value="az">A - Z</option>
      </select>
    </div>
  );
}