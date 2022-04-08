const { DataTypes } = require("sequelize");
const { color, playstyle } = require("../utils/constants");

module.exports = Database =>
	Database.define(
		"archetype",
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
			colors: {
				type: DataTypes.ARRAY(
					DataTypes.ENUM(
						color.WHITE,
						color.BLUE,
						color.BLACK,
						color.RED,
						color.GREEN
					)
				),
			},
			playstyle: {
				type: DataTypes.ENUM(
					playstyle.AGGRO,
					playstyle.CONTROL,
					playstyle.COMBO,
					playstyle.TEMPO,
					playstyle.MIDRANGE,
					playstyle.PRISON
				),
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
