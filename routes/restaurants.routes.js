const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	getAllOrders,
	getUserOrders,
	login,
} = require('../controllers/users.controller');

// Middlewares
const {
	createUserValidators,
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/login', login);

usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.use(protectSession);


usersRouter
	.use('/:id', userExists)
	.get('/', getAllUsers)
	.patch('/:id',protectUserAccount, updateUser)
	.delete('/:id',protectUserAccount, deleteUser)
	.get('/orders',protectUserAccount, getAllOrders)
	.use('/orders/:id', userExists)
	.get('/orders/:id',protectUserAccount, getUserOrders)

module.exports = { usersRouter };
