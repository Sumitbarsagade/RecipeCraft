import { Clock3, Users, Gauge } from "lucide-react";

interface Props {
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";

  setPrepTime: (value: number) => void;
  setCookTime: (value: number) => void;
  setServings: (value: number) => void;
  setDifficulty: (
    value: "Easy" | "Medium" | "Hard"
  ) => void;
}

interface TimeFieldProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
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

        <TimeField
          label="Preparation Time"
          icon={<Clock3 size={16} />}
          
          value={prepTime}     
          onChange={setPrepTime}
        />

        <TimeField
          label="Cooking Time"
        
          icon={<Clock3 size={16} />}
          value={cookTime}
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
  value: number;
  placeholder: string;
  onChange: (value: number) => void;
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
          type="number"
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          placeholder={placeholder}
          className="w-full rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] py-3 pl-9 pr-4 text-sm outline-none focus:border-[#C8501A]"
        />
      </div>
    </div>
  );
}

function TimeField({
  label,
  icon,
  value,
  onChange,
}: TimeFieldProps) {
  const hour_value = Math.floor(value / 60);
  const min_value = value % 60;


  /* -----------------------------------------
     Update complete duration string
  ----------------------------------------- */

  const updateTime = (
    newHours: number,
    newMinutes: number
  ) => {
    // Completely empty duration
    if (!newHours && !newMinutes) {
      onChange(0);
      return;
    }

    const safeHours =
      Math.max(
        0,
        Number(newHours || 0)
      );

    const safeMinutes =
      Math.min(
        59,
        Math.max(
          0,
          Number(newMinutes || 0)
        )
      );

      

    onChange(
      safeHours*60 +safeMinutes
    );
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#36413B]">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] px-3 py-2 transition-colors focus-within:border-[#C8501A] focus-within:ring-2 focus-within:ring-[#C8501A]/10">

        {/* Icon */}
        <div className="flex shrink-0 items-center justify-center text-[#858E88]">
          {icon}
        </div>

        {/* Hours */}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={hour_value}
            onChange={(e) =>
              updateTime(
                Number(e.target.value),
                min_value
              )
            }
            placeholder="0"
            aria-label={`${label} hours`}
            className="w-full min-w-0 bg-transparent py-1 text-center text-sm font-semibold text-[#36413B] outline-none placeholder:text-[#B1B7B3]"
          />

          <span className="shrink-0 text-xs font-medium text-[#858E88]">
            hr
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px shrink-0 bg-[#E4DDD4]" />

        {/* Minutes */}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <input
            type="number"
            min="0"
            max="59"
            inputMode="numeric"
            value={min_value}
            onChange={(e) =>
              updateTime(
                hour_value,
                Number(e.target.value)
              )
            }
            placeholder="0"
            aria-label={`${label} minutes`}
            className="w-full min-w-0 bg-transparent py-1 text-center text-sm font-semibold text-[#36413B] outline-none placeholder:text-[#B1B7B3]"
          />

          <span className="shrink-0 text-xs font-medium text-[#858E88]">
            min
          </span>
        </div>
      </div>
    </div>
  );
}