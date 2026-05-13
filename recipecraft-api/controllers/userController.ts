

const User = require("../models/User");
const Recipe = require("../models/Recipe");
const bcrypt = require("bcryptjs");

interface Response{ status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; count?: any; user?:string; message?: any; recipesCount?:number; recipes?: any; following?:any; followers?:any }): any; new(): any; }; };}

interface Request {body:{username:string; email:string; bio:string; profileImage:any;}}

// GET USER PROFILE
const getProfile = async (req:{params: any}, res:Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-password")
      .populate("followers", "username email profileImage")
      .populate("following", "username email profileImage");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const recipesCount = await Recipe.countDocuments({
      author: id,
    });

    return res.status(200).json({
      success: true,
      user,
      recipesCount,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req: Request , res: Response) => {
  try {
    const userId = (req as any).user.id;

    const {
      username,
      email,
      bio,
      profileImage,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check username uniqueness
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });

      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      user.username = username;
    }

    // Check email uniqueness
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    if (bio) user.bio = bio;
    if (profileImage) user.profileImage = profileImage;

    

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PROFILE
const deleteProfile = async (req: {user: {id:string}}, res:Response) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete user's recipes
    await Recipe.deleteMany({ author: userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USERNAME
const getUserName = async (req:{params: any}, res: Response) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select(
      "username email bio profileImage followers following"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// FOLLOW / UNFOLLOW USER
const followUserById = async (req:{params: any}, res: Response) => {
  try {
    const currentUserId = (req as any).user.id;
    const { id } = req.params;

    if (currentUserId === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "Target user not found",
      });
    }

    const alreadyFollowing = currentUser.following.includes(id);

    if (alreadyFollowing) {
      // UNFOLLOW
      currentUser.following = currentUser.following.filter(
        (userId: any) => userId.toString() !== id
      );

      targetUser.followers = targetUser.followers.filter(
        (userId: any) => userId.toString() !== currentUserId
      );

      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({
        success: true,
        message: "User unfollowed",
      });
    }

    // FOLLOW
    currentUser.following.push(id);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET FOLLOWERS
const getFollowersById = async (req:{params: any}, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate("followers", "username email profileImage")
      .select("followers");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      followers: user.followers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET FOLLOWING
const getFollowingById = async (req:{params:any}, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate("following", "username email profileImage")
      .select("following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      following: user.following,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SAVED RECIPES
const getSavedRecipes = async (req:{user: {id:string}}, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findById(userId).populate({
      path: "savedRecipes",
      populate: {
        path: "author",
        select: "username profileImage",
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      recipes: user.savedRecipes,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
  getFollowersById,
  getFollowingById,
  getUserName,
  followUserById,
  getSavedRecipes,
};