
import { config } from 'dotenv';
import {errorResponse,successResponse} from '../helpers/response';
import BcryptService from '../helpers/hashPassword';
import UserService from '../services/user.service';
import TokenService from '../helpers/token';

config();


/**
 * Auth controller Class
 */
class AuthController {
	/**
	 * Authentication function for user signup
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} function to signup a user
	 */
	static async signup(req, res) {
		try {
			const userData = {
				name :req.body.name,
				email: req.body.email,
				password: BcryptService.hashPassword(req.body.password),
			};
			const user = await UserService.createUser(userData);
			const token = TokenService.generateToken(user.id,user.email);
	
			return successResponse(res,201, 'User created successfully', {
				token,
				id: user.id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
			
		} catch (error) {
			return errorResponse(res,500,error);
		}
	}

	/**
	 * Authentication function for user login
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} server response
	 */
	static async login(req, res) {
		const {email,password} = req.body;
		const user = await UserService.findUser({email});
		try {
			if ( user){
				const isPasswordMatch = BcryptService.comparePassword(password,user.password);
				if (!isPasswordMatch) {
					return errorResponse(res, 403, 'Your password is incorrect');
				};
				const token = TokenService.generateToken(user.id,user.email);
				return successResponse(res,200, 'Logged in successfully!',  {
					token,
					id: user.id,
					name: user.name,
					email: user.email,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				});
			}
			return errorResponse(res, 401, 'You are not authorized to access this resouces');
			
		}
		 
		 catch (error) {
			return errorResponse(res,500,error);
			
		}
	}
}

export default AuthController;