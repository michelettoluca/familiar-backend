const {
	Player,
	League,
	Event,
	Result,
	Archetype,
	Season,
} = require("../../models");

const format = require("../../utils/format");
const validate = require("../../utils/validate");
const { eventType, errorCode } = require("../../utils/constants");

const createEvent = async (req, res) => {
	try {
		const { type, name, date, seasonId, leagueId, results } = req.body;

		if (!validate.eventType(type))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_TYPE });

		if (
			type === eventType.OFF_SEASON &&
			!validate.string(name, { allowEmpty: false })
		)
			return res.status(400).send({ error: errorCode.INVALID_EVENT_NAME });

		if (!validate.date(date))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_DATE });

		if (!validate.uuid(seasonId))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_UUID });

		const matchSeason = await Season.findOne({
			where: { id: seasonId },
		});

		if (!matchSeason)
			return res.status(400).send({ error: errorCode.SEASON_NOT_FOUND });

		if (!validate.uuid(leagueId))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_UUID });

		const matchLeague = await League.findOne({
			where: { id: leagueId },
		});

		if (!matchLeague)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		if (!results || results?.length < 2)
			return res.status(400).send({ error: errorCode.NOT_ENOUGH_RESULTS });

		for (const { playerId, archetypeId, score, rank } of results) {
			if (!validate.uuid(playerId))
				return res.status(400).send({ error: errorCode.INVALID_PLAYER_UUID });

			const matchPlayer = await Player.findOne({
				where: { id: playerId },
			});

			if (!matchPlayer)
				return res.status(400).send({ error: errorCode.PLAYER_NOT_FOUND });

			if (!validate.uuid(archetypeId))
				return res
					.status(400)
					.send({ error: errorCode.INVALID_ARCHETYPE_UUID });

			const matchArchetype = await Archetype.findOne({
				where: { id: archetypeId },
			});

			if (!matchArchetype)
				return res.status(400).send({ error: errorCode.ARCHETYPE_NOT_FOUND });

			if (!validate.number(score))
				return res.status(400).send({ error: errorCode.INVALID_RESULT_SCORE });

			if (!validate.number(rank))
				return res.status(400).send({ error: errorCode.INVALID_RESULT_RANK });

			console.log({ playerId, archetypeId, score, rank });
		}

		const fDate = format.date(date);

		const event = await Event.create(
			{
				type,
				name: type === eventType.OFF_SEASON ? name : "Tappa regolare",
				date: fDate,
				seasonId,
				leagueId,
				results,
			},
			{ include: [Result] }
		);

		return res.status(201).send(event);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = createEvent;
