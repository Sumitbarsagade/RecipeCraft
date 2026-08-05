export default interface Recipe {
  id: number;
  title: string;
  image: string;
  chef: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  time: string;
  saves: number;
}
export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    time: "25 min",
    saves: 2500,
  },
  {
    id: 2,
    title: "Butter Chicken",
    image: "/recipes/butter-chicken.jpg",
    chef: "Rahul Sharma",
    category: "Indian",
    difficulty: "Medium",
    rating: 4.9,
    time: "45 min",
    saves: 4100,
  },
  {
    id: 3,
    title: "Healthy Buddha Bowl",
    image: "/recipes/bowl.jpg",
    chef: "Emma Wilson",
    category: "Healthy",
    difficulty: "Easy",
    rating: 4.7,
    time: "20 min",
    saves: 1800,
  },
];