const apiKey = (req, res, next) => {
	const api_key = '1234567';
	const user_api_key = req.query.api_key;

	console.log(user_api_key);

	if (user_api_key && user_api_key === api_key) {
		next();
	} else {
		res.json({ message: 'Not Allowed!' });
	}
};

module.exports = apiKey;
