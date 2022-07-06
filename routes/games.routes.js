const express = require('express');

// Controllers
const {
	getAllGames,
	createGame,
	updateGame,
	deleteGame,
	createGameReview
} = require('../controllers/games.controller');

// Middlewares
const {
	createGameValidators,
	createReviewValidators,
} = require('../middlewares/validators.middleware');
const { gameExists } = require('../middlewares/games.middleware');
const {
	protectSession,
} = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/',getAllGames)
gamesRouter.use(protectSession)

gamesRouter
	.post('/',createGameValidators, createGame)
	.post('/reviews/:id', gameExists, createReviewValidators, createGameReview)
	.use('/:id', gameExists)
	.patch('/:id', updateGame)
	.delete('/:id', deleteGame);

module.exports = { gamesRouter };
