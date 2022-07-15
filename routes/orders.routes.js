const express = require('express');

// Controllers
const {
	createOrder,
	updateOrder,
	deleteOrder,
	getOrderByUserId,
} = require('../controllers/orders.controller');

// Middlewares
const {
	createOrderValidators,
} = require('../middlewares/validators.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware');
const { orderExists } = require('../middlewares/orders.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter
	.get('/me',protectUserAccount, getOrderByUserId)
	.use('/:id', orderExists)
	.post('/',protectUserAccount, createOrder)
	.patch('/:id',protectUserAccount, updateOrder)
	.delete('/:id',protectUserAccount, deleteOrder)

module.exports = { ordersRouter };
