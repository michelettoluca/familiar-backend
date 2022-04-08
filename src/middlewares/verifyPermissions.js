require("dotenv").config();

const verifyPermissions =
	(...allowedRoles) =>
	(req, res, next) => {
		// const { role } = req;

		// const matchRoles = allowedRoles.includes(role);

		// if (!matchRoles) return res.status(401).send({ msg: "Unauthorized" });

		next();
	};

module.exports = verifyPermissions;
