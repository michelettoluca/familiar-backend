require("dotenv").config();
const Jwt = require("jsonwebtoken");
const generateAccessToken = require("../../utils/generateAccessToken");
const { Admin, League } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/validate");

const handleTokenRefresh = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;

		if (!validate.string(refreshToken, { allowEmpty: false }))
			return res.status(401).send({ error: errorCode.INVALID_REFRESH_TOKEN });

		const adminMatch = await Admin.findOne({ where: { refreshToken } });

		if (!adminMatch)
			return res.status(401).send({ error: errorCode.INVALID_REFRESH_TOKEN });

		const leagueMatch = await League.findOne({
			where: { tag: adminMatch.username },
		});

		Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, {
			algorithms: ["HS256"],
		});

		const accessToken = generateAccessToken({
			...adminMatch.dataValues,
			leagueId: leagueMatch?.id,
		});

		return res.status(200).send(accessToken);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = handleTokenRefresh;
