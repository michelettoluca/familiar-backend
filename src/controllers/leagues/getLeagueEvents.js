const sequelize = require("sequelize");
const {
	Player,
	Event,
	Result,
	Archetype,
	League,
	Season,
} = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const getLeagueEvents = async (req, res) => {
	try {
		const { leagueId } = req.params;

		if (!validate.uuid(leagueId))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_UUID });

		const leagueMatch = await League.findOne({
			where: { id: leagueId },
		});

		if (!leagueMatch)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		const events = await Event.findAll({
			where: { leagueId },
			include: [
				{ model: Season },
				{ model: Result, include: [Player, Archetype] },
			],
			order: [
				["date", "DESC"],
				[Result, "rank", "ASC"],
			],
		});

		return res.status(200).send(events);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getLeagueEvents;
