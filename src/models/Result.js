const { DataTypes } = require("sequelize");

module.exports = Database =>
	Database.define(
		"result",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true,
				defaultValue: DataTypes.UUIDV4,
			},
			score: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			rank: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
