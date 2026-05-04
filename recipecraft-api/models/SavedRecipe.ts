import mongo = require('mongoose');
import mongoose = require('mongoose');

const savedRecipeSchema = new mongoose.Schema({

user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    
},

recipe:{
    type:mongoose.Schema.ObjectId,
    ref: 'Recipe'
},

savedAt:{
    type:Date,
    default:Date.now
}

})


const SavedRecipe = mongoose.model('SavedRecipe', savedRecipeSchema);

module.exports = SavedRecipe;