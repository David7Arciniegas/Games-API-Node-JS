// Models
const { Game } = require('../models/game.model');

// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

exports.gameExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const game = await Game.findOne({ where: { id, status: 'active' } });

  if (!game) {
    return next(new AppError(404, 'No game found with that ID'));
  }

  req.game = game;
  next();
});
