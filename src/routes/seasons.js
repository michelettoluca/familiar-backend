require("dotenv").config();
const Express = require("express");
const {
	createSeason,
	updateSeason,
	deleteSeason,
	getCurrentSeason,
	getSeason,
	getAllSeasons,
} = require("../controllers/seasons");
const Router = Express.Router();

const { verifyAccessToken, verifyPermissions } = require("../middlewares");
const { role } = require("../utils/constants");

Router.route("")
	.get(getAllSeasons)
	.post(verifyAccessToken, verifyPermissions(role.ADMIN), createSeason);

Router.route("/current").get(getCurrentSeason);

Router.route("/:seasonId")
	.get(getSeason)
	.put(verifyAccessToken, verifyPermissions(role.ADMIN), updateSeason)
	.delete(verifyAccessToken, verifyPermissions(role.ADMIN), deleteSeason);

module.exports = Router;
