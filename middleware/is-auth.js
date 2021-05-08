const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		req.isAuth = false;
		return next();
		// const error = new Error('Not authenticated.');
		// error.statusCode = 401;
		// throw error;
	}
	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, 'somesupersecret');
	} catch (err) {
		req.isAuth = false;
		return next();
		// err.statusCode = 50 0;
		// throw err;
	}
	if (!decodedToken) {
		req.isAuth = false;
		return next();
		// const error = new Error('Not authenticated.');
		// error.statusCode = 401;
		// throw error;
	}
	req.userId = decodedToken.userId;
	req.isAuth = true;
	next();
};
