const express = require('express');

// Controllers
const {
	getAllMeals,
	getMealById,
	createMeal,
	updateMeal,
	deleteMeal,
} = require('../controllers/meals.controller');

// Middlewares
const {
	createMealValidators,
} = require('../middlewares/validators.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware.middleware');
const { mealExists } = require('../middlewares/meals.middleware.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const mealsRouter = express.Router();

mealsRouter
	.get('/', getAllMeals)
	.get('/:id', getMealById)
mealsRouter.use(protectSession);


mealsRouter
	.use('/:restaurantId', restaurantExists)
	.use('/:id', mealExists)
	.post('/:restaurantId', createMeal)
	.patch('/:id',protectUserAccount, updateMeal)
	.delete('/:id',protectUserAccount, deleteMeal)

module.exports = { mealsRouter };
