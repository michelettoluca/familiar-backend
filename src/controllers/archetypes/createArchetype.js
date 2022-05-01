const { Archetype } = require("../../models");
const { errorCode } = require("../../utils/constants");
const format = require("../../utils/format");
const validate = require("../../utils/Validate");

const createArchetype = async (req, res) => {
	try {
		const { name, colors, playstyle } = req.body;

		console.log("#########################", { name, colors, playstyle });

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

		const fName = format.archetypeName(name);

		const matchArchetype = await Archetype.findOne({
			where: { name: fName },
		});

		if (matchArchetype)
			return res.status(400).send({ error: errorCode.ARCHETYPE_NAME_TAKEN });

		const archetype = await Archetype.create({
			name: fName,
			colors,
			playstyle,
		});

		return res.status(201).send(archetype);
	} catch (err) {
		console.log(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = createArchetype;
