import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  slug: string;
  description?: string;
  author: mongoose.Types.ObjectId;
  coverImage?: string;
  ingredients: object;
  step: object;
  category: 'appetizer' | 'snack' | 'breakfast' | 'main course' | 'dessert' | 'beverage' | 'other';
  cuisine?: 'Italian' | 'Mexican' | 'Chinese' | 'American' | 'French' | 'Indian' | 'other';
  tags: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  likes: mongoose.Types.ObjectId[];
  isPublished: boolean;
  views: number;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverImage: {
      type: String,
    },
    ingredients: {
      type: Schema.Types.Mixed,
      required: true,
    },
    step: {
      type: Schema.Types.Mixed,
    },
    category: {
      type: String,
      required: true,
      enum: ['appetizer', 'snack', 'breakfast', 'main course', 'dessert', 'beverage', 'other'],
    },
    cuisine: {
      type: String,
      enum: ['Italian', 'Mexican', 'Chinese', 'American', 'French', 'Indian', 'other'],
    },
    tags: {
      type: [String],
      default: [],
    },
    prepTime: {
      type: Number,
    },
    cookTime: {
      type: Number,
    },
    servings: {
      type: Number,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
