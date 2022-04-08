require("dotenv").config();
const Express = require("express");
const Router = Express.Router();

const {
	getAllArchetypes,
	getArchetype,
	createArchetype,
	deleteArchetype,
	updateArchetype,
} = require("../controllers/archetypes");

const { verifyAccessToken, verifyPermissions } = require("../middlewares");
const { role } = require("../utils/constants");

Router.route("")
	.get(getAllArchetypes)
	.post(verifyAccessToken, verifyPermissions(role.ADMIN), createArchetype);

Router.route("/:archetypeId")
	.get(getArchetype)
	.put(verifyAccessToken, verifyPermissions(role.ADMIN), updateArchetype)
	.delete(verifyAccessToken, verifyPermissions(role.ADMIN), deleteArchetype);

module.exports = Router;
