const express = require("express");
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App route
 */
router.get('/',recipeController.homepage);
router.get('/about',recipeController.aboutpage);
router.get('/contact',recipeController.contactpage);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/categories',recipeController.exploreCategories);
router.get('/categories/:id',recipeController.exploreCategoriesById);
router.post('/search',recipeController.searchrecipe);
router.get('/explore-latest',recipeController.exploreLatest);
router.get('/random-latest',recipeController.exploreRandom);
router.get('/submit-recipe',recipeController.submitRecipe);
router.post('/submit-recipe',recipeController.submitRecipePost);




module.exports = router;