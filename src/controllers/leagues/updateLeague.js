const { League, Admin, Database } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const updateLeague = async (req, res) => {
	try {
		const { leagueId } = req.params;
		const { name, tag, password } = req.body;

		if (!validate.string(name))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_NAME });

		if (!validate.string(tag))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_TAG });

		if (!validate.string(password))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_PASSWORD });

		const matchLeagueToUpdate = await League.findOne({
			where: { id: leagueId },
		});

		if (!matchLeagueToUpdate)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		const adminMatch = await Admin.findOne({
			where: { username: matchLeagueToUpdate.tag },
		});

		const matchLeague = await League.findOne({ where: { tag } });

		if (matchLeague && matchLeague.id !== matchLeagueToUpdate.id)
			return res.status(400).send({ error: errorCode.LEAGUE_TAG_TAKEN });

		const hashedPassword = await Bcrypt.hash(password, 10);

		const updatedLeague = await Database.transaction(async (transaction) => {
			const tmpUpdatedLeague = await matchLeagueToUpdate.update(
				{ name, tag },
				{ transaction }
			);
			await adminMatch.update(
				{ username: tag, password: hashedPassword },
				{ transaction }
			);

			return tmpUpdatedLeague;
		});

		return res.status(201).send(updatedLeague);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = updateLeague;
