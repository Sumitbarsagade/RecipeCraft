import { Clock3, Users, Gauge } from "lucide-react";

interface Props {
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: "Easy" | "Medium" | "Hard";

  setPrepTime: (value: string) => void;
  setCookTime: (value: string) => void;
  setServings: (value: string) => void;
  setDifficulty: (
    value: "Easy" | "Medium" | "Hard"
  ) => void;
}

export default function RecipeDetails({
  prepTime,
  cookTime,
  servings,
  difficulty,
  setPrepTime,
  setCookTime,
  setServings,
  setDifficulty,
}: Props) {
  return (
    <section className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm sm:p-6">

      <div className="mb-6">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Recipe Details
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          Help readers understand the recipe at a glance.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">

        <Field
          label="Preparation Time"
          icon={<Clock3 size={16} />}
          value={prepTime}
          placeholder="e.g. 15 min"
          onChange={setPrepTime}
        />

        <Field
          label="Cooking Time"
          icon={<Clock3 size={16} />}
          value={cookTime}
          placeholder="e.g. 30 min"
          onChange={setCookTime}
        />

        <Field
          label="Servings"
          icon={<Users size={16} />}
          value={servings}
          placeholder="e.g. 4"
          onChange={setServings}
        />

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#36413B]">
            Difficulty
          </label>

          <div className="relative">
            <Gauge
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858E88]"
            />

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(
                  e.target.value as
                    | "Easy"
                    | "Medium"
                    | "Hard"
                )
              }
              className="w-full rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] py-3 pl-9 pr-4 text-sm outline-none focus:border-[#C8501A]"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function Field({
  label,
  icon,
  value,
  placeholder,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#36413B]">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858E88]">
          {icon}
        </div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] py-3 pl-9 pr-4 text-sm outline-none focus:border-[#C8501A]"
        />
      </div>
    </div>
  );
}