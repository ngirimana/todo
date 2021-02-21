import models from "../database/models";

const { User} = models;

/**
 * User service class
*/
class UserService {
	/**
	 * @param {object} user user informatin
	 * @returns {object} function to create a user
	*/
	static createUser(user) {
		return User.create(user);
	}

	/**
	 * @param {object} attribute
	 * @returns {object} function to display a user
	*/
	static findUser(attribute) {
		return User.findOne({ where: attribute });
	}
}

export default UserService;
