import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

import type { DashboardRecipe } from "../../../utils/dashboardRecipes";

interface Props {
  recipe: DashboardRecipe | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteRecipeModal({
  recipe,
  onClose,
  onConfirm,
}: Props) {
  return (
    <AnimatePresence>
      {recipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={21} />
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <h2 className="mt-5 font-serif text-2xl font-bold text-[#1F2D27]">
              Delete recipe?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#69736D]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#1F2D27]">
                {recipe.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={onClose}
                className="rounded-xl border border-[#DDD6CD] px-5 py-2.5 text-sm font-semibold text-[#47534D] hover:bg-[#F8F5F1]"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Recipe
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}