export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  profileImage: string;
  location: string;
  website: string;

  stats: {
    recipesPublished: number;
    savedRecipes: number;
    followers: number;
  };
}