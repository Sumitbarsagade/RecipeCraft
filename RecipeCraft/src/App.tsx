import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import RecipesPage from "./pages/recipes/RecipesPage";
import RecipeDetailsPage from "./pages/recipes/RecipeDetailPage";
import SaveRecipesPage from "./pages/recipes/SavedRecipesPage";
import SearchPage from "./pages/SearchPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import NotFoundPage from "./pages/NotFoundPage";

// Dashboard pages
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import DashboardRecipesPage from "./pages/dashboard/DashboardRecipesPage";
import CreateRecipePage from "./pages/dashboard/CreateRecipePage";
import EditRecipePage from "./pages/dashboard/EditRecipePage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";

// Layouts
import DashboardLayout from "./components/layout/DashboardLayout";
import PublicLayout from "./components/layout/PublicLayout";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            PUBLIC WEBSITE
        ========================================= */}

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<Navigate to="/home" replace />}
          />

          <Route
            path="/home"
            element={<HomePage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />

          <Route
            path="/recipes"
            element={<RecipesPage />}
          />

          <Route
            path="/recipes/:id"
            element={<RecipeDetailsPage />}
          />

          <Route
            path="/saved-recipes"
            element={<SaveRecipesPage />}
          />

          <Route
            path="/search"
            element={<SearchPage />}
          />

          <Route
            path="/verify-email"
            element={<VerifyEmailPage />}
          />

        </Route>


        {/* =========================================
            DASHBOARD
        ========================================= */}

        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >

          {/* /dashboard */}
          <Route
            index
            element={<DashboardHomePage />}
          />

          {/* /dashboard/profile */}
          <Route
            path="profile"
            element={<ProfilePage />}
          />

          {/* /dashboard/recipes */}
          <Route
            path="recipes"
            element={<DashboardRecipesPage />}
          />

          {/* /dashboard/recipes/new */}
          <Route
            path="recipes/new"
            element={<CreateRecipePage />}
          />

          {/* /dashboard/recipes/:id/edit */}
          <Route
            path="recipes/:id/edit"
            element={<EditRecipePage />}
          />

          <Route
              path="analytics"
              element={<AnalyticsPage />}
            />

        </Route>


        
       


          

        {/* =========================================
            404
        ========================================= */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;