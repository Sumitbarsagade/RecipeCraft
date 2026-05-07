/*

GET
/api/users/me
Get current logged-in user profile
Private
PUT
/api/users/me
Update profile (name, bio, avatar)
Private
DELETE
/api/users/me
Delete user account and all associated data
Private
GET
/api/users/:username
View public profile of any user by username
Public
POST
/api/users/:id/follow
Follow or unfollow a user (toggle)
Private
GET
/api/users/:id/followers
Get list of user's followers
Public
GET
/api/users/:id/following
Get list of users that this user follows
Public
GET
/api/users/me/saved-recipes
Get all recipes saved/bookmarked by user
Private

*/


const express = require('express');

const router = express.Router();


router.get('/me', getProfile);

router.put('/me', updateProfile);

router.Delete('/me', deleteProfile);

router.get('/:username', getUserName);

router.post('/:id/follow', followUser);

router.get('/:id/follower', getFollowers );

router.get('/:id/following', getFollowing);

router.get('/me/saved-recipes', getSavedRecipes);


module.exports = router;


