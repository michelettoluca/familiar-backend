require("dotenv").config();
const Jwt = require("jsonwebtoken");

module.exports = adminData => {
	const { id } = adminData;

	return Jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "365d",
	});
};
