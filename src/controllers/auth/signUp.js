const Bcrypt = require("bcrypt");
const { Admin } = require("../../models");
const { errorCode } = require("../../utils/constants");
const validate = require("../../utils/Validate");

const handleSignUp = async (req, res) => {
	try {
		const { username, password, role } = req.body;

		if (!validate.string(username, { allowEmpty: false }))
			return res.status(403).send({ error: errorCode.INVALID_USERNAME });

		const userMatch = await Admin.findOne({ where: { username } });

		if (userMatch)
			return res.status(409).send({ error: errorCode.USERNAME_TAKEN });

		if (!validate.string(password, { allowEmpty: false }))
			return res.status(403).send({ error: errorCode.INVALID_PASSWORD });

		if (!validate.role(role))
			return res.status(403).send({ error: errorCode.INVALID_ROLE });

		const hashedPassword = await Bcrypt.hash(password, 10);

		await Admin.create({
			username,
			password: hashedPassword,
			role,
		});

		return res.status(201).send({ error: errorCode.SIGNED_UP });
	} catch (err) {
		console.error(err);

		return res.status(500).send({ error: errorCode.SERVER_ERROR });
	}
};

module.exports = handleSignUp;
