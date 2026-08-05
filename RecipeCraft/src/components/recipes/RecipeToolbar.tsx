import GridToggle from "./GridToogle";
import SortDropdown from "./SortDropdown";

interface Props {
  total: number;
  grid: boolean;
  setGrid: (v: boolean) => void;
  sort: string;
  setSort: (v: string) => void;
}

export default function RecipeToolbar({
  total,
  grid,
  setGrid,
  sort,
  setSort,
}: Props) {
  return (
    <section className="py-6">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

        <div>
          <h3 className="text-2xl font-bold">
            {total} Recipes
          </h3>

          <p className="text-gray-500">
            Discover your next meal
          </p>
        </div>

        <div className="flex items-center gap-4">

          <SortDropdown
            value={sort}
            onChange={setSort}
          />

          <GridToggle
            grid={grid}
            setGrid={setGrid}
          />

        </div>

      </div>

    </section>
  );
}