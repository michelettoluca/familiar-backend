const { DataTypes } = require("sequelize");
const { role } = require("../utils/constants");

module.exports = Database =>
	Database.define(
		"admin",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true,
				defaultValue: DataTypes.UUIDV4,
			},
			username: {
				type: DataTypes.TEXT,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			role: {
				type: DataTypes.ENUM(role.ADMIN, role.ORGANIZER),
				allowNull: false,
			},
			refreshToken: {
				type: DataTypes.TEXT,
			},
		},
		{ timestamps: false }
	);
