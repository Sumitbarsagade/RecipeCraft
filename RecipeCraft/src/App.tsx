import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import ResetPassowrdPage from './pages/ResetPasswordPage'
import SaveRecipesPage from './pages/SavedRecipesPage'
import SearchPage from './pages/SearchPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import DashboardPage from './pages/DashboardPage'
import EditRecipePage from './pages/EditRecipePage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SignupPage from './pages/SignupPage'


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<ProfilePage />} />
        <Route path="/about" element={<RecipeDetailPage />} />
        <Route path="/about" element={<ResetPassowrdPage />} />
        <Route path="/about" element={<SaveRecipesPage />} />
        <Route path="/about" element={<SearchPage />} />
        <Route path="/about" element={<VerifyEmailPage />} />
        <Route path="/about" element={<DashboardPage/>} />
        <Route path="/about" element={<EditRecipePage />} />
        <Route path="/about" element={<NotFoundPage/>} />
      </Routes>
      <Footer/>
</BrowserRouter>
  )
}

export default App
