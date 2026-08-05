import { useState } from "react";
import RecipeHero from "../components/recipes/RecipeHero";
import RecipeFilterBar from "../components/recipes/RecipeFilterBar";

import ActiveFilters from "../components/recipes/ActiveFilters";
import RecipeToolbar from "../components/recipes/RecipeToolbar";
import RecipeGrid from "../components/recipes/RecipeGrid";
import { recipes } from "../utils/recipes";



export default function RecipesPage() {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("Any");
  const [cookTime, setCookTime] = useState("Any");

  const [sort, setSort] = useState("Most Relevant");
const [grid, setGrid] = useState(true);

const filters = [
  category !== "All" ? category : "",
  difficulty !== "Any" ? difficulty : "",
  cookTime !== "Any" ? cookTime : "",
].filter(Boolean);

  return (
    <>
    
      <RecipeHero
        search={search}
        setSearch={setSearch}
      />

      <RecipeFilterBar
        selectedCategory={category}
        selectedDifficulty={difficulty}
        selectedCookTime={cookTime}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
        onCookTimeChange={setCookTime}
      />
      
      <ActiveFilters
  filters={filters}
  onRemove={(filter) => {
    if (filter === category) setCategory("All");
    if (filter === difficulty) setDifficulty("Any");
    if (filter === cookTime) setCookTime("Any");
  }}
/>

<RecipeToolbar
  total={recipes.length}
  sort={sort}
  setSort={setSort}
  grid={grid}
  setGrid={setGrid}
/>

<RecipeGrid recipes={recipes} />
      {/* Recipe Grid */}

      
    </>
  );
}