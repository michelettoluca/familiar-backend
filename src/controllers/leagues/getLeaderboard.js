const { Event, Result, Player, League, Season } = require("../../models");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

const validate = require("../../utils/validate");
const { eventType, errorCode } = require("../../utils/constants");

const getLeaderboard = async (req, res) => {
	try {
		const { leagueId } = req.params;

		if (!validate.uuid(leagueId))
			return res.status(400).send({ error: errorCode.INVALID_LEAGUE_UUID });

		const leagueMatch = await League.findOne({
			where: { id: leagueId },
		});

		if (!leagueMatch)
			return res.status(400).send({ error: errorCode.LEAGUE_NOT_FOUND });

		const leaderboard = await Result.findAll({
			attributes: [[sequelize.fn("SUM", sequelize.col("score")), "points"]],
			group: ["player.id"],
			include: [
				{
					model: Event,
					where: {
						[Op.and]: [
							// { seasonId: currentSeason.id },
							{ leagueId },
							{ type: eventType.REGULAR },
						],
					},
					attributes: [],
				},
				Player,
			],
			order: [[sequelize.col("points"), "DESC"]],

			raw: true,
			nest: true,
		});

		return res.status(200).send(leaderboard);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getLeaderboard;
