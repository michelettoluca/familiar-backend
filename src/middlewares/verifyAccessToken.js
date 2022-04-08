require("dotenv").config();
const Jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
	// const authHeader = req.headers?.authorization || req.headers?.Authorization;

	// if (!authHeader) return res.status(401).send({ msg: "Token required" });

	// if (!authHeader.startsWith("Bearer "))
	// 	return res.status(400).send({ msg: "Invalid token format" });

	// const token = authHeader.split(" ")[1];

	// try {
	// 	const decodedToken = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
	// 		algorithms: ["HS256"],
	// 	});

	// 	req.username = decodedToken.username;
	// 	req.role = decodedToken.role;
	// 	req.id = decodedToken.id;
	// } catch (err) {
	// 	return res.status(403).send({ msg: "Invalid token" });
	// }

	next();
};

module.exports = verifyAccessToken;
