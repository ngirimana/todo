import jwt from 'jsonwebtoken';


class TokenUtil {
	/**
	 * @param {integer} id
	 * @param {string} email
	 * @returns {string} function to generate a token string
	 */
	static generateToken(id,email) {
		const token = jwt.sign({
			Id: id,
			Email:email,
		  }, process.env.SECRET, { expiresIn: '1d' });
		  return token;
	}
	/**
	 * Method to return userid from token
	 * @param {String} token 
	 * @returns {integer} function to return id from a token string
	 */

	static userIdFromToken (token)  {
		const mytoken = jwt.verify(token, process.env.SECRET);
	  
		return mytoken.Id;
	  };

}

export default TokenUtil;