// INUTILE FORSE

const { Season } = require("../../models");

const getCurrentSeason = async (req, res) => {
	try {
		const currentSeason = await Season.findOne({
			order: [["beginsAt", "DESC"]],
		});

		return res.status(200).send(currentSeason);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ msg: "Server error" });
	}
};

module.exports = getCurrentSeason;
