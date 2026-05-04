
import mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({

recipe:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
},

author: {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe' 
},

content:{
    type: String,
    required: true
},

likes:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},

createdAt:{
    type: Date,
    default: Date.now
}

})


const Comment = mongoose.model('Comment', commentSchema )

module.exports = Comment;