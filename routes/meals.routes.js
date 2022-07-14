const express = require('express');

// Controllers
const {
	getAllRestaurants,
	getRestaurantById,
	createRestaurantReview,
	updateRestaurantReview,
	deleteReview,
	createRestaurant,
	updateRestaurant,
	deleteRestaurant,
	getAllReviews,
	getRestaurantReviews,
	login,
} = require('../controllers/restaurants.controller');

// Middlewares
const {
	createRestaurantValidators,
} = require('../middlewares/validators.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter
	.get('/', getAllRestaurants)
	.get('/:id', getRestaurantById)
usersRouter.use(protectSession);


usersRouter
	.use('/:id', restaurantExists)
	.post('/', createRestaurant)
	.patch('/:id',protectUserAccount, updateRestaurant)
	.delete('/:id',protectUserAccount, deleteRestaurant)
	.post('/reviews/id',protectUserAccount, createRestaurantReview)
	.patch('/reviews/:id', protectUserAccount, updateRestaurantReview)
	.delete('/reviews/:id',protectUserAccount, deleteReview)

module.exports = { usersRouter };
