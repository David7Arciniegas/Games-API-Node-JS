const { db, DataTypes } = require('../utils/database.utils');

// Create our first model (table)
const GameInConsoles = db.define('gamesinconsoles', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	gameId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	consoleId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { GameInConsoles };