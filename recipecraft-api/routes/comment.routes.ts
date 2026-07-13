import { Router } from 'express';
import {
  getCommentsById,
  postComment,
  updateCommentById,
  deleteCommentById,
} from '../controllers/commentsController';

const router = Router();

// Public routes
router.get('/:id/comments', getCommentsById);

// Private routes (auth middleware to be added)
router.post('/:id/comments', postComment);
router.put('/:commentId', updateCommentById);
router.delete('/:commentId', deleteCommentById);

export default router;
