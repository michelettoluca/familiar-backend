const { Player, League, PlayerLeague, Database } = require("../../models");
const { Op } = require("sequelize");
const validate = require("../../utils/Validate");
const format = require("../../utils/format");
const { errorCode } = require("../../utils/constants");

const createPlayer = async (req, res) => {
	try {
		const { firstName, lastName, leagueId } = req.body;

		if (!validate.string(firstName, { allowEmpty: false }))
			return res
				.status(400)
				.send({ error: errorCode.INVALID_PLAYER_FIRSTNAME });

		if (!validate.string(lastName, { allowEmpty: false }))
			return res.status(400).send({ error: errorCode.INVALID_PLAYER_LASTNAME });

		if (!validate.uuid(leagueId))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_UUID });

		const matchLeague = await League.findOne({
			where: { id: leagueId },
		});

		if (!matchLeague)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		const fFirstName = format.name(firstName);
		const fLastName = format.name(lastName);

		const homonymsCount = await Player.count({
			where: {
				[Op.and]: {
					firstName: fFirstName,
					lastName: fLastName,
				},
			},
		});

		const fUsername = format.username(fFirstName, fLastName, homonymsCount);

		const player = await Database.transaction(async (transaction) => {
			const tmpPlayer = await Player.create(
				{
					firstName: fFirstName,
					lastName: fLastName,
					username: fUsername,
				},
				{ transaction }
			);

			await PlayerLeague.create(
				{
					playerId: tmpPlayer.id,
					leagueId,
				},
				{ transaction }
			);

			return tmpPlayer.dataValues;
		});

		return res.status(201).send(player);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = createPlayer;
