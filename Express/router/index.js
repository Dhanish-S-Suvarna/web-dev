const router = require('express').Router();
const apiKeyMiddleware = require('../middleware/apiKey');

router.get('/', (req, res) => {
	// res.sendFile(path.resolve(__dirname) + '/index.html');
	res.render('index', {
		title: 'My Home Page',
	});
});

router.get('/about', (req, res) => {
	// res.sendFile(path.resolve(__dirname) + '/about.html');
	res.render('about', {
		title: 'My About Page',
	});
});

router.get('/download', (req, res) => {
	res.download(path.resolve(__dirname) + './about.html');
});

// router.get('/api/users', apiKeyMiddleware, (req, res) => {
// 	res.json([
// 		{
// 			id: '63',
// 			name: 'Lela',
// 			salary: '2891.0853',
// 		},
// 		{
// 			id: '25',
// 			name: 'Bernard',
// 			salary: '8041.1805',
// 		},
// 		{
// 			id: '26',
// 			name: 'Lucile',
// 			salary: '4443.5039',
// 		},
// 		{
// 			id: '84',
// 			name: 'Lola',
// 			salary: '3421.7825',
// 		},
// 	]);
// });

module.exports = router;
