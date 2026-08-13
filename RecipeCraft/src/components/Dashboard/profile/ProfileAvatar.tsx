import { Camera, UserRound, X } from "lucide-react";
import { useRef } from "react";

interface ProfileAvatarProps {
  image: string;
  isEditing: boolean;
  onImageChange: (image: string) => void;
}

export default function ProfileAvatar({
  image,
  isEditing,
  onImageChange,
}: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    onImageChange(imageUrl);
  };

  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-white p-6 shadow-sm">
      <div className="text-center">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Profile Photo
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          Your profile image will appear across RecipeCraft.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="relative">
          <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-[#F3EEE8] bg-[#F8F4EF]">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[#A2AAA5]">
                <UserRound size={60} strokeWidth={1.4} />
              </div>
            )}
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#C8501A] text-white shadow-lg transition hover:bg-[#A94314]"
              aria-label="Change profile photo"
            >
              <Camera size={18} />
            </button>
          )}
        </div>

        {isEditing && (
          <>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-5 rounded-xl border border-[#DDD5CB] bg-white px-4 py-2.5 text-sm font-semibold text-[#536059] transition hover:bg-[#F7F3EE]"
            >
              Change Photo
            </button>

            {image && (
              <button
                type="button"
                onClick={() => onImageChange("")}
                className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600"
              >
                <X size={13} />
                Remove photo
              </button>
            )}

            <p className="mt-3 text-center text-xs text-[#969E99]">
              JPG, PNG or WEBP
              <br />
              Maximum recommended size: 2MB
            </p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
}