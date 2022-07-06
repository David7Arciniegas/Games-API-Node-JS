const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { gamesRouter } = require('./routes/games.routes');
const { consolesRouter } = require('./routes/consoles.routes');

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/consoles', consolesRouter);
app.use(globalErrorHandler);

module.exports = { app };

// Gen random strings
// require('crypto').randomBytes(64).toString('hex');
