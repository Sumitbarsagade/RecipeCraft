import {
  AtSign,
  Globe,
  Mail,
  MapPin,
  User,
} from "lucide-react";

interface ProfileInformationProps {
  isEditing: boolean;

  fullName: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;

  setFullName: (value: string) => void;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setBio: (value: string) => void;
  setLocation: (value: string) => void;
  setWebsite: (value: string) => void;
}

export default function ProfileInformation({
  isEditing,

  fullName,
  username,
  email,
  bio,
  location,
  website,

  setFullName,
  setUsername,
  setEmail,
  setBio,
  setLocation,
  setWebsite,
}: ProfileInformationProps) {
  return (
    <div className="rounded-2xl border border-[#E8E1D8] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="font-serif text-xl font-bold text-[#1F2D27]">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-[#737D77]">
          Keep your RecipeCraft profile information up to date.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">

        <ProfileField
          label="Full Name"
          icon={<User size={16} />}
          value={fullName}
          editing={isEditing}
          onChange={setFullName}
        />

        <ProfileField
          label="Username"
          icon={<AtSign size={16} />}
          value={username}
          editing={isEditing}
          onChange={setUsername}
          prefix="@"
        />

        <div className="sm:col-span-2">
          <ProfileField
            label="Email Address"
            icon={<Mail size={16} />}
            value={email}
            editing={isEditing}
            onChange={setEmail}
            type="email"
          />

          <p className="mt-1.5 text-xs text-[#969E99]">
            Your email address is used for account communication.
          </p>
        </div>

        <ProfileField
          label="Location"
          icon={<MapPin size={16} />}
          value={location}
          editing={isEditing}
          onChange={setLocation}
          placeholder="e.g. Pune, India"
        />

        <ProfileField
          label="Website"
          icon={<Globe size={16} />}
          value={website}
          editing={isEditing}
          onChange={setWebsite}
          placeholder="https://example.com"
        />

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#36413B]">
            Bio
          </label>

          {isEditing ? (
            <>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                rows={4}
                placeholder="Tell the RecipeCraft community a little about yourself..."
                className="w-full resize-none rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] px-4 py-3 text-sm text-[#36413B] outline-none transition focus:border-[#C8501A] focus:ring-2 focus:ring-[#C8501A]/10"
              />

              <p className="mt-1 text-right text-xs text-[#969E99]">
                {bio.length}/300
              </p>
            </>
          ) : (
            <div className="rounded-xl bg-[#FAF8F4] px-4 py-3 text-sm leading-6 text-[#5F6963]">
              {bio || "No bio added yet."}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

interface ProfileFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: string;
}

function ProfileField({
  label,
  icon,
  value,
  editing,
  onChange,
  type = "text",
  placeholder,
  prefix,
}: ProfileFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#36413B]">
        {label}
      </label>

      {editing ? (
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B948E]">
            {icon}
          </div>

          {prefix && (
            <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-[#8B948E]">
              {prefix}
            </span>
          )}

          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full rounded-xl border border-[#E4DDD4] bg-[#FFFEFC] py-3 pr-4 text-sm text-[#36413B] outline-none transition focus:border-[#C8501A] focus:ring-2 focus:ring-[#C8501A]/10 ${
              prefix ? "pl-14" : "pl-10"
            }`}
          />
        </div>
      ) : (
        <div className="flex min-h-[46px] items-center gap-3 rounded-xl bg-[#FAF8F4] px-4 text-sm text-[#536059]">
          <span className="text-[#8B948E]">{icon}</span>

          {prefix && (
            <span className="text-[#8B948E]">{prefix}</span>
          )}

          <span className="truncate">
            {value || "Not provided"}
          </span>
        </div>
      )}
    </div>
  );
}