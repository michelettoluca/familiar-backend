const { Player } = require("../../models");
const { errorCode } = require("../../utils/constants");

const getAllPlayer = async (req, res) => {
	try {
		const players = await Player.findAll();

		return res.status(200).send(players);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getAllPlayer;
