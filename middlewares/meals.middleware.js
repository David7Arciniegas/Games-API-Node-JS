// Models
const { Meal } = require('../models/meals.model');

// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

exports.mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id, status: 'active' } });

  if (!meal) {
    return next(new AppError(404, 'No meal found with that ID'));
  }

  req.meal = meal;
  next();
});
