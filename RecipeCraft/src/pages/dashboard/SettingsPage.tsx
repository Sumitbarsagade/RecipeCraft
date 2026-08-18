import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

import SettingsSidebar from "../../components/dashboard/settings/SettingsSidebar";
import SettingsSection from "../../components/dashboard/settings/SettingsSection";
import SettingsToggle from "../../components/dashboard/settings/SettingsToggle";
import SettingsSelect from "../../components/dashboard/settings/SettingsSelect";
import DangerZone from "../../components/dashboard/settings/DangerZone";

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState("account");

  // Account
  const [email, setEmail] =
    useState("sumit@example.com");

  // Notifications
  const [recipeLikes, setRecipeLikes] =
    useState(true);

  const [recipeSaves, setRecipeSaves] =
    useState(true);

  const [recipeComments, setRecipeComments] =
    useState(true);

  const [newFollowers, setNewFollowers] =
    useState(true);

  // Appearance
  const [theme, setTheme] =
    useState("Light");

  // Recipe preferences
  const [visibility, setVisibility] =
    useState("Public");

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [measurement, setMeasurement] =
    useState("Metric");

  const [temperature, setTemperature] =
    useState("Celsius");

  // Privacy
  const [profileVisibility, setProfileVisibility] =
    useState(true);

  const [activityVisibility, setActivityVisibility] =
    useState(false);

  const handleDeleteAccount = () => {
    // Phase 1:
    // We'll add the confirmation modal in the next step.
    console.log("Delete account requested");
  };

  return (
     <div className="min-h-screen bg-[#FAF9F6]">
      {/* Page container */}
      <div className="mx-auto w-full my-2 max-w-7xl px-4  sm:pt-12  lg-pt-24  sm:px-2 sm:m-0  lg:pt-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-2"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8501A] text-white">
              <SettingsIcon size={23} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#C8501A]">
                Account Preferences
              </p>

              <h1 className="font-serif text-3xl font-bold text-[#1F2D27]">
                Settings
              </h1>

              <p className="mt-1 text-sm text-[#737D77]">
                Manage your RecipeCraft account and preferences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mobile section selector */}
        

        <div className="w-full lg:flex gap-2">

          {/* Settings navigation */}
          <SettingsSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Content */}
          <main className="mt-5 w-full lg:mt-0 flex ">

            {/* Account */}
            {activeSection === "account" && (
              <SettingsSection
                title="Account"
                description="Manage your basic account information."
              >
                <div className="px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#354139]">
                        Email Address
                      </h3>

                      <p className="mt-1 text-xs text-[#8A938D]">
                        Used for login and important account
                        notifications.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:items-end">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        className="w-full rounded-xl border border-[#E3DDD5] bg-[#FFFEFC] px-4 py-2.5 text-sm text-[#455049] outline-none focus:border-[#C8501A] sm:w-64"
                      />

                      <span className="text-xs font-medium text-green-600">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                </div>
              </SettingsSection>
            )}

            {/* Password */}
            {activeSection === "password" && (
              <SettingsSection
                title="Password & Security"
                description="Keep your RecipeCraft account secure."
              >
                <div className="px-5 py-6 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#354139]">
                        Password
                      </h3>

                      <p className="mt-1 text-xs text-[#8A938D]">
                        Change your password regularly to keep
                        your account secure.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="rounded-xl border border-[#DDD5CB] px-4 py-2.5 text-sm font-semibold text-[#536059] transition hover:bg-[#FAF7F3]"
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                <SettingsToggle
                  title="Login notifications"
                  description="Receive a notification when your account is accessed from a new device."
                  enabled={true}
                  onChange={() => {}}
                />

                <SettingsToggle
                  title="Two-factor authentication"
                  description="Add an additional layer of security to your account."
                  enabled={false}
                  onChange={() => {}}
                />
              </SettingsSection>
            )}

            {/* Connected accounts */}
            {activeSection === "connected" && (
              <SettingsSection
                title="Connected Accounts"
                description="Manage external accounts connected to RecipeCraft."
              >
                <div className="flex items-center justify-between px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8E1D8] bg-white font-bold text-[#4285F4]">
                      G
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#354139]">
                        Google
                      </h3>

                      <p className="mt-1 text-xs text-green-600">
                        Connected
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl border border-[#DDD5CB] px-4 py-2 text-sm font-semibold text-[#536059] hover:bg-[#FAF7F3]"
                  >
                    Manage
                  </button>
                </div>
              </SettingsSection>
            )}

            {/* Notifications */}
            {activeSection === "notifications" && (
              <SettingsSection
                title="Notifications"
                description="Choose what activity you want to be notified about."
              >
                <SettingsToggle
                  title="Recipe likes"
                  description="Get notified when someone likes one of your recipes."
                  enabled={recipeLikes}
                  onChange={setRecipeLikes}
                />

                <SettingsToggle
                  title="Recipe saves"
                  description="Get notified when someone saves your recipe."
                  enabled={recipeSaves}
                  onChange={setRecipeSaves}
                />

                <SettingsToggle
                  title="Comments"
                  description="Get notified when someone comments on your recipe."
                  enabled={recipeComments}
                  onChange={setRecipeComments}
                />

                <SettingsToggle
                  title="New followers"
                  description="Get notified when someone starts following you."
                  enabled={newFollowers}
                  onChange={setNewFollowers}
                />
              </SettingsSection>
            )}

            {/* Appearance */}
            {activeSection === "appearance" && (
              <SettingsSection
                title="Appearance"
                description="Customize how RecipeCraft looks for you."
              >
                <SettingsSelect
                  title="Theme"
                  description="Choose how the RecipeCraft interface should appear."
                  value={theme}
                  options={[
                    "Light",
                    "Dark",
                    "System",
                  ]}
                  onChange={setTheme}
                />

                <SettingsToggle
                  title="Reduce animations"
                  description="Reduce interface animations for a calmer experience."
                  enabled={false}
                  onChange={() => {}}
                />
              </SettingsSection>
            )}

            {/* Recipe Preferences */}
            {activeSection === "recipe-preferences" && (
              <SettingsSection
                title="Recipe Preferences"
                description="Set the defaults used when creating recipes."
              >
                <SettingsSelect
                  title="Default visibility"
                  description="Choose who can see newly created recipes."
                  value={visibility}
                  options={[
                    "Public",
                    "Unlisted",
                    "Private",
                  ]}
                  onChange={setVisibility}
                />

                <SettingsSelect
                  title="Default difficulty"
                  description="Default difficulty selected when creating a recipe."
                  value={difficulty}
                  options={[
                    "Easy",
                    "Medium",
                    "Hard",
                  ]}
                  onChange={setDifficulty}
                />

                <SettingsSelect
                  title="Measurement system"
                  description="Choose the measurement system used in recipes."
                  value={measurement}
                  options={[
                    "Metric",
                    "Imperial",
                  ]}
                  onChange={setMeasurement}
                />

                <SettingsSelect
                  title="Temperature unit"
                  description="Choose how cooking temperatures should be displayed."
                  value={temperature}
                  options={[
                    "Celsius",
                    "Fahrenheit",
                  ]}
                  onChange={setTemperature}
                />
              </SettingsSection>
            )}

            {/* Privacy */}
            {activeSection === "privacy" && (
              <SettingsSection
                title="Privacy"
                description="Control what other RecipeCraft users can see."
              >
                <SettingsToggle
                  title="Public profile"
                  description="Allow other users to discover and view your profile."
                  enabled={profileVisibility}
                  onChange={setProfileVisibility}
                />

                <SettingsToggle
                  title="Show activity"
                  description="Allow others to see your recipe likes and saved recipes."
                  enabled={activityVisibility}
                  onChange={setActivityVisibility}
                />
              </SettingsSection>
            )}

            {/* Danger */}
            {activeSection === "danger" && (
              <DangerZone
                onDelete={handleDeleteAccount}
              />
            )}

          </main>
        </div>


      </div>
    </div>
  );
}


