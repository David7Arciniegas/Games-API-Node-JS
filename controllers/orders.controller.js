const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Order } = require('../models/orders.model');
const { Meal } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurant.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

exports.getOrderByUserId = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const orders = await Order.findAll({
		where: { userId,
			status: 'active' },
		include: [{ model: Meal }, {model: Restaurant}],
	});

	if (!orders) {
		return res.status(404).json({
		  status: "error",
		  message: "Order not found",
		});
	  }

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
});


exports.createOrder = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const { quantity, mealId } = req.body;
	const meal = await Meal.findOne({
		where:{id:mealId}
	});
	const price = meal.price * quantity
	const newOrder = await Order.create({
		quantity,
		mealId,
		totalPrice:price,
		userId
	});

	res.status(201).json({
		status: 'success',
		newOrder,
	});
});


exports.updateOrder = catchAsync(async (req, res, next) => {
	const { order } = req;
	const mOrder = await Order.findOne({
		where: { order,
			status: 'active' }
	});
	if (!mOrder) {
		return res.status(404).json({
			status: "error",
			message: "Order not found",
		});
	}
	await order.update({ status:' completed' });
	res.status(204).json({ status: 'success' });

});

exports.deleteOrder = catchAsync(async (req, res, next) => {
	const { order } = req;
	const mOrder = await Order.findOne({
		where: { order,
			status: 'active' }
	});
	if (!mOrder) {
		return res.status(404).json({
			status: "error",
			message: "Order not found",
		});
	}

	await order.update({ status:'cancelled' });
	res.status(204).json({ status: 'success' });
});
