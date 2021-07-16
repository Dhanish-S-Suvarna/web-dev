const router = require('express').Router();
const ErrorHandler = require('../errors/ErrorHandler');
let users = require('../userData');

router.get('/users', (req, res) => {
	res.render('users', {
		title: 'My User Page',
	});
});

router.get('/api/users', (req, res) => {
	res.json(users);
});

router.post('/api/users', (req, res, next) => {
	const { name, salary } = req.body;
	if (!name || !salary) {
		next(ErrorHandler.validationError());
		return;
		// throw new Error('All Fields Are required');
		// return res.status(422).json({ error: 'All fields are required' });
	}

	const newUser = {
		id: new Date().getTime().toString(),
		name,
		salary,
	};

	users.push(newUser);
	res.json(newUser);
});

router.delete('/api/users/:userId', (req, res) => {
	users = users.filter((product) => req.params.userId !== product.id);
	res.json({ status: 'OK' });
});

module.exports = router;
