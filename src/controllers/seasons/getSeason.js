const { Season } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const getSeason = async (req, res) => {
	try {
		const { seasonId } = req.params;

		if (!validate.uuid(seasonId))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_UUID });

		const season = await Season.findOne({
			where: { id: seasonId },
		});

		if (!season)
			return res.status(400).send({ error: errorCode.SEASON_NOT_FOUND });

		return res.status(200).send(season);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getSeason;
