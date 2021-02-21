
/**
 * 
 * @param {Object} res 
 * @param {Integer} status 
 * @param {Object} resError 
 */

export const errorResponse = (res, status, resError) => {
	  res.status(status).json({
		status,
		error: resError,
  
	  });
};

/**
   * 
   * @param {Object} res 
   * @param {Integer} status 
   * @param {String} resMessage 
   * @param {Object} data 
   */

export const successResponse = (res, status, resMessage, data) => {
	res.status(status).json({
		status,
		message: resMessage,
		data,
	  });
};
  
