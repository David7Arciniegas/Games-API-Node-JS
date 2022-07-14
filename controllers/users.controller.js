const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// Models
const { User } = require('../models/user.model');
const { Order } = require('../models/orders.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		where: { status: 'active' }
	});

	res.status(200).json({
		status: 'success',
		data: { users },
	});
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
	const userId = req.sessionUser.id
	const order = await Order.findAll({
		where: { userId, status: 'active' }
	});
	res.status(200).json({
		status: 'success',
		data: { order },
	});
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const orders = await Order.findAll({
		where: { userId:id,
			status: 'active' }
	});

	res.status(200).json({
		status: 'success',
		data: { orders },
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});

exports.createUser = catchAsync(async (req, res, next) => {
	const { username, email, password, role } = req.body;

	// Hash password
	const salt = await bcrypt.genSalt(12);
	const hashPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		username,
		email,
		password: hashPassword,
		role,
	});

	// Remove password from response
	newUser.password = undefined;

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

exports.updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { username, email } = req.body;

	await user.update({ username, email });

	res.status(204).json({ status: 'success' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'disabled' });

	res.status(204).json({ status: 'success' });
});
