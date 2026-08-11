export type RecipeStatus = "published" | "draft";

export interface DashboardRecipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  status: RecipeStatus;
  views: number;
  createdAt: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating?: number;
}

export const dashboardRecipes: DashboardRecipe[] = [
  {
    id: "1",
    title: "Creamy Garlic Pasta",
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    category: "Dinner",
    status: "published",
    views: 2480,
    createdAt: "2026-08-01",
    cookTime: "25 min",
    difficulty: "Easy",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Classic Margherita Pizza",
    description:
      "Crispy homemade pizza topped with tomato, mozzarella and basil.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
    category: "Dinner",
    status: "published",
    views: 1890,
    createdAt: "2026-07-28",
    cookTime: "40 min",
    difficulty: "Medium",
    rating: 4.7,
  },
  {
    id: "3",
    title: "Avocado Breakfast Toast",
    description:
      "Simple and healthy avocado toast perfect for a quick breakfast.",
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=80",
    category: "Breakfast",
    status: "draft",
    views: 0,
    createdAt: "2026-07-25",
    cookTime: "10 min",
    difficulty: "Easy",
  },
  {
    id: "4",
    title: "Chocolate Lava Cake",
    description:
      "A decadent chocolate dessert with a warm molten center.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    category: "Dessert",
    status: "published",
    views: 3250,
    createdAt: "2026-07-20",
    cookTime: "30 min",
    difficulty: "Medium",
    rating: 4.9,
  },
  {
    id: "5",
    title: "Thai Green Curry",
    description:
      "Fragrant Thai curry packed with vegetables and aromatic spices.",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80",
    category: "Lunch",
    status: "draft",
    views: 0,
    createdAt: "2026-07-18",
    cookTime: "35 min",
    difficulty: "Medium",
  },
  {
    id: "6",
    title: "Berry Pancake Stack",
    description:
      "Fluffy pancakes served with fresh berries and maple syrup.",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
    category: "Breakfast",
    status: "published",
    views: 1560,
    createdAt: "2026-07-15",
    cookTime: "20 min",
    difficulty: "Easy",
    rating: 4.6,
  },
];