const { Player } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const deletePlayer = async (req, res) => {
	try {
		const { playerId } = req.params;

		if (!validate.uuid(playerId))
			return res.status(400).send({ error: errorCode.INVALID_PLAYER_UUID });

		const matchPlayer = await Player.findOne({ where: { id: playerId } });

		if (!matchPlayer)
			return res.status(400).send({ error: errorCode.PLAYER_NOT_FOUND });

		await matchPlayer.destroy();

		return res.status(201).send(matchPlayer);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deletePlayer;
