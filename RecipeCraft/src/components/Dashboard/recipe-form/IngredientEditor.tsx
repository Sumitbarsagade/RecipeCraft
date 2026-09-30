import { Plus, Trash2, GripVertical } from "lucide-react";
import { ingredientUnits, type RecipeIngredient } from "../../../types/recipe.types";



interface Props {
  ingredients: RecipeIngredient[];
  setIngredients: (
    ingredients: RecipeIngredient[]
  ) => void;
}

export default function IngredientEditor({
  ingredients,
  setIngredients,
}: Props) {
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: crypto.randomUUID(),
        name: "",
        quantity: "",
        unit: "" as RecipeIngredient["unit"],
      },
    ]);
  };

  const updateIngredient = (
    id: string,
    field: keyof RecipeIngredient,
    value: string
  ) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id
          ? {
              ...ingredient,
              [field]: value,
            }
          : ingredient
      )
    );
  };

  const removeIngredient = (id: string) => {
    setIngredients(
      ingredients.filter(
        (ingredient) => ingredient.id !== id
      )
    );
  };

  return (
    <section className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm sm:p-6">

      <div className="mb-6">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Ingredients
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          Add everything needed to prepare this recipe.
        </p>
      </div>

      <div className="space-y-3">

        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="group grid grid-cols-[auto_1fr_auto_auto] gap-2"
          >
            <div className="flex items-center text-[#A0A6A2]">
              <GripVertical size={17} />
            </div>

                
              {/* Ingredient */}
            <input
              value={ingredient.name}
              
              onChange={(e) =>
                updateIngredient(
                  ingredient.id,
                  "name",
                  e.target.value
                )
              }
              placeholder={`Ingredient ${index + 1}`}
              className="min-w-0 rounded-xl border border-[#E4DDD4] px-3 py-2.5 text-sm outline-none focus:border-[#C8501A]"
            />
            
             {/* Quantity */}
            <input
              value={ingredient.quantity}
              type="number"
              onChange={(e) =>
                updateIngredient(
                  ingredient.id,
                  "quantity",
                  e.target.value
                )
              }
              placeholder="Qty"
              className="w-20 rounded-xl border border-[#E4DDD4] px-3 py-2.5 text-sm outline-none focus:border-[#C8501A]"
            />

            {/* Unit */}
  <select
    value={ingredient.unit}
    onChange={(e) =>
      updateIngredient(
        ingredient.id,
        "unit",
        e.target.value
      )
    }
    className="w-28 rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] px-3 py-3 text-sm text-[#47534D] outline-none transition focus:border-[#C8501A] focus:ring-2 focus:ring-[#C8501A]/10"
  >
    <option value="">
      Unit
    </option>

    {ingredientUnits
      .filter(Boolean)
      .map((unit) => (
        <option
          key={unit}
          value={unit}
        >
          {unit}
        </option>
      ))}
  </select>

            <button
              type="button"
              onClick={() =>
                removeIngredient(ingredient.id)
              }
              className="rounded-xl p-2.5 text-[#9A9F9B] hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}

      </div>

      <button
        type="button"
        onClick={addIngredient}
        className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-[#C8501A] px-4 py-2.5 text-sm font-semibold text-[#C8501A] transition hover:bg-[#FFF5F0]"
      >
        <Plus size={17} />
        Add Ingredient
      </button>
    </section>
  );
}