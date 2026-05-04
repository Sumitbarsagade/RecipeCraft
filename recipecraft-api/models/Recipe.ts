import mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

   title:{
      type: String,
      required: true
   },
   slug: {
      type: String
   },
   description: {
      type: String
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   coverImage:{
      type:String
   },
   ingredients: {
      type: Object
   },
   step:{
      type: Object
   },
   category: {
      type: String,
      required: true,
      enum: ['appetizer', 'snack', 'breakfast', 'main course', 'dessert', 'beverage', 'other' ],
   },
   
   cuisine: {
      type: String,
      enum:[
         'Italian', 'Mexican','Chinese','American','French','Indian',
         'other'
      ]
   },

   tags: {
      type: [String]
   },

   prepTime: {
      type: Number
   },

   cookTime: {
      type: Number
   },

   servings: {
      type: Number
   },

   difficulty: {
      type: String,
      enum: [ 
         'easy',
         'medium',
         'hard'
      ]
   },

   likes:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
   },
  

   isPublished:{
      type: Boolean
   },

   views: {
      type: Number
   },

   createdAt:{
      type: Date,
      default: Date.now
   }

})


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;