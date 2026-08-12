interface Props {
  nutrition: {
    calories: string;
    protein: string;
    carbohydrates: string;
    fat: string;
  };

  tips: string;
  notes: string;

  setNutrition: (
    nutrition: Props["nutrition"]
  ) => void;

  setTips: (value: string) => void;
  setNotes: (value: string) => void;
}

export default function RecipeAdditionalInfo({
  nutrition,
  tips,
  notes,
  setNutrition,
  setTips,
  setNotes,
}: Props) {
  return (
    <section className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm sm:p-6">

      <div className="mb-6">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Additional Information
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          Optional information that can make your recipe more useful.
        </p>
      </div>

      <h3 className="mb-3 text-sm font-semibold text-[#36413B]">
        Nutrition per serving
      </h3>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

        {[
          ["calories", "Calories", "kcal"],
          ["protein", "Protein", "g"],
          ["carbohydrates", "Carbohydrates", "g"],
          ["fat", "Fat", "g"],
        ].map(([key, label, unit]) => (
          <div key={key}>
            <label className="mb-2 block text-xs text-[#7A837D]">
              {label}
            </label>

            <div className="relative">
              <input
                value={
                  nutrition[
                    key as keyof typeof nutrition
                  ]
                }
                onChange={(e) =>
                  setNutrition({
                    ...nutrition,
                    [key]: e.target.value,
                  })
                }
                placeholder="0"
                className="w-full rounded-xl border border-[#E4DDD4] px-3 py-2.5 pr-12 text-sm outline-none focus:border-[#C8501A]"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#969E99]">
                {unit}
              </span>
            </div>
          </div>
        ))}

      </div>

      <div className="mt-6 space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#36413B]">
            Chef's Tips
          </label>

          <textarea
            value={tips}
            onChange={(e) => setTips(e.target.value)}
            rows={4}
            placeholder="Share tips and tricks for making this recipe..."
            className="w-full resize-none rounded-xl border border-[#E4DDD4] px-4 py-3 text-sm outline-none focus:border-[#C8501A]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#36413B]">
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Any additional notes..."
            className="w-full resize-none rounded-xl border border-[#E4DDD4] px-4 py-3 text-sm outline-none focus:border-[#C8501A]"
          />
        </div>

      </div>

    </section>
  );
}