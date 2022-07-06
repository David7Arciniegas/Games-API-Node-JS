const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const db = new Sequelize({
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB,
	port: process.env.DB_PORT,
	dialect: 'postgres',
	logging: false,
});

module.exports = { db, DataTypes };
