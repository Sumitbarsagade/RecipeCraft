import { Router } from 'express';
import {
  getCommentsById,
  postCommentsById,
  updateCommentById,
  deleteCommentById,
} from '../controllers/commentsController.js';

const router = Router();

// Public routes
router.get('/:id/comments', getCommentsById);

// Private routes (auth middleware to be added)
router.post('/:id/comments', postCommentsById);
router.put('/:commentId', updateCommentById);
router.delete('/:commentId', deleteCommentById);

export default router;
