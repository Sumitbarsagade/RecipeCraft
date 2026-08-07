export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface IngredientGroup {
  title: string;
  ingredients: Ingredient[];
}

export interface InstructionStep {
  id: number;
  title: string;
  description: string;
  duration?: string;
}

export interface RecipeDetail {
  id: number;

  title: string;

  image: string;

  category: string;

  cuisine: string;

  description: string;

  chef: {
    name: string;
    avatar?: string;
    role?: string;
  };

  rating: number;

  reviewCount: number;

  prepTime: string;

  cookTime: string;

  totalTime: string;

  servings: number;

  difficulty: "Easy" | "Medium" | "Hard";

  calories?: number;

  tags: string[];

  ingredientGroups: IngredientGroup[];

  instructions: InstructionStep[];
}

export const recipeDetails: RecipeDetail = {
  id: 1,

  title: "Creamy Garlic Pasta",

  image:
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=85",

  category: "Dinner",

  cuisine: "Italian",

  description:
    "A rich and comforting creamy garlic pasta made with parmesan, fresh garlic, herbs, and silky cream. This quick and satisfying dinner comes together in just 25 minutes.",

  chef: {
    name: "Maria Rossi",

    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",

    role: "Home Chef",
  },

  rating: 4.9,

  reviewCount: 248,

  prepTime: "10 min",

  cookTime: "15 min",

  totalTime: "25 min",

  servings: 4,

  difficulty: "Easy",

  calories: 520,

  tags: [
    "Italian",
    "Pasta",
    "Quick",
    "Dinner",
    "Comfort Food",
  ],

  ingredientGroups: [
    {
      title: "For the Pasta",

      ingredients: [
        {
          id: 1,
          name: "Spaghetti",
          quantity: 200,
          unit: "g",
        },
        {
          id: 2,
          name: "Salt",
          quantity: 1,
          unit: "tsp",
        },
      ],
    },

    {
      title: "For the Creamy Sauce",

      ingredients: [
        {
          id: 3,
          name: "Olive oil",
          quantity: 1,
          unit: "tbsp",
        },
        {
          id: 4,
          name: "Garlic cloves",
          quantity: 3,
          unit: "cloves",
        },
        {
          id: 5,
          name: "Heavy cream",
          quantity: 200,
          unit: "ml",
        },
        {
          id: 6,
          name: "Parmesan cheese",
          quantity: 60,
          unit: "g",
        },
        {
          id: 7,
          name: "Black pepper",
          quantity: 0.5,
          unit: "tsp",
        },
      ],
    },

    {
      title: "For Garnishing",

      ingredients: [
        {
          id: 8,
          name: "Fresh basil",
          quantity: 8,
          unit: "leaves",
        },
        {
          id: 9,
          name: "Parmesan cheese",
          quantity: 15,
          unit: "g",
        },
      ],
    },
  ],

  instructions: [
    {
      id: 1,

      title: "Cook the pasta",

      description:
        "Bring a large pot of generously salted water to a boil. Add the spaghetti and cook until al dente according to the package instructions. Reserve about half a cup of pasta water before draining.",

      duration: "8–10 min",
    },

    {
      id: 2,

      title: "Prepare the garlic",

      description:
        "While the pasta cooks, heat olive oil in a large skillet over medium heat. Add the minced garlic and gently cook until fragrant and lightly golden. Be careful not to burn the garlic.",

      duration: "2 min",
    },

    {
      id: 3,

      title: "Make the creamy sauce",

      description:
        "Reduce the heat and pour the heavy cream into the skillet. Stir gently and allow the sauce to simmer for a few minutes until it starts to thicken.",

      duration: "3–4 min",
    },

    {
      id: 4,

      title: "Add parmesan",

      description:
        "Add freshly grated parmesan cheese and black pepper. Stir continuously until the cheese melts and the sauce becomes smooth and creamy.",

      duration: "2 min",
    },

    {
      id: 5,

      title: "Combine everything",

      description:
        "Add the drained pasta to the skillet and toss until every strand is coated with the creamy sauce. Add a splash of reserved pasta water if the sauce is too thick.",

      duration: "1–2 min",
    },

    {
      id: 6,

      title: "Garnish and serve",

      description:
        "Transfer the pasta to serving plates. Finish with fresh basil, freshly grated parmesan and a little cracked black pepper. Serve immediately.",

      duration: "1 min",
    },
  ],
};