class format {
	static username(firstName, lastName, number) {
		const _firstName = firstName.charAt(0).toLowerCase();
		const _lastName = lastName.replace(/\s/g, "").toLowerCase();

		const username = _firstName + "." + _lastName;

		return number ? username + "." + number : username;
	}

	static name(name) {
		const splittedName = name.trim().replace(/\s\s+/g, " ").split(" ");

		return splittedName
			.map(
				(tmpString) =>
					tmpString.charAt(0).toUpperCase() + tmpString.slice(1).toLowerCase()
			)
			.join(" ");
	}

	static archetypeName(archetypeName) {
		return archetypeName.trim().replace(/\s\s+/g, " ");
	}

	static date(date) {
		const [year, month, day] = date.split("-");

		return month + "-" + day + "-" + year;
	}
}

module.exports = format;
