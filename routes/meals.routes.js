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
const { restaurantExists } = require('../middlewares/restaurants.middleware');
const { mealExists } = require('../middlewares/meals.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const mealsRouter = express.Router();

mealsRouter
	.use('/:restaurantId', restaurantExists)
	.get('/', getAllMeals)
	.get('/:id', getMealById)
mealsRouter.use(protectSession);


mealsRouter
	.post('/:restaurantId', createMeal)
	.use('/:id', mealExists)
	.patch('/:id',protectUserAccount, updateMeal)
	.delete('/:id',protectUserAccount, deleteMeal)

module.exports = { mealsRouter };
