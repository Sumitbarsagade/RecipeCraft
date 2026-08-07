export interface Recipe {
  id: number;
  title: string;
  image: string;
  chef: string;
  chefAvatar?: string;

  category: string;

  difficulty: "Easy" | "Medium" | "Hard";

  rating: number;
  reviewCount?: number;

  time: string;
  saves: number;

  description?: string;
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },

  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },

  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },

  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },


  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },


  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },


  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },


  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },


  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },

  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "/recipes/pasta.jpg",
    chef: "Maria Rossi",
    chefAvatar: "/chefs/maria.jpg",
    category: "Italian",
    difficulty: "Easy",
    rating: 4.8,
    reviewCount: 124,
    time: "25 min",
    saves: 2500,
    description:
      "A rich and creamy pasta with garlic, parmesan and fresh herbs.",
  },
  

  {
    id: 2,
    title: "Butter Chicken",
    image: "/recipes/butter-chicken.jpg",
    chef: "Rahul Sharma",
    chefAvatar: "/chefs/rahul.jpg",
    category: "Indian",
    difficulty: "Medium",
    rating: 4.9,
    reviewCount: 218,
    time: "45 min",
    saves: 4100,
    description:
      "Tender chicken simmered in a rich, buttery tomato sauce.",
  },

  {
    id: 3,
    title: "Healthy Buddha Bowl",
    image: "/recipes/bowl.jpg",
    chef: "Emma Wilson",
    chefAvatar: "/chefs/emma.jpg",
    category: "Healthy",
    difficulty: "Easy",
    rating: 4.7,
    reviewCount: 96,
    time: "20 min",
    saves: 1800,
    description:
      "A colorful bowl packed with vegetables, grains and fresh flavors.",
  },
];