require("dotenv").config();
const Express = require("express");
const Router = Express.Router();

const {
	getAllPlayers,
	getPlayer,
	createPlayer,
	updatePlayer,
	deletePlayer,
	getPlayerEvents,
} = require("../controllers/players");

const { verifyAccessToken, verifyPermissions } = require("../middlewares");
const { role } = require("../utils/constants");

Router.route("")
	.get(getAllPlayers)
	.post(verifyAccessToken, verifyPermissions(role.ORGANIZER), createPlayer);

Router.route("/:playerId")
	.get(getPlayer)
	.put(verifyAccessToken, verifyPermissions(role.ORGANIZER), updatePlayer)
	.delete(verifyAccessToken, verifyPermissions(role.ORGANIZER), deletePlayer);

Router.route("/:playerId/events").get(getPlayerEvents);

module.exports = Router;
