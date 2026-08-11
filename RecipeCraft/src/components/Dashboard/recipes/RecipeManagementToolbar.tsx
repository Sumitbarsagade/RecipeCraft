import { Search } from "lucide-react";
import RecipeStatusFilter, {
  type RecipeFilter,
} from "./RecipeStatusFilter";
import RecipeSort, {
  type RecipeSort as RecipeSortType,
} from "./RecipeSort";
import RecipeViewToggle from "../RecipeViewToggle";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  filter: RecipeFilter;
  setFilter: (value: RecipeFilter) => void;

  sort: RecipeSortType;
  setSort: (value: RecipeSortType) => void;

  view: "grid" | "list";
  setView: (value: "grid" | "list") => void;
}

export default function RecipeManagementToolbar({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  view,
  setView,
}: Props) {
  return (
    <div className="mb-6 space-y-4">

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">

        <div className="relative w-full xl:max-w-md">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#89918B]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your recipes..."
            className="w-full rounded-xl border border-[#E7E0D7] bg-white py-3 pl-10 pr-4 text-sm text-[#1F2D27] outline-none placeholder:text-[#9BA19D] transition focus:border-[#C8501A] focus:ring-2 focus:ring-[#C8501A]/10"
          />
        </div>

        <div className="flex items-center gap-2">
          <RecipeSort
            value={sort}
            onChange={setSort}
          />

          <RecipeViewToggle
            view={view}
            onChange={setView}
          />
        </div>

      </div>

      <RecipeStatusFilter
        value={filter}
        onChange={setFilter}
      />

    </div>
  );
}