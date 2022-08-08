const User = require('../model/user');

const usersQueries = {
	
	getUser: async function (filter) {
		const users = await User.find(filter);
		return users;
	},
	// get one user as javascript object
	getOneLeanUser: async function (filter) {
		const user = await User.findOne(filter).lean();
		return user;
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