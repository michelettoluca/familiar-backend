const { League, Admin } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const deleteLeague = async (req, res) => {
	try {
		const { leagueId } = req.params;

		if (!validate.uuid(leagueId))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_UUID });

		const matchLeague = await League.findOne({ where: { id: leagueId } });

		if (!matchLeague)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		await matchLeague.destroy();
		await Admin.destroy({ where: { username: matchLeague.tag } });

		return res.status(201).send(matchLeague);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deleteLeague;
