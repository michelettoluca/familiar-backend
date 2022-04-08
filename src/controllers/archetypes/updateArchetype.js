const { Archetype } = require("../../models");
const validate = require("../../utils/Validate");
const { errorCode } = require("../../utils/constants");
const format = require("../../utils/format");

const deletePlayer = async (req, res) => {
	try {
		const { archetypeId } = req.params;
		const { name, colors, playstyle } = req.body;

		if (!validate.uuid(archetypeId))
			return res.status(400).send({ error: errorCode.INVALID_ARCHETYPE_UUID });

		if (!validate.string(name))
			return res.status(400).send({ error: errorCode.INVALID_ARCHETYPE_NAME });

		if (!validate.colors(colors))
			return res
				.status(400)
				.send({ error: errorCode.INVALID_ARCHETYPE_COLORS });

		if (!validate.playstyle(playstyle))
			return res
				.status(400)
				.send({ error: errorCode.INVALID_ARCHETYPE_PLAYSTYLE });

		const matchArchetype = await Archetype.findOne({
			where: { id: archetypeId },
		});

		if (!matchArchetype)
			return res.status(400).send({ error: errorCode.ARCHETYPE_NOT_FOUND });

		const fName = format.archetypeName(name);

		const updatedArchetype = await matchArchetype.update({
			name: fName,
			colors,
			playstyle,
		});

		return res.status(201).send(updatedArchetype);
	} catch (error) {
		console.log(error);
		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = deletePlayer;
