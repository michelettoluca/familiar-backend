const { Admin, League } = require("../../models");
const Bcrypt = require("bcrypt");
const generateAccessToken = require("../../utils/generateAccessToken");
const generateRefreshToken = require("../../utils/generateRefreshToken");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const handleSignIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!validate.string(username, { allowEmpty: false }))
			return res.status(400).send({ error: errorCode.INVALID_USERNAME });

		if (!validate.string(password, { allowEmpty: false }))
			return res.status(400).send({ error: errorCode.INVALID_PASSWORD });

		const adminMatch = await Admin.findOne({
			where: { username },
			include: [League],
		});

		if (!adminMatch)
			return res.status(400).send({ error: errorCode.INVALID_USERNAME });

		const leagueMatch = await League.findOne({
			where: { tag: adminMatch.username },
		});

		const passwordMatch = await Bcrypt.compare(password, adminMatch.password);

		if (!passwordMatch)
			return res.status(400).send({ error: errorCode.INCORRECT_PASSWORD });

		const accessToken = generateAccessToken({
			...adminMatch.dataValues,
			leagueId: leagueMatch?.id,
		});

		const refreshToken = generateRefreshToken(adminMatch);

		await adminMatch.update({
			refreshToken,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			// secure: true,
			maxAge: 365 * 24 * 60 * 60 * 1000,
		});

		return res.status(201).send(accessToken);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = handleSignIn;
