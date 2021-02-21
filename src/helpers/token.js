import jwt from 'jsonwebtoken';


class TokenUtil {
	/**
	 * @param {object} data
	 * @returns {string} function to generate a token string
	 */
	static generateToken(data) {
		return jwt.sign(data, process.env.SECRET, {});
	}

}

export default TokenUtil;