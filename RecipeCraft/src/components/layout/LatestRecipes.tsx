import RecipeCard from "../common/RecipeCard";
import SectionHeader from "../common/SectionHeader";

const recipes = [...Array(8)].map((_, i) => ({
  title: `Recipe ${i + 1}`,
  image: `/recipes/${i + 1}.jpg`,
  rating: 4.8,
  time: "30 mins",
  likes: "2.5K",
}));

export default function LatestRecipes() {
  return (
    <section className="bg-[#FFFDF9] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          title="Latest Recipes"
          subtitle="Fresh recipes added every day."
          buttonText="View All"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.title} {...recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}