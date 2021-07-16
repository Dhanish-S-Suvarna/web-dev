const express = require('express');
const app = express();

// DB setup
const MongoClient = require('mongodb').MongoClient;
let db;
const connectionURL = 'mongodb://ecomUser:something@localhost:27017/ecom';
const ObjectId = require('mongodb').ObjectId;

(async () => {
	try {
		const client = await MongoClient.connect(connectionURL);
		db = client.db('ecom');
	} catch (err) {
		throw err;
	}
})();

app.get('/', async (req, res) => {
	// insertedId: "60ef2f762293cfad5ea847ad"

	// ! Print document from Collection with name field Camera
	try {
		const result = await db
			.collection('products')
			.findOne({ name: { $eq: 'Camera' } });
		res.send(result);
	} catch (err) {
		throw err;
	}

	// ! Print document from Collection with specified ObjectId
	// try {
	// 	const result = await db
	// 		.collection('products')
	// 		.findOne({ _id: ObjectId('60ef2f762293cfad5ea847ad') });
	// 	res.send(result);
	// } catch (err) {
	// 	throw err;
	// }

	// ! Insert document into collection
	// try {
	// 	const result = await db.collection('products').insertOne({
	// 		name: 'Camera',
	// 		price: 500,
	// 	});
	// 	res.send(result);
	// } catch (err) {
	// 	throw err;
	// }

	// ! Print entire products Collection
	// try {
	// 	const result = await db.collection('products').find().toArray();
	// 	res.send(result);
	// } catch (err) {
	// 	throw err;
	// }
});

app.listen(4000, () => {
	console.log('Listening on Port 4000');
});
