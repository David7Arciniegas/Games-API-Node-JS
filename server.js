const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Meal } = require('./models/meals.model');
const { Order } = require('./models/orders.model');
const { Restaurant } = require('./models/restaurant.model');
const { Review } = require('./models/reviews.model');
// Utils
const { db } = require('./utils/database.utils');

// Database authenticated
db
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

// Init models relations


// associations can be defined here
Restaurant.hasMany(Review,{foreignKey:'restaurantId'})
Restaurant.hasMany(Meal,{foreignKey:'restaurantId'})
Meal.hasMany(Restaurant,{foreignKey:'mealId'})
User.hasMany(Order,{ foreignKey: 'userId'})
Order.belongsTo(Meal,{foreignKey:'mealId'})
Order.belongsTo(Restaurant,{foreignKey:'userId'})
User.hasMany(Review,{ foreignKey: 'userId'})





// Database synced with models' relations
db
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});
