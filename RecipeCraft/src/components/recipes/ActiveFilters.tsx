import { X } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  filters: string[];
  onRemove: (filter: string) => void;
}

export default function ActiveFilters({
  filters,
  onRemove,
}: Props) {
  if (filters.length === 0) return null;

  return (
    <section className="py-6">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-6">

        {filters.map((filter) => (
          <motion.button
            key={filter}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
            onClick={() => onRemove(filter)}
            className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-[#C8501A]"
          >
            {filter}
            <X size={15} />
          </motion.button>
        ))}

      </div>
    </section>
  );
}