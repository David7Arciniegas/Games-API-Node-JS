const { db, DataTypes } = require('../utils/database.utils');

// Create our first model (table)
const Order = db.define('orders', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	mealId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	totalPrice: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active'
	},
});

module.exports = { Order };