import { Search } from "lucide-react";

const categories = [
  "Breakfast",
  "Indian",
  "Italian",
  "Healthy",
  "Desserts",
  "Vegan",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF9] pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left */}

        <div>

          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#C8501A]">
            🍴 Trusted by 25,000+ Food Lovers
          </span>

          <h1 className="mt-8 font-serif text-5xl font-bold leading-tight text-gray-900 lg:text-7xl">
            Discover
            <span className="text-[#C8501A]"> Delicious </span>
            Recipes
            <br />
            From Around the World
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Explore thousands of carefully curated recipes shared by passionate
            home cooks and professional chefs. Save your favorites, create your
            own cookbook, and cook with confidence.
          </p>

          {/* Search */}

          <div className="mt-10 flex overflow-hidden rounded-full bg-white shadow-xl">

            <input
              className="flex-1 px-6 py-5 outline-none"
              placeholder="Search recipes, ingredients..."
            />

            <button className="flex items-center gap-2 bg-[#C8501A] px-8 text-white transition hover:bg-[#A63F13]">
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Categories */}

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                className="rounded-full border px-5 py-2 transition hover:border-[#C8501A] hover:bg-[#C8501A] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Stats */}

          <div className="mt-12 flex gap-10">
            <div>
              <h2 className="text-3xl font-bold text-[#C8501A]">25K+</h2>
              <p className="text-gray-600">Recipes</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#C8501A]">8K+</h2>
              <p className="text-gray-600">Chefs</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#C8501A]">150K+</h2>
              <p className="text-gray-600">Food Lovers</p>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="relative hidden lg:block">

          <img
            src="/hero-image.jpg"
            alt="Recipe Hero"
            className="rounded-[40px] shadow-2xl"
          />

          <div className="absolute -left-10 top-16 rounded-3xl bg-white p-6 shadow-xl">
            <p className="text-sm text-gray-500">Today's Special</p>
            <h3 className="mt-2 text-xl font-bold">
              Creamy Garlic Pasta
            </h3>
            <p className="mt-1 text-orange-600">★★★★★ 4.9</p>
          </div>

          <div className="absolute -right-10 bottom-20 rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-4xl font-bold text-[#C8501A]">12K+</h3>
            <p className="text-gray-500">Recipes Added</p>
          </div>

        </div>
      </div>

      {/* Background Decoration */}

      <div className="absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-orange-100 blur-3xl opacity-40" />
    </section>
  );
}