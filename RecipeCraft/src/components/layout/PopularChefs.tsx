import ChefCard from "../common/ChefCard";
import SectionHeader from "../common/SectionHeader";

const chefs = [
  {
    name: "Alex Johnson",
    avatar: "/chefs/chef1.jpg",
    speciality: "Italian Cuisine",
    followers: "22K",
  },
  {
    name: "Emma Wilson",
    avatar: "/chefs/chef2.jpg",
    speciality: "Desserts",
    followers: "18K",
  },
  {
    name: "Rahul Sharma",
    avatar: "/chefs/chef3.jpg",
    speciality: "Indian Food",
    followers: "26K",
  },
  {
    name: "Sophia Lee",
    avatar: "/chefs/chef4.jpg",
    speciality: "Healthy Meals",
    followers: "30K",
  },
];

export default function PopularChefs() {
  return (
    <section className="bg-[#FFFDF9] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          title="Popular Chefs"
          subtitle="Meet our top creators."
          buttonText="View All"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {chefs.map((chef) => (
            <ChefCard key={chef.name} {...chef} />
          ))}
        </div>

      </div>
    </section>
  );
}