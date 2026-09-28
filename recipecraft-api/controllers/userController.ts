import type { Request, Response } from 'express';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import { IUser } from "../types/user.types";

interface AuthenticatedRequest extends Request {
  
      user?: { _id: string };
  
  
}

// ---------------------------------------------------------------------------
// GET USER PROFILE
// ---------------------------------------------------------------------------



export const getProfile = async (
  req: AuthenticatedRequest ,
  res: Response
): Promise<void> => {
  try {
    const userinfo= req.user;
    
    if (!userinfo) {
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
      console.log(user)
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
    console.log(error)
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
    if (!req.user?._id) {
      res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
      return;
    }

    const {
      name,
      username,
      avatar,
      bio,
      location,
      website,
    } = req.body;

    // Username uniqueness check
    if (
      username &&
      username !== req.body.username
    ) {
      const existingUser =
        await User.findOne({
          username,
          _id: {
            $ne: req.user._id,
          },
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

    /*
     * Only fields explicitly listed here
     * can be updated.
     *
     * email, role, password, etc.
     * cannot be modified through this API.
     */
    const updates: Partial<
      Pick<
        IUser,
        | "name"
        | "username"
        | "avatar"
        | "bio"
        | "location"
        | "website"
      >
    > = {};

    if (name !== undefined) {
      updates.name = name;
    }

    if (username !== undefined) {
      updates.username = username;
    }

    if (avatar !== undefined) {
      updates.avatar = avatar;
    }

    if (bio !== undefined) {
      updates.bio = bio;
    }
    if (location !== undefined) {
      updates.location = location;
    }
    if (website !== undefined) {
      updates.website = website;
    }
    

    const user =
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: updates,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select(
        "-password -refreshToken -resetOtp -resetOtpExpire -resetPasswordToken"
      );

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
      "updateProfile error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update profile.",
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
     const userinfo= req.user;
    
    if (!userinfo) {
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
