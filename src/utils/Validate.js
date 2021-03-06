const typeOf = (obj) =>
	Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

const {
	eventType: eventTypes,
	role,
	color,
	playstyle,
} = require("./constants");

class validate {
	static string(value, { allowEmpty = true } = {}) {
		if (typeOf(value) !== "string") return false;

		if (!allowEmpty && value === "") return false;

		return true;
	}

	static number(value) {
		return typeOf(value) === "number";
	}

	static date(value) {
		if (!this.string(value)) return false;

		return true;
	}

	static uuid(value) {
		if (!this.string(value, { allowEmpty: false })) return false;

		const uuidTemplate =
			/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

		return uuidTemplate.test(value);
	}

	static eventType(value) {
		// if (!this.string(value, { allowEmpty: false })) return false;

		console.log(eventTypes);

		return Object.keys(eventTypes).includes(value);
	}

	static role(value) {
		return Object.keys(role).includes(value);
	}

	static playstyle = (value) => Object.values(playstyle).includes(value);

	static colors = (values) =>
		values.every((value) => Object.values(color).includes(value));

	static result(value) {
		const { playerId, archetypeId, score, rank } = value;

		return (
			this.uuid(playerId) &&
			this.uuid(archetypeId) &&
			this.number(score) &&
			this.number(rank)
		);
	}
}

module.exports = validate;
