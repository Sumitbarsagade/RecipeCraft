import { motion } from "framer-motion";
import { ImagePlus, Upload, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  image: string;
  setImage: (value: string) => void;
}

export default function RecipeImageUpload({
  image,
  setImage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#E8E1D8] bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Recipe Cover
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          Add an appetizing image for your recipe.
        </p>
      </div>

      {image ? (
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={image}
            alt="Recipe preview"
            className="aspect-[16/8] w-full object-cover"
          />

          <button
            type="button"
            onClick={() => setImage("")}
            className="absolute right-3 top-3 rounded-full bg-white p-2 text-red-600 shadow-md"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group flex min-h-[240px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DDD5CB] bg-[#FCFAF7] transition hover:border-[#C8501A] hover:bg-[#FFF8F3]"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FCE8DD] text-[#C8501A] transition group-hover:scale-105">
            <ImagePlus size={25} />
          </div>

          <p className="mt-4 font-semibold text-[#36413B]">
            Upload recipe image
          </p>

          <p className="mt-1 text-xs text-[#8A938D]">
            JPG, PNG or WEBP · Recommended 1200 × 800px
          </p>

          <span className="mt-4 flex items-center gap-2 rounded-lg border border-[#DDD5CB] bg-white px-4 py-2 text-xs font-semibold text-[#536059]">
            <Upload size={14} />
            Choose Image
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </motion.section>
  );
}