// Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/reviews.model');
// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

exports.restaurantExists = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({ where: { id:restaurantId, status: 'active' } });

  if (!restaurant) {
    return next(new AppError(404, 'No restaurant found with that ID'));
  }

  req.restaurant = restaurant;
  next();
});

exports.restaurantReviewExists = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({ where: { id:reviewId} });

  if (!review) {
    return next(new AppError(404, 'No review found with that ID'));
  }

  req.review = review;
  next();
});
