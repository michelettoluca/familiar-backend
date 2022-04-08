const createLeague = require("./createLeague");
const updateLeague = require("./updateLeague");
const deleteLeague = require("./deleteLeague");

const getAllLeagues = require("./getAllLeagues");
const getLeague = require("./getLeague");

const getLeagueEvents = require("./getLeagueEvents");
const getLeaguePlayers = require("./getLeaguePlayers");
const getLeaderboard = require("./getLeaderboard");

module.exports = {
	createLeague,
	updateLeague,
	deleteLeague,

	getAllLeagues,
	getLeague,

	getLeagueEvents,
	getLeaguePlayers,
	getLeaderboard,
};
