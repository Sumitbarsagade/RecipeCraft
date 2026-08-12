import { Plus, Trash2, GripVertical } from "lucide-react";
import type { RecipeInstruction } from "../../../types/recipe.types";

interface Props {
  instructions: RecipeInstruction[];
  setInstructions: (
    instructions: RecipeInstruction[]
  ) => void;
}

export default function InstructionEditor({
  instructions,
  setInstructions,
}: Props) {
  const addStep = () => {
    setInstructions([
      ...instructions,
      {
        id: crypto.randomUUID(),
        step: instructions.length + 1,
        description: "",
      },
    ]);
  };

  const updateStep = (
    id: string,
    description: string
  ) => {
    setInstructions(
      instructions.map((item) =>
        item.id === id
          ? { ...item, description }
          : item
      )
    );
  };

  const removeStep = (id: string) => {
    const updated = instructions
      .filter((item) => item.id !== id)
      .map((item, index) => ({
        ...item,
        step: index + 1,
      }));

    setInstructions(updated);
  };

  return (
    <section className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm sm:p-6">

      <div className="mb-6">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Cooking Instructions
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          Break the recipe into clear, easy-to-follow steps.
        </p>
      </div>

      <div className="space-y-4">

        {instructions.map((instruction) => (
          <div
            key={instruction.id}
            className="flex gap-3"
          >
            <div className="flex shrink-0 items-center gap-2 text-[#9CA39E]">
              <GripVertical size={17} />

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FCE8DD] text-sm font-bold text-[#C8501A]">
                {instruction.step}
              </span>
            </div>

            <textarea
              value={instruction.description}
              onChange={(e) =>
                updateStep(
                  instruction.id,
                  e.target.value
                )
              }
              placeholder={`Describe step ${instruction.step}...`}
              rows={3}
              className="min-w-0 flex-1 resize-none rounded-xl border border-[#E4DDD4] px-4 py-3 text-sm outline-none focus:border-[#C8501A]"
            />

            <button
              type="button"
              onClick={() =>
                removeStep(instruction.id)
              }
              className="h-fit rounded-xl p-2 text-[#9A9F9B] hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}

      </div>

      <button
        type="button"
        onClick={addStep}
        className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-[#C8501A] px-4 py-2.5 text-sm font-semibold text-[#C8501A] transition hover:bg-[#FFF5F0]"
      >
        <Plus size={17} />
        Add Cooking Step
      </button>

    </section>
  );
}