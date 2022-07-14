const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.utils');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('username').notEmpty().withMessage('Username cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];

const createOrderValidators = [
	body('quantity').notEmpty().withMessage('quantity cannot be empty'),
	body('quantity').isInt().withMessage('quantity cannot be non-integer'),
	checkResult,
];

const createReviewValidators = [
	body('comment').notEmpty().withMessage('comment cannot be empty'),
	checkResult,
];

const createRestaurantValidators = [
	body('name').notEmpty().withMessage('name cannot be empty'),
	body('address').notEmpty().withMessage('address cannot be empty'),
	body('rating').notEmpty().withMessage('rating cannot be empty'),
	checkResult,
];

const createRestaurantReviewValidators = [
	body('comment').notEmpty().withMessage('name cannot be empty'),
	body('rating').notEmpty().withMessage('rating cannot be empty'),
	checkResult,
];

const createMealValidators = [
	body('name').notEmpty().withMessage('name cannot be empty'),
	body('price').notEmpty().withMessage('price cannot be empty'),
	body('price').isInt().withMessage('price cannot be non-integer'),
	body('restaurantId').notEmpty().withMessage('restaurantId cannot be empty').isInt().withMessage('restaurantId must be integer'),
	checkResult,
];
module.exports = { createRestaurantReviewValidators, createRestaurantValidators, createMealValidators, createReviewValidators, createUserValidators, createOrderValidators };
