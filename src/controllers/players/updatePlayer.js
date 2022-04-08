const { Player } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const deletePlayer = async (req, res) => {
	try {
		const { playerId } = req.params;
		const { firstName, lastName, username } = req.body;

		if (!validate.uuid(playerId))
			return res.status(400).send({ error: errorCode.INVALID_PLAYER_UUID });

		const matchPlayer = await Player.findOne({ where: { id: playerId } });

		if (!matchPlayer)
			return res.status(400).send({ error: errorCode.PLAYER_NOT_FOUND });

		if (!validate.string(firstName))
			return res
				.status(400)
				.send({ error: errorCode.INVALID_PLAYER_FIRSTNAME });

		if (!validate.string(lastName))
			return res.status(400).send({ error: errorCode.INVALID_PLAYER_UUID });

		if (!validate.string(username))
			return res.status(400).send({ error: errorCode.INVALID_PLAYER_UUID });

		const updatedPlayer = await matchPlayer.update({
			firstName,
			lastName,
			identifier: username,
		});

		return res.status(201).send(updatedPlayer);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deletePlayer;
