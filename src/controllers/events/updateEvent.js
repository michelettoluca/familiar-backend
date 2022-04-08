const { Event } = require("../../models");
const Season = require("../../models/Season");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const updateEvent = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { name, date, seasonId } = req.body;

		if (!validate.uuid(eventId))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_UUID });

		if (!validate.date(date))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_DATE });

		if (!validate.uuid(seasonId))
			return res.status(400).send({ error: errorCode.INVALID_SEASON_UUID });

		const matchEvent = await Event.findOne({ where: { id: eventId } });
		if (!matchEvent)
			return res.status(400).send({ error: errorCode.EVENT_NOT_FOUND });

		const matchSeason = await Season.findOne({ where: { id: seasonId } });
		if (!matchSeason)
			return res.status(400).send({ error: errorCode.SEASON_NOT_FOUND });

		const updatedEvent = await matchEvent.update({ name, date, seasonId });

		return res.status(201).send(updatedEvent);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = updateEvent;
