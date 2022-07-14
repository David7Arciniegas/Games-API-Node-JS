// Models
const { Console } = require('../models/orders.model');
const { Game } = require('../models/meals.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

exports.getAllConsoles = catchAsync(async (req, res, next) => {
	const consoles = await Console.findAll({
		where: { status: 'active' },
		include: [{ model: Game }],
	});

	res.status(200).json({
		status: 'success',
		data: { consoles },
	});
});


exports.createConsole = catchAsync(async (req, res, next) => {
	const { name, company, gender } = req.body;

	const newConsole = await Console.create({
		name, company,
		gender
	});

	res.status(201).json({
		status: 'success',
		newConsole,
	});
});

exports.updateConsole = catchAsync(async (req, res, next) => {
	const { console } = req;
	const { name } = req.body;

	await console.update({ name });

	res.status(204).json({ status: 'success' });
});

exports.deleteConsole = catchAsync(async (req, res, next) => {
	const { console } = req;

	await console.update({ status: 'disabled' });

	res.status(204).json({ status: 'success' });
});
