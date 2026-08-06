import { useState } from "react";

import RecipeFilterBar from "../components/recipes/RecipeFilterBar";

import ActiveFilters from "../components/recipes/ActiveFilters";
import RecipeToolbar from "../components/recipes/RecipeToolbar";
import RecipeGrid from "../components/recipes/RecipeGrid";
import { recipes } from "../utils/recipes";



export default function RecipesPage() {
  

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
    <main className="mx-auto max-w-7xl px-6 py-8 mt-12">
  <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

      <RecipeFilterBar
        selectedCategory={category}
        selectedDifficulty={difficulty}
        selectedCookTime={cookTime}
        onCategoryChange={setCategory}
        onDifficultyChange={setDifficulty}
        onCookTimeChange={setCookTime}

        
      />

    <section className="min-w-0">

   

   
      
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
 </section>

  </div>
</main>

      
    </>
  );
}