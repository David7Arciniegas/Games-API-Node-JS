// Models
const { Order } = require('../models/orders.model');

// Utils
const { AppError } = require('../utils/appError.utils');
const { catchAsync } = require('../utils/catchAsync.utils');

exports.orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id, status: 'active' } });

  if (!order) {
    return next(new AppError(404, 'No order found with that ID'));
  }

  req.order = order;
  next();
});
