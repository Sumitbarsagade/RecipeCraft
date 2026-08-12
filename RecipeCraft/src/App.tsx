import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './components/dashboard/ProfilePage'
import SaveRecipesPage from './pages/SavedRecipesPage'
import SearchPage from './pages/SearchPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import DashboardPage from './pages/dashboard/DashboardHomePage'
import EditRecipePage from './pages/dashboard/EditRecipePage'
import NotFoundPage from './pages/NotFoundPage'
import SignupPage from './pages/SignupPage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailsPage from './pages/RecipeDetailPage'
import DashboardLayout from './components/layout/DashboardLayout'
import PublicLayout from './components/layout/PublicLayout'
import DashboardHomePage from './pages/dashboard/DashboardHomePage'
import DashboardRecipesPage from './pages/dashboard/DashboardRecipesPage'
import CreateRecipePage from './pages/dashboard/CreateRecipePage'


const App =()=>{
  return (
    <BrowserRouter>
      {/* ================================
          PUBLIC WEBSITE
      ================================= */}
      <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<ProfilePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="/about" element={<SaveRecipesPage />} />
        <Route path="/about" element={<SearchPage />} />
        <Route path="/about" element={<VerifyEmailPage />} />
        <Route path="/about" element={<NotFoundPage/>} />
      </Route>
  

      {/* ================================
          DASHBOARD
      ================================= */}

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route
          path="/dashboard/profile"
          element={<ProfilePage />}
        />

        {/* <Route
          path="/dashboard/recipes"
          element={<MyRecipesPage />}
        />

        <Route
          path="/dashboard/recipes/new"
          element={<CreateRecipePage />}
        /> */}

        <Route
          path="/dashboard/recipes/:id/edit"
          element={<EditRecipePage />}
        />

         <Route
          index
          element={<DashboardHomePage />}
        />

        <Route
          path="recipes"
          element={<DashboardRecipesPage />}
        />

              <Route
          path="/dashboard/recipes/new"
          element={<CreateRecipePage />}
        />
      
        {/* <Route
          path="/dashboard/analytics"
          element={<AnalyticsPage />}
        /> */}
        </Route>
        </Routes>



    </BrowserRouter>
  )
}

export default App