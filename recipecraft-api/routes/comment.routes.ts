/*

GET
/api/recipes/:id/comments
Get all comments for a recipe (paginated)
Public
POST
/api/recipes/:id/comments
Post a new comment on a recipe
Private
PUT
/api/comments/:commentId
Edit comment (author only)
Private
DELETE
/api/comments/:commentId
Delete comment (author or recipe author)
Private

*/

const express = require('express');

const router = express.Router();

const {getCommentsById, postCommentsById, updateCommentById, deleteCommentById} = require('../controllers/');

router.get('/:id/comments', getCommentsById);

router.post('/:id/comments', postCommentsById);

router.put('/:commentId', updateCommentById);

router.Delete('/:commentId', deleteCommentById);


module.exports = router;



