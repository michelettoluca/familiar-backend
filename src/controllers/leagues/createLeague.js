const Bcrypt = require("bcrypt");
const { League, Admin, Database } = require("../../models");
const { role, errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const createLeague = async (req, res) => {
	try {
		const { name, tag, password } = req.body;

		if (!validate.string(name, { allowEmpty: false }))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_NAME });

		if (!validate.string(tag, { allowEmpty: false }))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_TAG });

		const matchLeague = await League.findOne({ where: { tag } });

		if (matchLeague)
			return res.status(400).send({ error: errorCode.LEAGUE_TAG_TAKEN });

		if (!validate.string(password, { allowEmpty: false }))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_PASSWORD });

		const hashedPassword = await Bcrypt.hash(password, 10);

		const league = await Database.transaction(async (transaction) => {
			const tmpLeague = await League.create(
				{
					name,
					tag,
				},
				{ transaction }
			);

			await Admin.create(
				{
					username: tag,
					password: hashedPassword,
					role: role.ORGANIZER,
				},
				{ transaction }
			);

			return tmpLeague;
		});

		return res.status(201).send(league);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = createLeague;
