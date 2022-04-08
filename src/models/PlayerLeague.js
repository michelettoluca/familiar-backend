const { DataTypes } = require("sequelize");

module.exports = Database =>
	Database.define(
		"players_leagues",
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				unique: true,
				defaultValue: DataTypes.UUIDV4,
			},
		},
		{ timestamps: false }
	);
