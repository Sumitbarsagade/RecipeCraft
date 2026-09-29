import { Eye, Save, Send } from "lucide-react";

import type {
  RecipeStatus,
} from "../../../types/recipe.types";

interface Props {
  isEditing?: boolean;

  isLoading?: boolean;

  submittingStatus: RecipeStatus | null;

  onSaveDraft: () => void;

  onPublish: () => void;

  onPreview: () => void;
}

export default function RecipeFormActions({
  isEditing = false,
  isLoading = false,
  submittingStatus,
  onSaveDraft,
  onPublish,
  onPreview,
}: Props) {
  const isSavingDraft =
    isLoading &&
    submittingStatus === "draft";

  const isPublishing =
    isLoading &&
    submittingStatus === "published";

  return (
    <div className="sticky bottom-0 z-20 -mx-4 border-t border-[#E5DED5] bg-[#FAF8F4]/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

        {/* Preview */}
        <button
          type="button"
          onClick={onPreview}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-xl border border-[#DCD4CA] bg-white px-5 py-3 text-sm font-semibold text-[#47534D] transition hover:bg-[#F5F1EC] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Eye size={17} />

          Preview
        </button>


        {/* Save Draft */}
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-xl border border-[#C8501A] px-5 py-3 text-sm font-semibold text-[#C8501A] transition hover:bg-[#FFF5F0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save
            size={17}
            className={
              isSavingDraft
                ? "animate-pulse"
                : ""
            }
          />

          {isSavingDraft
            ? "Saving..."
            : "Save Draft"}
        </button>


        {/* Publish / Update */}
        <button
          type="button"
          onClick={onPublish}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#C8501A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A94314] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send
            size={17}
            className={
              isPublishing
                ? "animate-pulse"
                : ""
            }
          />

          {isPublishing
            ? isEditing
              ? "Updating..."
              : "Publishing..."
            : isEditing
              ? "Update Recipe"
              : "Publish Recipe"}
        </button>

      </div>
    </div>
  );
}