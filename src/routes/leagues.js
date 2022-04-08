const Express = require("express");
const Router = Express.Router();

const {
	getAllLeagues,
	getLeague,
	createLeague,
	updateLeague,
	deleteLeague,
	getLeagueEvents,
	getLeaguePlayers,
	getLeaderboard,
} = require("../controllers/leagues");

const { verifyAccessToken, verifyPermissions } = require("../middlewares");
const { role } = require("../utils/constants");

Router.route("")
	.get(getAllLeagues)
	.post(verifyAccessToken, verifyPermissions(role.ADMIN), createLeague);

Router.route("/:leagueId")
	.get(getLeague)
	.put(verifyAccessToken, verifyPermissions(role.ORGANIZER), updateLeague)
	.delete(verifyAccessToken, verifyPermissions(role.ADMIN), deleteLeague);

Router.route("/:leagueId/events").get(getLeagueEvents);

Router.route("/:leagueId/players").get(getLeaguePlayers);

Router.route("/:leagueId/leaderboard").get(getLeaderboard);

module.exports = Router;
