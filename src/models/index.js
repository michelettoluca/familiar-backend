const { Sequelize } = require("sequelize");

const Database = new Sequelize(
	process.env.DATABASE_NAME,
	"postgres",
	process.env.DATABASE_PASSWORD,
	{
		host: "localhost",
		dialect: "postgres",
	}
);

// Test connection
(async () => {
	try {
		await Database.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

// Tables

const Admin = require("./Admin")(Database);
const League = require("./League")(Database);
const Player = require("./Player")(Database);
const PlayerLeague = require("./PlayerLeague")(Database);
const Event = require("./Event")(Database);
const Archetype = require("./Archetype")(Database);
const Season = require("./Season")(Database);
const Result = require("./Result")(Database);

// Relationships

// (1) League - (1) Admin
League.hasOne(Admin, {
	onDelete: "CASCADE",
	foreignKey: { allowNull: true },
});
Admin.belongsTo(League);

// (N) League - (M) Player
League.belongsToMany(Player, { through: PlayerLeague });
Player.belongsToMany(League, { through: PlayerLeague });

// (1) Season - (N) Event
Season.hasMany(Event, { onDelete: "CASCADE" });
Event.belongsTo(Season);

// (1) Archetype - (N) Result
Archetype.hasMany(Result, { onDelete: "CASCADE" });
Result.belongsTo(Archetype);

// (1) Player - (N) Result
Player.hasMany(Result, { onDelete: "CASCADE" });
Result.belongsTo(Player);

// (1) Event - (N) Result
Event.hasMany(Result, { onDelete: "CASCADE" });
Result.belongsTo(Event);

// Force sync for initializaiton
// Database.sync({ force: true });

module.exports = {
	Database,

	Admin,
	League,
	Player,
	PlayerLeague,
	Event,
	Archetype,
	Season,
	Result,
};
