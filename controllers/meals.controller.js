const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Meal } = require('../models/meals.model');
const { User } = require('../models/user.model');
const { Restaurant } = require('../models/restaurant.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

exports.getAllMeals = catchAsync(async (req, res, next) => {
	const meals = await Meal.findAll({
		where: { status: 'active' },
		include: { model: Restaurant }
	});

	res.status(200).json({
		status: 'success',
		data: { meals },
	});
});

exports.getMealById = catchAsync(async (req, res, next) => {
	const {id} = req.params
	const meal = await Meal.findOne({
		where: { id, status: 'active' },
		include: { model: Restaurant }
	});

	if (!meal) {
		return res.status(404).json({
			status: "error",
			message: "Meal not found",
		});
	}

	res.status(200).json({
		status: 'success',
		data: { meal },
	});
});

exports.createMeal = catchAsync(async (req, res, next) => {
	const {restaurantId} = req.params
	const { name, price } = req.body;

	const newMeal = await Meal.create({
		name,
		restaurantId,
		price
	});

	res.status(201).json({
		status: 'success',
		newMeal,
	});
});



exports.updateMeal = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const user = await User.findOne({
		where:{id:userId}
	});

	if( user.role !== 'admin'){
		res.status(401).json({ status: 'Unauthorized' });
	} else{
		const { meal } = req;
		const { name, price } = req.body;

		await meal.update({ name, price });

		res.status(204).json({ status: 'success' });
	}


});

exports.deleteMeal = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const user = await User.findOne({
		where:{id:userId}
	});

	if( user.role !== 'admin'){
		res.status(401).json({ status: 'Unauthorized' });
	} else{
		const { meal } = req;

		await meal.update({ status: 'deleted' });

		res.status(204).json({ status: 'success' });
	}

});
