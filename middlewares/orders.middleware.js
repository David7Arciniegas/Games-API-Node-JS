// Models
const { Order } = require('../models/orders.model');

// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

exports.orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const console = await Order.findOne({ where: { id, status: 'active' } });

  if (!console) {
    return next(new AppError(404, 'No console found with that ID'));
  }

  req.console = console;
  next();
});
