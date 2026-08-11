import { Grid2X2, List } from "lucide-react";

interface Props {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export default function RecipeViewToggle({
  view,
  onChange,
}: Props) {
  return (
    <div className="flex rounded-xl border border-[#E7E0D7] bg-white p-1">
      <button
        onClick={() => onChange("grid")}
        className={`rounded-lg p-2 transition ${
          view === "grid"
            ? "bg-[#FCE8DD] text-[#C8501A]"
            : "text-[#7A837D]"
        }`}
        aria-label="Grid view"
      >
        <Grid2X2 size={17} />
      </button>

      <button
        onClick={() => onChange("list")}
        className={`rounded-lg p-2 transition ${
          view === "list"
            ? "bg-[#FCE8DD] text-[#C8501A]"
            : "text-[#7A837D]"
        }`}
        aria-label="List view"
      >
        <List size={17} />
      </button>
    </div>
  );
}