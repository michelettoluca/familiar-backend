const { Admin } = require("../../models");
const { errorCode } = require("../../utils/constants");

const handleSignOut = async (req, res) => {
	try {
		const { refreshToken } = req.cookies;

		const adminMatch = await Admin.findOne({ where: { refreshToken } });

		if (adminMatch) await adminMatch.update({ refreshToken });

		res.clearCookie("refreshToken");

		return res.status(201).send();
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = handleSignOut;
