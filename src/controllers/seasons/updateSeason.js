const { Season } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/validate");

const deleteSeason = async (req, res) => {
	try {
		const { seasonId } = req.params;
		const { name, endsAt } = req.body;

		if (!validate.uuid(seasonId))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_UUID });

		const matchSeason = await Season.findOne({
			where: { id: seasonId },
		});

		if (!matchSeason)
			return res.status(400).send({ error: errorCode.SEASON_NOT_FOUND });

		if (!validate.string(name))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_NAME });

		if (endsAt && !validate.date(endsAt))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_ENDSAT });

		const updatedSeason = await matchSeason.update({
			name,
			endsAt,
		});

		return res.status(201).send(updatedSeason);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deleteSeason;
