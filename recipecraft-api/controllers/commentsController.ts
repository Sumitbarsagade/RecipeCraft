import type { Request, Response } from 'express';
import Comment from '../models/Comment.js';
import Recipe from '../models/Recipe.js';

// ---------------------------------------------------------------------------
// Extended request type to include authenticated user from auth middleware
// ---------------------------------------------------------------------------

interface AuthRequest extends Request {
  user?: { id: string };
  recipe?: { recipeId: string};
}

// ---------------------------------------------------------------------------
// Get Comments by Recipe ID
// ---------------------------------------------------------------------------

export const getCommentsById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { recipeId } = req.params;
    
    
    if (!recipeId) {
      res.status(401).json({ success: false, message: 'Relevent recipe not found' });
      return;
    }

    const comments = await Comment.find({ recipe: recipeId })
      .populate('author', 'username profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error('getCommentsById error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ---------------------------------------------------------------------------
// Post a Comment
// ---------------------------------------------------------------------------

export const postComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content, recipeId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    if (!content || content.trim() === '') {
      res.status(400).json({ success: false, message: 'Comment text is required' });
      return;
    }

    if (!recipeId) {
      res.status(400).json({ success: false, message: 'Recipe ID is required' });
      return;
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      res.status(404).json({ success: false, message: 'Recipe not found' });
      return;
    }

    const comment = await Comment.create({
      content: content.trim(),
      author: userId,
      recipe: recipeId,
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      'author',
      'username profileImage'
    );

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment: populatedComment,
    });
  } catch (error) {
    console.error('postComment error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ---------------------------------------------------------------------------
// Update a Comment
// ---------------------------------------------------------------------------

export const updateCommentById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    if (!content || content.trim() === '') {
      res.status(400).json({ success: false, message: 'Comment text is required' });
      return;
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found' });
      return;
    }

    // Only the comment owner can update
    if (comment.author.toString() !== userId) {
      res.status(403).json({ success: false, message: 'Forbidden: you do not own this comment' });
      return;
    }

    comment.content = content.trim();
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      comment,
    });
  } catch (error) {
    console.error('updateCommentById error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ---------------------------------------------------------------------------
// Delete a Comment
// ---------------------------------------------------------------------------

export const deleteCommentById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found' });
      return;
    }

    // Only the comment owner can delete
    if (comment.author.toString() !== userId) {
      res.status(403).json({ success: false, message: 'Forbidden: you do not own this comment' });
      return;
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('deleteCommentById error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
