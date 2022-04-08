const { Archetype } = require("../../models");
const { errorCode } = require("../../utils/constants");

const getAllArchetypes = async (req, res) => {
	try {
		const archetypes = await Archetype.findAll();

		return res.status(200).send(archetypes);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getAllArchetypes;
