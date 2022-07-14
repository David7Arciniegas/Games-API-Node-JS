const { db, DataTypes } = require('../utils/database.utils');

// Create our first model (table)
const Restaurant = db.define('restaurants', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Restaurant };