import {errorResponse,} from '../helpers/response';
import UserService from '../services/user.service';

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} function to check if the user exists
 */

const checkUserExists=async(req, res, next)=> {
	const user = await UserService.findUser({
		email: req.body.email,
	});

	if (user) {
		return	errorResponse(res,409, 'Email already in use');
	
	}
	next();
}
export default checkUserExists;
