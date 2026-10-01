import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import RecipeManagementHeader from "../../components/dashboard/recipes/RecipeManagementHeader";
import RecipeManagementToolbar from "../../components/dashboard/recipes/RecipeManagementToolbar";
import DashboardRecipeCard from "../../components/dashboard/recipes/DashboardRecipeCard";
import DashboardRecipeListItem from "../../components/dashboard/recipes/DashboardRecipeListItem";
import DeleteRecipeModal from "../../components/dashboard/recipes/DeleteRecipeModel";
import RecipeEmptyState from "../../components/dashboard/recipes/RecipeEmptyState";

import type {
  RecipeCardSummary,
} from "../../types/recipe.types";

import type {
  RecipeFilter,
} from "../../components/dashboard/recipes/RecipeStatusFilter";

import type {
  RecipeSort,
} from "../../components/dashboard/recipes/RecipeSort";

import {
  useGetMyRecipesQuery,
} from "../../features/recipes/recipeApi";


export default function DashboardRecipesPage() {
  const navigate =
    useNavigate();


  /* =====================================================
     DASHBOARD STATE
  ===================================================== */

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<RecipeFilter>(
      "all"
    );

  const [sort, setSort] =
    useState<RecipeSort>(
      "newest"
    );

  const [view, setView] =
    useState<"grid" | "list">(
      "grid"
    );

  const [
    deleteRecipe,
    setDeleteRecipe,
  ] = useState<
    RecipeCardSummary | null
  >(null);


  /* =====================================================
     API QUERY
  ===================================================== */

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMyRecipesQuery({
    page,

    search:
      search.trim() ||
      undefined,

    status:
      filter === "all"
        ? undefined
        : filter,

    sort,
  });


  /* =====================================================
     API DATA
  ===================================================== */

  const recipes =
    data?.data.recipes ?? [];

  const pagination =
    data?.data.pagination;


  /* =====================================================
     RESET PAGE WHEN FILTERS CHANGE
  ===================================================== */

  useEffect(() => {
    setPage(1);
  }, [
    search,
    filter,
    sort,
  ]);


  /* =====================================================
     ACTIONS
  ===================================================== */

  const handleEdit = (
    recipe: RecipeCardSummary
  ) => {
    navigate(
      `/dashboard/recipes/${recipe._id}/edit`
    );
  };


  const handleDelete = (
    recipe: RecipeCardSummary
  ) => {
    setDeleteRecipe(recipe);
  };


  const handlePreview = (
    recipe: RecipeCardSummary
  ) => {
    navigate(
      `/recipes/${recipe.slug}`
    );
  };


  /*
   * We'll replace this with
   * useDeleteRecipeMutation()
   * once the delete endpoint is connected.
   */
  const confirmDelete = () => {
    if (!deleteRecipe) {
      return;
    }

    console.log(
      "Delete recipe:",
      deleteRecipe._id
    );

    setDeleteRecipe(null);
  };


  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const handleClearFilters = () => {
    setSearch("");
    setFilter("all");
    setPage(1);
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-[1500px]">
          <RecipeManagementHeader />

          <div className="mt-8 flex min-h-[300px] items-center justify-center">
            <p className="text-sm font-medium text-[#707A74]">
              Loading recipes...
            </p>
          </div>
        </div>
      </div>
    );
  }


  /* =====================================================
     ERROR
  ===================================================== */

  if (isError) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-[1500px]">
          <RecipeManagementHeader />

          <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center gap-4">
            <p className="text-sm font-medium text-[#707A74]">
              Unable to load your recipes.
            </p>

            <button
              type="button"
              onClick={() =>
                refetch()
              }
              className="rounded-xl bg-[#C8501A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A94314]"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }


  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-[1500px]">

        <RecipeManagementHeader />


        {/* ===========================
            TOOLBAR
        =========================== */}

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


        {/* ===========================
            RESULTS INFO
        =========================== */}

        <div className="mb-4 flex items-center justify-between">

          <p className="text-sm text-[#707A74]">
            <span className="font-semibold text-[#1F2D27]">
              {pagination?.totalRecipes ?? 0}
            </span>{" "}

            {(pagination?.totalRecipes ?? 0) === 1
              ? "recipe"
              : "recipes"}
          </p>


          {(search ||
            filter !== "all") && (
            <button
              type="button"
              onClick={
                handleClearFilters
              }
              className="text-sm font-semibold text-[#C8501A] hover:underline"
            >
              Clear filters
            </button>
          )}

        </div>


        {/* ===========================
            BACKGROUND REFRESH
        =========================== */}

        {isFetching &&
          !isLoading && (
            <div className="mb-3 text-xs font-medium text-[#8A928D]">
              Updating recipes...
            </div>
          )}


        {/* ===========================
            EMPTY STATE
        =========================== */}

        {recipes.length === 0 ? (

          <RecipeEmptyState
            search={search}
            filter={filter}
          />

        ) : view === "grid" ? (

          /* =========================
             GRID
          ========================= */

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            {recipes.map(
              (recipe) => (
                <DashboardRecipeCard
                  key={
                    recipe._id
                  }
                  recipe={
                    recipe
                  }
                  onEdit={
                    handleEdit
                  }
                  onDelete={
                    handleDelete
                  }
                  onPreview={
                    handlePreview
                  }
                />
              )
            )}

          </div>

        ) : (

          /* =========================
             LIST
          ========================= */

          <div className="space-y-4">

            {recipes.map(
              (recipe) => (
                <DashboardRecipeListItem
                  key={
                    recipe._id
                  }
                  recipe={
                    recipe
                  }
                  onEdit={
                    handleEdit
                  }
                  onDelete={
                    handleDelete
                  }
                  onPreview={
                    handlePreview
                  }
                />
              )
            )}

          </div>

        )}


        {/* ===========================
            PAGINATION
        =========================== */}

        {pagination &&
          pagination.totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#E5DED5] pt-5 sm:flex-row">

              {/* Page info */}

              <p className="text-sm text-[#707A74]">
                Page{" "}

                <span className="font-semibold text-[#1F2D27]">
                  {
                    pagination.currentPage
                  }
                </span>

                {" "}of{" "}

                <span className="font-semibold text-[#1F2D27]">
                  {
                    pagination.totalPages
                  }
                </span>
              </p>


              {/* Controls */}

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  disabled={
                    !pagination.hasPreviousPage ||
                    isFetching
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.max(
                          current - 1,
                          1
                        )
                    )
                  }
                  className="rounded-xl border border-[#DDD5CB] bg-white px-4 py-2 text-sm font-semibold text-[#47534D] transition hover:border-[#C8501A] hover:text-[#C8501A] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>


                <button
                  type="button"
                  disabled={
                    !pagination.hasNextPage ||
                    isFetching
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        current + 1
                    )
                  }
                  className="rounded-xl border border-[#DDD5CB] bg-white px-4 py-2 text-sm font-semibold text-[#47534D] transition hover:border-[#C8501A] hover:text-[#C8501A] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>

              </div>

            </div>
          )}

      </div>


      {/* =============================
          DELETE MODAL
      ============================= */}

      <DeleteRecipeModal
        recipe={deleteRecipe}
        onClose={() =>
          setDeleteRecipe(null)
        }
        onConfirm={
          confirmDelete
        }
      />

    </div>
  );
}