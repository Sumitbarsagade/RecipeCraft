import { Menu, Search, User, Heart } from "lucide-react";
import { useState } from "react";
import UserProfile from "../common/UserProfile";

const navLinks = [
  "Home",
  "Recipes",
  "Categories",
  "Trending",
  "Community",
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isloggedIn, setloggedIn]  = useState(true);
   console.log(isloggedIn);
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍳</span>

          <div>
            <a href="/" >
              <h1 className="font-serif text-2xl font-bold text-[#C8501A]">
                RecipeCraft
              </h1>
            </a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 md:flex items-start">
          {/* {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="font-medium text-gray-700 transition hover:text-[#C8501A]"
            >
              {item}
            </a>
          ))} */}

          <a
            href="/"
            className="font-medium text-gray-700 transition hover:text-[#C8501A]"
          >
            Home
          </a>


          <a
            href="/recipes"
            className="font-medium text-gray-700 transition hover:text-[#C8501A]"
          >
            Recipes
          </a>


          <a
            href="/chefs"
            className="font-medium text-gray-700 transition hover:text-[#C8501A]"
          >
            Chefs
          </a>

         

       

        </nav>

        {/* Search */}
        <div className="hidden lg:flex">
          <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
            <Search size={18} />
            <input
              className="ml-2 bg-transparent outline-none"
              placeholder="Search recipes..."
            />
          </div>
        </div>

        {/* Right */}
        <div className="hidden items-center gap-5 md:flex">
          <Heart
            className="cursor-pointer transition hover:text-red-500"
            size={22}
          />

          <User
            className="cursor-pointer transition hover:text-[#C8501A]"
            size={22}
          />

          <button className="rounded-full bg-[#C8501A] px-5 py-2 text-white transition hover:bg-[#A63F13]">
            {isloggedIn ?  <UserProfile />: <a href="/login">  Sign In </a>}
            
            
          </button>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t bg-white md:hidden">
          {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-6 py-4 hover:bg-orange-50"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}