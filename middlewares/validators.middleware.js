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
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];

const createGameValidators = [
	body('title').notEmpty().withMessage('title cannot be empty'),
	body('genre').notEmpty().withMessage('genre provide a valid gender'),
	checkResult,
];

const createReviewValidators = [
	body('comment').notEmpty().withMessage('comment cannot be empty'),
	checkResult,
];

const createConsoleValidators = [
	body('name').notEmpty().withMessage('name cannot be empty'),
	body('company').notEmpty().withMessage('company provide a valid gender'),
	checkResult,
];
module.exports = { createConsoleValidators, createReviewValidators, createUserValidators, createGameValidators };
