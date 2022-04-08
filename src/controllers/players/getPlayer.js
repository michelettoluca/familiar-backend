const { Player } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const getPlayer = async (req, res) => {
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

		return res.status(200).send(player);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getPlayer;
