const User = require('../db-models');

const usersQueries = {
	// get one user
	getUser: async function (filter) {
		const users = await User.find(filter);
		return users;
	},
	// delete one user
	deleteOneUser: async function (id) {
		const user = await User.findByIdAndDelete(id);
		return user;
	},
	// update an existing user
	updateOneUser: async function (id, obj) {
		const user = await User.findByIdAndUpdate(id, obj);
		return user;
	},
	// create a new user
	insertOneUser: async function (user) {
		const users = await User.insertMany(user);
		return users;
	}
}

module.exports = usersQueries;