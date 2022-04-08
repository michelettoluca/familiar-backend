require("dotenv").config();
require("./src/models");
const Express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 4000;

const App = Express();

const apiRouter = require("./src/routes");

App.use(
	cors({
		credentials: true,
		origin: ["http://18.197.8.167:3000", "http://localhost:3000"],
	})
);
App.use(Express.urlencoded({ extended: false }));
App.use(cookieParser());
App.use(Express.json());

App.use("/api", apiRouter);

App.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
