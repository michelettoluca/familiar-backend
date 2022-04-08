const {
	Player,
	Event,
	EventResult,
	Archetype,
	League,
	Season,
} = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

/// ????????????????????????????????????????????

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

		const currentSeason = await Season.findOne({
			order: [["beginsAt", "DESC"]],
		});

		const events = await Event.findAll({
			where: {
				leagueId,
				seasonId: currentSeason.id,
			},
			include: [Season],
			order: [["date", "DESC"]],
		});

		const response = [];

		for (const { dataValues: event } of events) {
			const { dataValues: winner } = await EventResult.findOne({
				where: { eventId: event.id },
				include: [Player, Archetype],
				order: [["score", "DESC"]],
			});

			const playerCount = await EventResult.count({
				where: { eventId: event.id },
			});

			response.push({ ...event, winner: winner, playerCount });
		}

		return res.status(200).send(response);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getLeagueEvents;
