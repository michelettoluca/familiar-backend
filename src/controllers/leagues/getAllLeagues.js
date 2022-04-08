const { League } = require("../../models");
const { errorCode } = require("../../utils/constants");

const getAllLeagues = async (req, res) => {
	try {
		const leagues = await League.findAll();

		return res.status(200).send(leagues);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getAllLeagues;
