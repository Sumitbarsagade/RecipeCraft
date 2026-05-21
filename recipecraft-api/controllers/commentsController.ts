
//getComments, postComments, updateComment, deleteComment




const Comment = require("../models/Comment");
const Recipe = require("../models/Recipe");
interface Request {params: any; body:{ content:string; userId:string; recipeId:string; }};

interface Response{ status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; count?: any; user?:string; message?: any; comments?: string[]; comment?: string; }): any; new(): any; }; };}
// GET COMMENTS BY RECIPE ID
const getCommentsById = async (req: {params: any}, res:Response) => {
  try {
    const { recipeId } = req.params;

    const comments = await Comment.find({
      recipe: recipeId,
    })
      .populate("user", "username profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST COMMENT
const postCommentsById = async (req: Request, res: Response) => {
  try {
    const { content, recipeId } = req.body;

    const userId = (req as any).user.id;

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    const comment = await Comment.create({
      content: content,
      author: userId,
      recipe: recipeId,
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "username profileImage"
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE COMMENT
const updateCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const userId = (req as any).user.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Only comment owner can update
    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    comment.content = content || comment.content;

    await comment.save();

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE COMMENT
const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const userId = (req as any).user.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Only comment owner can delete
    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCommentsById,
  postCommentsById,
  updateCommentById,
  deleteCommentById,
};