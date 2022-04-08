require("dotenv").config();
const Express = require("express");
const Router = Express.Router();

const {
	signUp,
	signIn,
	signOut,
	refreshToken,
} = require("../controllers/auth");

const { verifyAccessToken, verifyPermissions } = require("../middlewares");
const { role } = require("../utils/constants");

Router.route("/sign-up").post(
	verifyAccessToken,
	verifyPermissions(role.ADMIN),
	signUp
);

Router.route("/sign-in").post(signIn);
Router.route("/sign-out").delete(signOut);
Router.route("/refresh-token").get(refreshToken);

module.exports = Router;
