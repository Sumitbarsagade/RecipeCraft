import { AlertTriangle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface DangerZoneProps {
  onDelete: () => void;
}

export default function DangerZone({
  onDelete,
}: DangerZoneProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm"
    >
      <div className="border-b border-red-100 bg-red-50/50 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
            <AlertTriangle size={19} />
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-red-700">
              Danger Zone
            </h2>

            <p className="mt-1 text-sm text-red-500/80">
              Actions here can permanently affect your account.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-sm font-semibold text-[#354139]">
            Delete Account
          </h3>

          <p className="mt-1 max-w-xl text-xs leading-5 text-[#8A938D]">
            Permanently delete your RecipeCraft account, recipes,
            profile and associated data. This action cannot be undone.
          </p>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete Account
        </button>
      </div>
    </motion.section>
  );
}