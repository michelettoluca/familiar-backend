const { DataTypes } = require("sequelize");
const { eventType } = require("../utils/constants");

module.exports = Database =>
	Database.define(
		"event",
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
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			type: {
				type: DataTypes.ENUM(eventType.REGULAR, eventType.OFF_SEASON),
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
