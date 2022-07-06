const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Review } = require('./models/reviews.model');
const { Game } = require('./models/game.model');
const { Console } = require('./models/console.model');
const { GameInConsoles } = require('./models/gameInConsoles.model');
// Utils
const { db } = require('./utils/database.utils');

// Database authenticated
db
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

// Init models relations
Console.belongsToMany(Game, { foreignKey: 'gameId', through: 'gamesInConsoles' });
Game.belongsToMany(Console, { foreignKey: 'consoleId', through: 'gamesInConsoles' });
User.hasMany(Review, { foreignKey: 'userId'});
Game.hasMany(Review,{ foreignKey: 'userId'});
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
