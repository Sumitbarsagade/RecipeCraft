import type { Request, Response } from 'express';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

// ---------------------------------------------------------------------------
// GET USER PROFILE
// ---------------------------------------------------------------------------

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select('-password -refreshToken -resetOtp -resetOtpExpire')
      .populate('followers', 'username email avatar')
      .populate('following', 'username email avatar');

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const recipesCount = await Recipe.countDocuments({ author: id });

    res.status(200).json({ success: true, user, recipesCount });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// UPDATE PROFILE
// ---------------------------------------------------------------------------

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { username, email, bio, avatar } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        res.status(400).json({ success: false, message: 'Username already taken' });
        return;
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        res.status(400).json({ success: false, message: 'Email already in use' });
        return;
      }
      user.email = email;
    }

    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.status(200).json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// DELETE PROFILE
// ---------------------------------------------------------------------------

export const deleteProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    await Recipe.deleteMany({ author: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
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
