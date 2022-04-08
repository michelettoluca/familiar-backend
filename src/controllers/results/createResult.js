const { Player, Archetype, Event, EventResult } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/validate");

const addResult = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { playerId, archetypeId, score } = req.body;

		if (!validate.uuid(eventId))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_UUID });

		const matchEvent = await Event.findOne({ where: { id: eventId } });

		if (!matchEvent)
			return res.status(400).send({ error: errorCode.EVENT_NOT_FOUND });

		if (!validate.uuid(playerId))
			return res.status(400).send({ error: errorCode.INVALID_PLAYER_UUID });

		const matchPlayer = await Player.findOne({
			where: { id: playerId },
		});

		if (!matchPlayer)
			return res.status(400).send({ error: errorCode.PLAYER_NOT_FOUND });

		if (!validate.uuid(archetypeId))
			return res.status(400).send({ error: errorCode.INVALID_ARCHETYPE_UUID });

		const matchArchetype = await Archetype.findOne({
			where: { id: archetypeId },
		});

		if (!matchArchetype)
			return res.status(400).send({ error: errorCode.ARCHETYPE_NOT_FOUND });

		if (!validate.number(score))
			return res.status(400).send({ error: errorCode.INVALID_RESULT_SCORE });

		const newResult = await EventResult.create({
			eventId,
			playerId,
			archetypeId,
			score,
		});

		return res.status(201).send(newResult);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = addResult;
