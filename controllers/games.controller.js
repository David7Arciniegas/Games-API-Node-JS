const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Game } = require('../models/game.model');
const { Console } = require('../models/console.model');
const { Review } = require('../models/reviews.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

exports.getAllGames = catchAsync(async (req, res, next) => {
	const games = await Game.findAll({
		where: { status: 'active' },
		include: [{ model: Console }, {model: Review}],
	});

	res.status(200).json({
		status: 'success',
		data: { games },
	});
});


exports.createGame = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;

	const newGame = await Game.create({
		title,
		genre
	});

	res.status(201).json({
		status: 'success',
		newGame,
	});
});

exports.createGameReview = catchAsync(async (req, res, next) => {

	const userId = req.sessionUser.id
	const {id} = req.params
	const { comment } = req.body;
	console.log(userId, id, comment)
	const newReview = await Review.create({
		gameId:id,
		userId:userId,
		comment:comment
	});
	res.status(201).json({
		status: 'success',
		newReview,
	});
});

exports.updateGame = catchAsync(async (req, res, next) => {
	const { game } = req;
	const { title } = req.body;

	await game.update({ title });

	res.status(204).json({ status: 'success' });
});

exports.deleteGame = catchAsync(async (req, res, next) => {
	const { game } = req;

	await game.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});
