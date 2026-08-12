import { Eye, Save, Send } from "lucide-react";

interface Props {
  isEditing?: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
  onPreview: () => void;
}

export default function RecipeFormActions({
  isEditing = false,
  onSaveDraft,
  onPublish,
  onPreview,
}: Props) {
  return (
    <div className="sticky bottom-0 z-20 -mx-4 border-t border-[#E5DED5] bg-[#FAF8F4]/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onPreview}
          className="flex items-center justify-center gap-2 rounded-xl border border-[#DCD4CA] bg-white px-5 py-3 text-sm font-semibold text-[#47534D] hover:bg-[#F5F1EC]"
        >
          <Eye size={17} />
          Preview
        </button>

        <button
          type="button"
          onClick={onSaveDraft}
          className="flex items-center justify-center gap-2 rounded-xl border border-[#C8501A] px-5 py-3 text-sm font-semibold text-[#C8501A] hover:bg-[#FFF5F0]"
        >
          <Save size={17} />
          Save Draft
        </button>

        <button
          type="button"
          onClick={onPublish}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#C8501A] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#A94314]"
        >
          <Send size={17} />
          {isEditing ? "Update Recipe" : "Publish Recipe"}
        </button>

      </div>
    </div>
  );
}