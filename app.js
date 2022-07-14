const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { ordersRouter } = require('./routes/orders.routes');
const { mealsRouter } = require('./routes/meals.routes');

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/meals', mealsRouter);
app.use(globalErrorHandler);

module.exports = { app };

// Gen random strings
// require('crypto').randomBytes(64).toString('hex');
