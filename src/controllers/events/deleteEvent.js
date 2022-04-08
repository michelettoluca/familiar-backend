const { Event, EventResult, Database } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const deleteEvent = async (req, res) => {
	try {
		const { eventId } = req.params;

		if (!validate.uuid(eventId))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_UUID });

		const matchEvent = await Event.findOne({ where: { id: eventId } });

		if (!matchEvent)
			return res.status(400).send({ error: errorCode.EVENT_NOT_FOUND });

		await Database.transaction(async (transaction) => {
			await matchEvent.destroy({}, { transaction });
			await EventResult.destroy({ where: { eventId } }, { transaction });
		});

		return res.status(201).send(matchEvent);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deleteEvent;
