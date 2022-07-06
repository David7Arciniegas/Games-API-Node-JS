const express = require('express');

// Controllers
const {
	createConsole,
	updateConsole,
	deleteConsole,
	getAllConsoles
} = require('../controllers/consoles.controller');

// Middlewares
const {
	createConsoleValidators,
} = require('../middlewares/validators.middleware');
const { consoleExists } = require('../middlewares/consoles.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsoles);

consolesRouter.use(protectSession);

consolesRouter
	.use('/:id',consoleExists)
	.post('/', createConsoleValidators, createConsole)
	.patch('/:id', updateConsole)
	.delete('/:id', deleteConsole)

module.exports = { consolesRouter };
