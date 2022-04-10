const { League, Admin, Database } = require("../../models");
const { errorCode } = require("../../utils/constants");
const Bcrypt = require("bcrypt");
const validate = require("../../utils/Validate");

const updateLeague = async (req, res) => {
	try {
		const { leagueId } = req.params;
		const { name, tag, password } = req.body;

		if (name && !validate.string(name))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_NAME });

		if (tag && !validate.string(tag))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_TAG });

		if (password && !validate.string(password))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_PASSWORD });

		const matchLeague = await League.findOne({
			where: { id: leagueId },
		});

		if (!matchLeague)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		const adminMatch = await Admin.findOne({
			where: { username: matchLeague.tag },
		});

		if (matchLeague && matchLeague.id !== matchLeague.id)
			return res.status(400).send({ error: errorCode.LEAGUE_TAG_TAKEN });

		let hashedPassword;
		if (password) hashedPassword = await Bcrypt.hash(password, 10);

		const updatedLeague = await Database.transaction(async (transaction) => {
			const tmpUpdatedLeague = await matchLeague.update(
				{ name, tag },
				{ transaction }
			);

			await adminMatch.update(
				{ username: tag, password: password ? hashedPassword : undefined },
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
