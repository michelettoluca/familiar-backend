const { Season } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const createSeason = async (req, res) => {
	try {
		const { name, endsAt } = req.body;

		if (!validate.string(name, { allowEmpty: false }))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_NAME });

		if (!validate.date(endsAt))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_ENDSAT });

		const season = await Season.create({
			name,
			endsAt,
		});

		return res.status(201).send(season);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = createSeason;
