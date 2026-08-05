import { ArrowDownWideNarrow } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-3">

      <ArrowDownWideNarrow size={18} />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none focus:border-[#C8501A]"
      >
        <option>Most Relevant</option>
        <option>Newest</option>
        <option>Highest Rated</option>
        <option>Trending</option>
        <option>Cooking Time</option>
      </select>

    </div>
  );
}