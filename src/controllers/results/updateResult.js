const { EventResult } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/validate");

const updateResult = async (req, res) => {
	try {
		const { resultId } = req.params;
		const { playerId, archetypeId, score } = req.body;

		if (playerId && !validate.uuid(eventId))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_UUID });

		if (archetypeId && !validate.uuid(resultId))
			return res.status(400).send({ error: errorCode.INVALID_RESULT_UUID });

		if (score && !validate.number(score))
			return res.status(400).send({ error: errorCode.INVALID_RESULT_SCORE });

		const matchResult = await EventResult.findOne({
			where: { id: resultId },
		});

		if (!matchResult)
			return res.status(400).send({ error: errorCode.RESULT_NOT_FOUND });

		const updatedLeague = await matchResult.update({
			playerId,
			archetypeId,
			score,
		});

		return res.status(201).send(updatedLeague);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = updateResult;
