import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#26463B] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-3xl leading-none">•</span>
            <h1 className="text-2xl font-bold">RecipeCraft</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-orange-400 transition">
              Browse
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              Trending
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              Chefs
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition">
              Sign in
            </button>

            <button className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 transition">
              Get started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:text-orange-400">
              Browse
            </a>
            <a href="#" className="hover:text-orange-400">
              Trending
            </a>
            <a href="#" className="hover:text-orange-400">
              Chefs
            </a>

            <button className="w-full rounded-md bg-slate-700 py-2 hover:bg-slate-600">
              Sign in
            </button>

            <button className="w-full rounded-md bg-orange-500 py-2 hover:bg-orange-600">
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

