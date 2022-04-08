const { DataTypes } = require("sequelize");

module.exports = Database =>
	Database.define(
		"league",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			tag: {
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
