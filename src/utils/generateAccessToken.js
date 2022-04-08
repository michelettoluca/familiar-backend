require("dotenv").config();
const Jwt = require("jsonwebtoken");

module.exports = adminData => {
	const { id, username, role, leagueId } = adminData;

	return Jwt.sign(
		{ id, username, role, leagueId },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "10s",
		}
	);
};
