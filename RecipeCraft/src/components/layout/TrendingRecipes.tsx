import RecipeCard from "../common/RecipeCard";
import SectionHeader from "../common/SectionHeader";

const recipes = [
  {
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    rating: 4.9,
    time: "25 mins",
    likes: "2.4K",
  },
  {
    title: "Butter Chicken",
    image: "/recipes/chicken.jpg",
    rating: 4.8,
    time: "40 mins",
    likes: "5.2K",
  },
  {
    title: "Veg Pizza",
    image: "/recipes/pizza.jpg",
    rating: 4.7,
    time: "30 mins",
    likes: "3.9K",
  },
  {
    title: "Chocolate Brownie",
    image: "/recipes/brownie.jpg",
    rating: 5,
    time: "45 mins",
    likes: "7.1K",
  },
];

export default function TrendingRecipes() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          title="Trending Recipes"
          subtitle="Most loved recipes this week."
          buttonText="Explore"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.title}
              {...recipe}
            />
          ))}
        </div>

      </div>
    </section>
  );
}