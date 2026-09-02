import CategoryCard from "../common/CategoryCard";
import SectionHeader from "../common/SectionHeader";

const categories = [
  {
    title: "Italian",
    image: "/categories/italian.jpg",
    recipes: 320,
  },
  {
    title: "Indian",
    image: "/categories/indian.jpg",
    recipes: 480,
  },
  {
    title: "Healthy",
    image: "/categories/healthy.jpg",
    recipes: 210,
  },
  {
    title: "Desserts",
    image: "/categories/dessert.jpg",
    recipes: 280,
  },
];

export default function PopularCategories() {
  return (
    <section id="categories" className="bg-[#FFFDF9] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          title="Popular Categories"
          subtitle="Browse recipes by your favorite cuisine."
          buttonText="View All"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              {...category}
            />
          ))}
        </div>

      </div>
    </section>
  );
}