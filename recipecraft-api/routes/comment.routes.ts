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

const {getComments, postComments, updateComment, deleteComment} = require('../controllers/');

router.get('/:id/comments', getComments);

router.post('/:id/comments', postComments);

router.put('/:commentId', updateComment);

router.Delete('/:commentId', deleteComment);


module.exports = router;



