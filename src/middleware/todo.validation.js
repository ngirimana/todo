import Joi from "joi";
import {errorResponse} from '../helpers/response';
/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {method} next 
 */

const todoValidation = (req, res, next) => {
	const schema = {
		title: Joi.string().max(100).required(),
		description:Joi.string().required(),
		priority: Joi.string().required(),
	}

	const result = Joi.validate(req.body, schema);
	if (result.error !== null) {
		return errorResponse(res, 400, `${result.error.details[0].message}`);
	}
	next();
};

export default todoValidation;
