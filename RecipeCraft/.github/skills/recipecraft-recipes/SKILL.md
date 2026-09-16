---
name: recipecraft-recipes
description: Build and maintain RecipeCraft recipe creation, editing, listing, detail, filtering, searching, sorting, publishing, drafting, and deletion features.
---

# Recipe Management Skill

## Recipe Endpoints

Current assumed endpoints:

GET /recipes
GET /recipes/:id
POST /recipes
PUT /recipes/:id
DELETE /recipes/:id

## Data Models

Frontend form model:

RecipeFormData

API model:

Recipe

Keep form types separate from API types when their shapes differ.

## Form Values

The recipe form stores numeric fields as strings because they originate from inputs.

Examples:

prepTime
cookTime
servings
nutrition.calories
nutrition.protein
nutrition.carbohydrates
nutrition.fat

Convert them before API submission.

## Recipe Features

Support:

- create recipe
- edit recipe
- delete recipe
- save draft
- publish
- search
- category filtering
- cuisine filtering
- status filtering
- sorting
- pagination
- recipe detail

## Dashboard

Dashboard recipe management should provide:

- search
- All / Published / Draft filter
- sorting
- grid/list view
- preview
- edit
- delete
- empty state
- loading state
- error state
- delete confirmation

## Public Recipes

Public recipe pages should provide:

- search
- categories
- recipe cards
- rating
- reviews
- cooking time
- difficulty
- author
- recipe detail
- ingredients
- instructions
- nutrition
- tips
- notes

## RTK Query

Use RTK Query for recipe server state.

Prefer:

useGetRecipesQuery
useGetRecipeByIdQuery
useCreateRecipeMutation
useUpdateRecipeMutation
useDeleteRecipeMutation

Do not create a duplicate recipes Redux slice unless there is a specific global client-state requirement.

## Cache

Use RTK Query tags.

Creating, updating, or deleting recipes should invalidate the relevant recipe cache.

## UX

Every API-driven recipe view must handle:

loading
error
empty
success

Do not show blank screens while requests are loading.