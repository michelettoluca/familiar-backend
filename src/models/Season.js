const { DataTypes } = require("sequelize");

module.exports = Database =>
	Database.define(
		"season",
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
			endsAt: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
