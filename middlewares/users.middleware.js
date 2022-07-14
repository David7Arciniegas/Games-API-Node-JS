// Models
const { User } = require('../models/user.model');

// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

exports.userExists = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const user = await User.findOne({ where: { id:id, status: 'active' } });

  if (!user) {
    return next(new AppError(404, 'No user found with that ID'));
  }

  req.user = user;
  next();
});
