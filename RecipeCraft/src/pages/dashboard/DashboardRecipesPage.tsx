import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import RecipeManagementHeader from "../../components/dashboard/recipes/RecipeManagementHeader";
import RecipeManagementToolbar from "../../components/dashboard/recipes/RecipeManagementToolbar";
import DashboardRecipeCard from "../../components/dashboard/recipes/DashboardRecipeCard";
import DashboardRecipeListItem from "../../components/dashboard/recipes/DashboardRecipeListItem";
import DeleteRecipeModal from "../../components/dashboard/recipes/DeleteRecipeModel";
import RecipeEmptyState from "../../components/dashboard/recipes/RecipeEmptyState";


import {
  dashboardRecipes,
  type DashboardRecipe,
} from "../../utils/dashboardRecipes";

import type { RecipeFilter } from "../../components/dashboard/recipes/RecipeStatusFilter";
import type { RecipeSort } from "../../components/dashboard/recipes/RecipeSort";



export default function DashboardRecipesPage() {
  const navigate = useNavigate();

  const [recipes, setRecipes] =
    useState<DashboardRecipe[]>(dashboardRecipes);

  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState<RecipeFilter>("all");

  const [sort, setSort] =
    useState<RecipeSort>("newest");

  const [view, setView] =
    useState<"grid" | "list">("grid");

  const [deleteRecipe, setDeleteRecipe] =
    useState<DashboardRecipe | null>(null);

  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.category.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query)
      );
    }

    // Status
    if (filter !== "all") {
      result = result.filter(
        (recipe) => recipe.status === filter
      );
    }

    // Sort
    switch (sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;

      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        break;

      case "views":
        result.sort((a, b) => b.views - a.views);
        break;

      case "az":
        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
    }

    return result;
  }, [recipes, search, filter, sort]);

  const handleEdit = (recipe: DashboardRecipe) => {
    navigate(`/dashboard/recipes/${recipe.id}/edit`);
  };

  const handleDelete = (recipe: DashboardRecipe) => {
    setDeleteRecipe(recipe);
  };

  const handlePreview = (recipe: DashboardRecipe) => {
    navigate(`/recipes/${recipe.id}`);
  };

  const confirmDelete = () => {
    if (!deleteRecipe) return;

    setRecipes((current) =>
      current.filter(
        (recipe) => recipe.id !== deleteRecipe.id
      )
    );

    setDeleteRecipe(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-[1500px]">

        <RecipeManagementHeader />

        <RecipeManagementToolbar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          view={view}
          setView={setView}
        />

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-[#707A74]">
            <span className="font-semibold text-[#1F2D27]">
              {filteredRecipes.length}
            </span>{" "}
            {filteredRecipes.length === 1
              ? "recipe"
              : "recipes"}
          </p>

          {(search || filter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="text-sm font-semibold text-[#C8501A] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Empty state */}
        {filteredRecipes.length === 0 ? (
          <RecipeEmptyState
            search={search}
            filter={filter}
          />
        ) : view === "grid" ? (
          /* GRID */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredRecipes.map((recipe) => (
              <DashboardRecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPreview={handlePreview}
              />
            ))}
          </div>
        ) : (
          /* LIST */
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <DashboardRecipeListItem
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPreview={handlePreview}
              />
            ))}
          </div>
        )}

      </div>

      {/* Delete Modal */}
      <DeleteRecipeModal
        recipe={deleteRecipe}
        onClose={() => setDeleteRecipe(null)}
        onConfirm={confirmDelete}
      />

    </div>
  );
}