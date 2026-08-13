import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

export default function ProfileHeader({
  isEditing,
  onEdit,
  onCancel,
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8501A] text-white">
          <ChefHat size={24} />
        </div>

        <div>
          <p className="text-sm font-semibold text-[#C8501A]">
            Your Account
          </p>

          <h1 className="font-serif text-3xl font-bold text-[#1F2D27]">
            Profile
          </h1>

          <p className="mt-1 text-sm text-[#737D77]">
            Manage your RecipeCraft profile and personal information.
          </p>
        </div>
      </div>

      {!isEditing ? (
        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl bg-[#C8501A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#A94314]"
        >
          Edit Profile
        </button>
      ) : (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[#DDD5CB] bg-white px-5 py-3 text-sm font-semibold text-[#536059] transition hover:bg-[#F5F1EC]"
        >
          Cancel Editing
        </button>
      )}
    </motion.div>
  );
}