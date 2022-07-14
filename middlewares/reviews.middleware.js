// Models
const { Review } = require('../models/reviews.model.model');

// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

exports.reviewExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { id, status: 'active' } });

  if (!review) {
    return next(new AppError(404, 'No review found with that ID'));
  }

  req.review = review;
  next();
});
