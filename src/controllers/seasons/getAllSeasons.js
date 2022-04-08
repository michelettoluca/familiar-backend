const { Season } = require("../../models");
const { errorCode } = require("../../utils/constants");

const getAllSeasons = async (req, res) => {
	try {
		const seasons = await Season.findAll();

		return res.status(200).send(seasons);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getAllSeasons;
