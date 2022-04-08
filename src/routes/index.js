const Express = require("express");
const Router = Express.Router();

const authRouter = require("./auth");
const leaguesRouter = require("./leagues");
const playersRouter = require("./players");
const archetypesRouter = require("./archetypes");
const eventsRouter = require("./events");
const seasonsRouter = require("./seasons");

Router.use("/auth", authRouter);
Router.use("/leagues", leaguesRouter);
Router.use("/players", playersRouter);
Router.use("/archetypes", archetypesRouter);
Router.use("/events", eventsRouter);
Router.use("/seasons", seasonsRouter);

module.exports = Router;
