const { Archetype } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const getArchetype = async (req, res) => {
	try {
		const { archetypeId } = req.params;

		if (!validate.uuid(archetypeId))
			return res.status(400).send({ error: errorCode.INVALID_ARCHETYPE_UUID });

		const archetype = await Archetype.findOne({
			where: { id: archetypeId },
		});

		if (!archetype)
			return res.status(400).send({ error: errorCode.ARCHETYPE_NOT_FOUND });

		return res.status(200).send(archetype);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = getArchetype;
