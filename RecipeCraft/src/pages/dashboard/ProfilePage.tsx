import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { toast } from "sonner";

import ProfileHeader
  from "../../components/dashboard/profile/ProfileHeader";

import ProfileAvatar
  from "../../components/dashboard/profile/ProfileAvatar";

import ProfileInformation
  from "../../components/dashboard/profile/ProfileInformation";

import ProfileStats
  from "../../components/dashboard/profile/ProfileStats";

import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";

import {
  fetchUserProfile,
  updateUserProfile,
} from "../../features/user/userSlice";

import type {
  UpdateUserProfileRequest,
} from "../../features/user/userTypes";

import type { User }
  from "../../types/user.types";


const recipeStats = {
  recipesPublished: 24,
  savedRecipes: 86,
  followers: 124,
};


export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const {
    profile: user,
    isLoading,
    isUpdating,
    error,
  } = useAppSelector(
    (state) => state.user
  );

  /*
   * Local editable copy.
   *
   * Redux user = saved server data
   * profile = temporary form data
   */
  const [profile, setProfile] =
    useState<User | null>(null);

  const [isEditing, setIsEditing] =
    useState(false);


  /* =========================================================
     FETCH PROFILE
  ========================================================= */

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);


  /* =========================================================
     SYNC SERVER/REDUX USER → LOCAL FORM
  ========================================================= */

  useEffect(() => {
    if (user && !isEditing) {
      setProfile(user);
    }
  }, [user, isEditing]);


  /* =========================================================
     UPDATE LOCAL FORM
  ========================================================= */

  const updateProfile = (
    field: keyof User,
    value: string
  ) => {
    setProfile((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [field]: value,
      };
    });
  };


  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = () => {
    if (!user) {
      return;
    }

    // Start editing from latest saved data
    setProfile({
      ...user,
    });

    setIsEditing(true);
  };


  /* =========================================================
     CANCEL / DISCARD
  ========================================================= */

  const handleCancel = () => {
    if (user) {
      // Restore last saved server data
      setProfile({
        ...user,
      });
    }

    setIsEditing(false);
  };


  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = async () => {
    if (!profile) {
      return;
    }

    const updateData:
      UpdateUserProfileRequest = {
        fullName:
          profile.fullName?.trim(),

        username:
          profile.username.trim(),

        bio:
          profile.bio?.trim(),

        profileImage:
          profile.profileImage,

        location:
          profile.location?.trim(),

        website:
          profile.website?.trim(),
      };

    try {
      const updatedUser =
        await dispatch(
          updateUserProfile(updateData)
        ).unwrap();

      /*
       * Redux has already been updated by
       * updateUserProfile.fulfilled.
       *
       * Keep local state synchronized too.
       */
      setProfile(updatedUser);

      setIsEditing(false);

      toast.success(
        "Profile updated successfully."
      );
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Unable to update profile."
      );
    }
  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading && !profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-[#737C76]">
          Loading profile...
        </p>
      </div>
    );
  }


  /* =========================================================
     ERROR
  ========================================================= */

  if (error && !profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(
                fetchUserProfile()
              )
            }
            className="mt-4 rounded-xl bg-[#C8501A] px-4 py-2 text-sm font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  if (!profile) {
    return null;
  }


  return (
    <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-6xl">

        {/* =============================
            HEADER
        ============================== */}

        <ProfileHeader
          isEditing={isEditing}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />


        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">

          {/* =============================
              AVATAR
          ============================== */}

          <div>
            <ProfileAvatar
              image={
                profile.profileImage
              }
              isEditing={
                isEditing
              }
              onImageChange={(image) =>
                updateProfile(
                  "profileImage",
                  image
                )
              }
            />
          </div>


          {/* =============================
              PROFILE INFORMATION
          ============================== */}

          <div>

            <ProfileInformation
              isEditing={isEditing}

              fullName={
                profile.fullName
              }

              username={
                profile.username
              }

              email={
                profile.email
              }

              bio={
                profile.bio
              }

              location={
                profile.location
              }

              website={
                profile.website
              }

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


            {/* =============================
                SAVE
            ============================== */}

            {isEditing && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-5 flex justify-end"
              >
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#C8501A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A94314] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} />

                  {isUpdating
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </motion.div>
            )}

          </div>

        </div>


        {/* =============================
            STATS
        ============================== */}

        <ProfileStats
          recipesPublished={
            recipeStats.recipesPublished
          }
          savedRecipes={
            recipeStats.savedRecipes
          }
          followers={
            profile.followers?.length ??
            recipeStats.followers
          }
        />

      </div>

    </div>
  );
}