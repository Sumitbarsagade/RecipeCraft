import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

import ProfileHeader from "../../components/dashboard/profile/ProfileHeader";
import ProfileAvatar from "../../components/dashboard/profile/ProfileAvatar";
import ProfileInformation from "../../components/dashboard/profile/ProfileInformation";
import ProfileStats from "../../components/dashboard/profile/ProfileStats";

import type { UserProfile } from "../../types/user.types";

const initialProfile: UserProfile = {
  id: "user-001",
  fullName: "Sumit Barsagade",
  username: "sumit",
  email: "sumit@example.com",
  bio: "Food enthusiast who loves discovering and creating delicious recipes.",
  profileImage: "",
  location: "Pune, India",
  website: "",

  stats: {
    recipesPublished: 24,
    savedRecipes: 86,
    followers: 124,
  },
};

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<UserProfile>(initialProfile);

  const [isEditing, setIsEditing] =
    useState(false);

  const updateProfile = (
    field: keyof UserProfile,
    value: string
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated profile:", profile);

    // Later:
    // PUT /api/users/profile

    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-6xl">

        <ProfileHeader
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={handleCancel}
        />

        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">

          {/* Left */}
          <div>
            <ProfileAvatar
              image={profile.profileImage}
              isEditing={isEditing}
              onImageChange={(image) =>
                updateProfile(
                  "profileImage",
                  image
                )
              }
            />
          </div>

          {/* Right */}
          <div>
            <ProfileInformation
              isEditing={isEditing}

              fullName={profile.fullName}
              username={profile.username}
              email={profile.email}
              bio={profile.bio}
              location={profile.location}
              website={profile.website}

              setFullName={(value) =>
                updateProfile(
                  "fullName",
                  value
                )
              }

              setUsername={(value) =>
                updateProfile(
                  "username",
                  value
                )
              }

              setEmail={(value) =>
                updateProfile(
                  "email",
                  value
                )
              }

              setBio={(value) =>
                updateProfile(
                  "bio",
                  value
                )
              }

              setLocation={(value) =>
                updateProfile(
                  "location",
                  value
                )
              }

              setWebsite={(value) =>
                updateProfile(
                  "website",
                  value
                )
              }
            />

            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex justify-end"
              >
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#C8501A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A94314]"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </motion.div>
            )}
          </div>

        </div>

        <ProfileStats
          recipesPublished={
            profile.stats.recipesPublished
          }
          savedRecipes={
            profile.stats.savedRecipes
          }
          followers={profile.stats.followers}
        />

      </div>
    </div>
  );
}