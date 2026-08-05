import { LayoutGrid, Rows3 } from "lucide-react";

interface Props {
  grid: boolean;
  setGrid: (value: boolean) => void;
}

export default function GridToggle({
  grid,
  setGrid,
}: Props) {
  return (
    <div className="flex rounded-xl border bg-white">

      <button
        onClick={() => setGrid(true)}
        className={`p-3 ${
          grid
            ? "bg-[#C8501A] text-white"
            : "text-gray-500"
        }`}
      >
        <LayoutGrid size={18} />
      </button>

      <button
        onClick={() => setGrid(false)}
        className={`p-3 ${
          !grid
            ? "bg-[#C8501A] text-white"
            : "text-gray-500"
        }`}
      >
        <Rows3 size={18} />
      </button>

    </div>
  );
}