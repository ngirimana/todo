import Joi from "joi";
import {errorResponse} from '../helpers/response';
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {method} next 
 */

const signUpValidation = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required().messages({
			'any.required': 'Full name is required',
			'string.empty': 'Full name is not allowed to be empty',
		}),
		email:Joi.string().email({ minDomainSegments: 2}).required().messages({
			'any.required': 'Email is required',
			'string.empty': 'Email is not allowed to be empty',
		}),
		password: Joi.string().required().messages({
			'any.required': 'Password is required',
			'string.empty': 'Password should not be empty',
		}),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);

	if (error) {
		const errors = error.details.map(err => err.message);
		return errorResponse(res, 400, errors);
	}
	next();
};

export default signUpValidation;
