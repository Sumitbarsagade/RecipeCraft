import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface Props {
  title: string;
  description: string;
  category: string;
  cuisine: string;
  tags: string[];

  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setCategory: (value: string) => void;
  setCuisine: (value: string) => void;
  setTags: (value: string[]) => void;
}

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snacks",
  "Drinks",
];

const cuisines = [
  "Indian",
  "Italian",
  "Chinese",
  "Mexican",
  "Thai",
  "Japanese",
  "American",
  "Mediterranean",
];

export default function RecipeBasicInfo({
  title,
  description,
  category,
  cuisine,
  tags,
  setTitle,
  setDescription,
  setCategory,
  setCuisine,
  setTags,
}: Props) {
  const addTag = (value: string) => {
    const tag = value.trim();

    if (!tag || tags.includes(tag)) return;

    setTags([...tags, tag]);
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((item) => item !== tag));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FCE8DD] text-[#C8501A]">
          <FileText size={19} />
        </div>

        <div>
          <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
            Basic Information
          </h2>

          <p className="text-sm text-[#737D77]">
            Tell people what makes this recipe special.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#36413B]">
            Recipe Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Creamy Garlic Pasta"
            className="w-full rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] px-4 py-3 text-sm outline-none transition focus:border-[#C8501A] focus:ring-2 focus:ring-[#C8501A]/10"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#36413B]">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe your recipe..."
            className="w-full resize-none rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] px-4 py-3 text-sm outline-none transition focus:border-[#C8501A] focus:ring-2 focus:ring-[#C8501A]/10"
          />

          <p className="mt-1 text-right text-xs text-[#969E99]">
            {description.length}/500
          </p>
        </div>

        {/* Category + Cuisine */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#36413B]">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] px-4 py-3 text-sm outline-none focus:border-[#C8501A]"
            >
              <option value="">Select category</option>

              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#36413B]">
              Cuisine
            </label>

            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] px-4 py-3 text-sm outline-none focus:border-[#C8501A]"
            >
              <option value="">Select cuisine</option>

              {cuisines.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Tags */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#36413B]">
            Tags
          </label>

          <input
            placeholder="Type a tag and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                addTag(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
            className="w-full rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] px-4 py-3 text-sm outline-none focus:border-[#C8501A]"
          />

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="rounded-full bg-[#F3EEE8] px-3 py-1.5 text-xs font-medium text-[#536059] transition hover:bg-red-50 hover:text-red-600"
                >
                  #{tag} ×
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.section>
  );
}