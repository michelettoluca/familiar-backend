const { DataTypes } = require("sequelize");

module.exports = Database =>
	Database.define(
		"player",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true,
				defaultValue: DataTypes.UUIDV4,
			},
			firstName: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			lastName: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			username: {
				type: DataTypes.TEXT,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
		},
		{ timestamps: false }
	);
