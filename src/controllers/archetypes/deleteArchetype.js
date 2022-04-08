const { Archetype } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const deleteArchetype = async (req, res) => {
	try {
		const { archetypeId } = req.params;

		if (!validate.uuid(archetypeId))
			return res.status(400).send({ error: errorCode.INVALID_ARCHETYPE_UUID });

		const matchArchetype = await Archetype.findOne({
			where: { id: archetypeId },
		});

		if (!matchArchetype)
			return res.status(400).send({ error: errorCode.ARCHETYPE_NOT_FOUND });

		await matchArchetype.destroy();

		return res.status(201).send(matchArchetype);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deleteArchetype;
