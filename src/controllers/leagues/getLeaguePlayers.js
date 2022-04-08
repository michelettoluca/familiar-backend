const { Player, League } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const getLeaguePlayers = async (req, res) => {
	try {
		const { leagueId } = req.params;

		if (!validate.uuid(leagueId))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_UUID });

		const leagueMatch = await League.findOne({
			where: { id: leagueId },
		});

		if (!leagueMatch)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		const players = await Player.findAll({
			where: {
				leagueId,
			},
		});

		return res.status(200).send(players);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getLeaguePlayers;
