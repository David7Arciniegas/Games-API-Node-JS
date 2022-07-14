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
} = require('../controllers/restaurants.controller');

// Middlewares
const {
	createRestaurantValidators,
	createRestaurantReviewValidators
} = require('../middlewares/validators.middleware');
const { restaurantExists, restaurantReviewExists } = require('../middlewares/restaurants.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const restaurantsRouter = express.Router();

restaurantsRouter
	.get('/', getAllRestaurants)
	.get('/:id', getRestaurantById)
restaurantsRouter.use(protectSession);


restaurantsRouter
	.post('/reviews/:restaurantId',protectUserAccount,restaurantExists,createRestaurantReviewValidators, createRestaurantReview)
	.use('/reviews/:reviewId', restaurantReviewExists)
	.patch('/reviews/:reviewId', protectUserAccount, updateRestaurantReview)
	.delete('/reviews/:reviewId',protectUserAccount, deleteReview)
	.post('/', protectUserAccount, createRestaurantValidators, createRestaurant)
	.use('/:id', restaurantExists)
	.patch('/:id',protectUserAccount, updateRestaurant)
	.delete('/:id',protectUserAccount, deleteRestaurant)


module.exports = { restaurantsRouter };
