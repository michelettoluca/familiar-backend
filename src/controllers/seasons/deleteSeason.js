const { Season } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const deleteSeason = async (req, res) => {
	try {
		const { seasonId } = req.params;

		if (!validate.uuid(seasonId))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_UUID });

		const matchSeason = await Season.findOne({
			where: { id: seasonId },
		});

		if (!matchSeason)
			return res.status(400).send({ error: errorCode.SEASON_NOT_FOUND });

		await matchSeason.destroy();

		return res.status(201).send(matchSeason);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deleteSeason;
