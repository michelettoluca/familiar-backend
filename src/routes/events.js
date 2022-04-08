require("dotenv").config();
const Express = require("express");
const Router = Express.Router();

const {
	createEvent,
	updateEvent,
	deleteEvent,

	getEvent,

	addResult,
	updateResult,
	deleteResult,
} = require("../controllers/events");

const { verifyAccessToken, verifyPermissions } = require("../middlewares");
const { role } = require("../utils/constants");

Router.route("").post(
	verifyAccessToken,
	verifyPermissions(role.ORGANIZER),
	createEvent
);

Router.route("/:eventId")
	.get(getEvent)
	.put(verifyAccessToken, verifyPermissions(role.ORGANIZER), updateEvent)
	.delete(verifyAccessToken, verifyPermissions(role.ORGANIZER), deleteEvent);

// Router.route("/:eventId/results").post(
// 	verifyAccessToken,
// 	verifyPermissions(roles.ORGANIZER),
// 	addResult
// );

// Router.route("/:eventId/results/:resultId")
// 	.put(verifyAccessToken, verifyPermissions(roles.ORGANIZER), updateResult)
// 	.delete(verifyAccessToken, verifyPermissions(roles.ORGANIZER), deleteResult);

module.exports = Router;
