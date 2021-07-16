const express = require('express');
const app = express();
const path = require('path');
const ErrorHandler = require('./errors/ErrorHandler');
const PORT = process.env.PORT || 3000;
const mainRouter = require('./router/index');
const productRouter = require('./router/users');

// Middleware
app.use(express.static('public'));
app.use(express.json());

// To set the View Engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname) + '/myViews');

// Routes
app.use(mainRouter);
app.use(productRouter);

app.use((req, res, next) => {
	return res.json({ message: 'Page not Found' });
});

app.use((err, req, res, next) => {
	if (err instanceof ErrorHandler) {
		res.status(404).json({
			error: {
				message: err.msg,
				status: err.status,
			},
		});
	} else {
		res.status(500).json({
			error: {
				message: err.msg,
				status: err.status,
			},
		});
	}
});

app.listen(PORT, (req, res) => {
	console.log(`Server is listening on port ${PORT}`);
});
