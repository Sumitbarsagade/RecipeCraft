import FilterChip from "./FilterChip";
import {
  categories,
  cookTimes,
  difficulties,
} from "../../utils/recipeFilters";

interface Props {
  selectedCategory: string;
  selectedDifficulty: string;
  selectedCookTime: string;

  onCategoryChange: (v: string) => void;
  onDifficultyChange: (v: string) => void;
  onCookTimeChange: (v: string) => void;
}

export default function RecipeFilterBar({
  selectedCategory,
  selectedDifficulty,
  selectedCookTime,
  onCategoryChange,
  onDifficultyChange,
  onCookTimeChange,
}: Props) {
  return (
    <section
  className="
    sticky
    top-24
    h-[calc(100vh-96px)]
    overflow-y-auto
    pr-2
    scrollbar-hide
  "
>
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        {/* Categories */}

        <div>

          <h3 className="mb-4 font-semibold uppercase tracking-widest text-gray-500">
            Categories
          </h3>

          <div className="grid gap-2  grid-cols-2">

            {categories.map((item) => (
              <FilterChip
                key={item}
                label={item}
                active={item === selectedCategory}
                onClick={() =>
                  onCategoryChange(item)
                }
              />
            ))}

          </div>

        </div>

        {/* Bottom */}

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <h3 className="mb-4 font-semibold uppercase tracking-widest text-gray-500">
              Difficulty
            </h3>

            <div className="flex gap-3 flex-wrap">

              {difficulties.map((item) => (
                <FilterChip
                  key={item}
                  label={item}
                  active={item === selectedDifficulty}
                  onClick={() =>
                    onDifficultyChange(item)
                  }
                />
              ))}

            </div>

          </div>

          <div>

            <h3 className="mb-4 font-semibold uppercase tracking-widest text-gray-500">
              Cook Time
            </h3>

            <div className="flex gap-3 flex-wrap">

              {cookTimes.map((item) => (
                <FilterChip
                  key={item}
                  label={item}
                  active={item === selectedCookTime}
                  onClick={() =>
                    onCookTimeChange(item)
                  }
                />
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}