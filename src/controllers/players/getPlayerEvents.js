const { Player, Event, EventResult, Archetype } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const getPlayerEvents = async (req, res) => {
	try {
		const { playerId } = req.params;

		if (!validate.uuid(playerId))
			return res.status(400).send({ error: errorCode.INVALID_PLAYER_UUID });

		const player = await Player.findOne({
			where: {
				id: playerId,
			},
		});

		if (!player)
			return res.status(400).send({ error: errorCode.PLAYER_NOT_FOUND });

		const events = await Event.findAll({
			include: [
				{
					model: EventResult,
					include: [{ model: Player }, { model: Archetype }],
					where: { playerId },
					order: ["date", "DESC"],
				},
			],
		});

		return res.status(200).send(events);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getPlayerEvents;
