import {errorResponse,} from '../helpers/response';
import UserService from '../services/user.service';
import TokenUtil from '../helpers/token';

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} function to check if the user is logged in
 */

const checkAuth=async(req, res, next)=> {
	const authToken = req.header('Authorization');
	if (!authToken) {
		return errorResponse(res, 400, 'You haven\'t provide your token');
	}
	try{
		const userId =parseInt(TokenUtil.userIdFromToken(req.header('Authorization')),10);
		const user = await UserService.findUser({
			id:userId
		});

		if (!user) {
			errorResponse(res,401, 'Unauthorized,create account first');
	
		}
		next();}
	catch (error) {
		return errorResponse(res, 400, error);
	}
}
export default checkAuth;
