const { League } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/validate");

const getLeagueById = async (req, res) => {
	try {
		const { leagueId } = req.params;

		if (!validate.uuid(leagueId))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_UUID });

		const league = await League.findOne({
			where: {
				id: leagueId,
			},
		});

		if (!league)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		return res.status(200).send(league);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getLeagueById;
