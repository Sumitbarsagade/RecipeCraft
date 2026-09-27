import type { Request, Response } from 'express';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import { IUser } from "../models/User";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

// ---------------------------------------------------------------------------
// GET USER PROFILE
// ---------------------------------------------------------------------------



export const getProfile = async (
  req: AuthenticatedRequest ,
  res: Response
): Promise<void> => {
  try {
    const userinfo= req.body.user;

    if (!userinfo._id) {
      res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
      return;
    }

    const user = await User.findById(
      userinfo._id
    ).select("-password -refreshToken");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message:
        "Profile retrieved successfully.",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("getProfile:", error);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ---------------------------------------------------------------------------
// UPDATE PROFILE
// ---------------------------------------------------------------------------

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userinfo= req.body.user;
    if (!userinfo?._id) {
      res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
      return;
    }

    const {
      fullName,
      username,
      bio,
      profileImage,
      location,
      website,
    } = userinfo;

    if (
      username &&
      username !== userinfo.username
    ) {
      const existingUser =
        await User.findOne({
          username,
          _id: { $ne: userinfo._id },
        });

      if (existingUser) {
        res.status(409).json({
          success: false,
          message:
            "Username is already in use.",
        });
        return;
      }
    }

    const updates: Record<
      string,
      string
    > = {};

    if (fullName !== undefined) {
      updates.fullName = fullName;
    }

    if (username !== undefined) {
      updates.username = username;
    }

    if (bio !== undefined) {
      updates.bio = bio;
    }

    if (profileImage !== undefined) {
      updates.profileImage = profileImage;
    }

    if (location !== undefined) {
      updates.location = location;
    }

    if (website !== undefined) {
      updates.website = website;
    }

    const user =
      await User.findByIdAndUpdate(
        req.body.user._id,
        {
          $set: updates,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password -refreshToken");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully.",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(
      "updateProfile:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ---------------------------------------------------------------------------
// DELETE PROFILE
// ---------------------------------------------------------------------------

export const deleteProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userinfo= req.body.user;

    if (!userinfo._id) {
      res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
      return;
    }

    const user =
      await User.findByIdAndDelete(
        userinfo._id
      );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    res.clearCookie(
      "refreshToken",
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Account deleted successfully.",
    });
  } catch (error) {
    console.error(
      "deleteProfile:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
// ---------------------------------------------------------------------------
// GET USER BY USERNAME
// ---------------------------------------------------------------------------

export const getUserByUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select(
      'username email bio avatar followers following'
    );

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};



export const getSavedRecipes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = await req.user?.id;

    const user = await User.findById(userId).populate({
      path: 'savedRecipes',
      populate: { path: 'author', select: 'username avatar' },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const recipes: Object = await Recipe.find({userid: userId});

    res.status(200).json({ success: true, recipes: recipes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};
