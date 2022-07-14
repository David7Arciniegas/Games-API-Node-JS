// Models
const { Restaurant } = require('../models/restaurants.model');

// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

exports.restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id, status: 'active' } });

  if (!restaurant) {
    return next(new AppError(404, 'No restaurant found with that ID'));
  }

  req.restaurant = restaurant;
  next();
});
