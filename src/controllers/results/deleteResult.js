const { EventResult } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/validate");

const deleteResult = async (req, res) => {
	try {
		const { eventId, resultId } = req.params;

		if (!validate.uuid(eventId))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_UUID });

		if (!validate.uuid(resultId))
			return res.status(400).send({ error: errorCode.INVALID_RESULT_UUID });

		const matchResult = await EventResult.findOne({
			where: { [Op.and]: { id: resultId, eventId } },
		});

		if (!matchResult)
			return res.status(400).send({ error: errorCode.RESULT_NOT_FOUND });

		await matchResult.destroy();

		return res.status(201).send(matchResult);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deleteResult;
