const { Event, Result, Player, Archetype, Season } = require("../../models");
const validate = require("../../utils/Validate");
const { errorCode } = require("../../utils/constants");

const getLeagueById = async (req, res) => {
	try {
		const { eventId } = req.params;

		if (!validate.uuid(eventId))
			return res.status(400).send({ error: errorCode.INVALID_EVENT_UUID });

		const event = await Event.findOne({
			where: { id: eventId },
			include: [
				{
					model: Result,
					include: [Player, Archetype],
				},
				{ model: Season },
			],
			order: [[Result, "score", "DESC"]],
		});

		if (!event)
			return res.status(400).send({ error: errorCode.EVENT_NOT_FOUND });

		return res.status(200).send(event);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getLeagueById;
