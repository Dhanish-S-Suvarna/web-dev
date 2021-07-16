const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const validator = require('validator');

var mongoDB = 'mongodb://localhost:27017/my_database';

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log('connection error: ' + err));
db.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// * Schema Creation
const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	'roll No': {
		type: Number,
		required: true,

		// ! Custom Validation
		// ? First Method
		// validate: {
		// 	validator: (value) => {
		// 		return value.length < 0;
		// 	},
		// 	message: 'Roll number shoud be Positive',
		// },

		// ? Second Method
		validate(value) {
			if (value < 0) {
				throw new Error('Roll number shoud be Positive');
			}
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new mongoose.Error('Email is Invalid');
			}
		},
	},
	branch: String,
	year: {
		type: String,
		required: true,
		lowercase: true,
		enum: ['first', 'second', 'third', 'forth'],
	},
	active: Boolean,
	date: {
		type: Date,
		default: Date.now,
	},
});

// * Collection Creation
const Student = new mongoose.model('Student', studentSchema);

// * Create and insert document into the Student Collection
const createDocument = async () => {
	try {
		// const student_1 = new Student({
		// 	name: 'Dhanish S Suvarna',
		// 	'roll No': 50,
		// 	branch: 'ISE',
		// 	year: 'second',
		// 	active: true,
		// });
		// const student_2 = new Student({
		// 	name: 'Vaishnavi Hegde',
		// 	'roll No': 209,
		// 	branch: 'CSE',
		// 	year: 'second',
		// 	active: true,
		// });
		// const student_3 = new Student({
		// 	name: 'C N Tejas',
		// 	'roll No': 43,
		// 	branch: 'ISE',
		// 	year: 'second',
		// 	active: true,
		// });
		// const student_4 = new Student({
		// 	name: 'Chirag',
		// 	'roll No': 46,
		// 	branch: 'ISE',
		// 	year: 'second',
		// 	active: true,
		// });
		// await Student.insertMany([student_1, student_2, student_3, student_4]);

		const student_1 = new Student({
			name: 'Dhanish S Suvarna',
			'roll No': 50,
			email: 'dhanu@gmail.com',
			branch: 'ISE',
			year: 'second',
			active: true,
		});
		const result = await Student.insertMany([student_1]);
		console.log(result);
	} catch (err) {
		console.log(err);
	}
};
// createDocument();

// * Read Document
const getDocument = async () => {
	// * Search by ID
	// const result = await Student.find({
	// 	_id: ObjectId('60f06da1183197310868d0c5'),
	// });

	// * Search by field
	// const result = await Student.find({
	// 	branch: 'CSE',
	// }).select({ name: 1 });

	// * Comparison Operator
	// const result = await Student.find({
	// 	'roll No': { $lt: 50 },
	// })
	// 	.select({ name: 1 })
	// 	.limit(1);

	// * Logical and Comparison Operator
	// const result = await Student.find({
	// 	$and: [{ 'roll No': { $gt: 45 } }, { branch: 'ISE' }],
	// }).select({ name: 1 });

	// * Count of document
	// const result = await Student.find({
	// 	$and: [{ 'roll No': { $gt: 45 } }, { branch: 'ISE' }],
	// }).countDocuments();

	// * Sort on Alphabetical order of the name
	// const result = await Student.find().select({ name: 1 }).sort({ name: 1 });

	// * Sort on Reverse Alphabetical order of the name
	const result = await Student.find().select({ name: 1 }).sort({ name: -1 });
	console.log(result);
};
// getDocument();

// * Update Document
const updateDocument = async (_id) => {
	try {
		// * returns number of updates
		// const result = await Student.updateOne(
		// 	{ _id },
		// 	{
		// 		$set: { name: 'Chirag Yakkur' },
		// 	}
		// );

		// * Returns previous value before updation
		// const result = await Student.findByIdAndUpdate(
		// 	{ _id },
		// 	{
		// 		$set: { name: 'Chirag Yakkur' },
		// 	}
		// );

		// * Returns updated value after updation
		const result = await Student.findByIdAndUpdate(
			{ _id },
			{
				$set: { name: 'Chirag Yakkur' },
			},
			{
				new: true,
			}
		);
		console.log(result);
	} catch (err) {
		console.log(err);
	}
};
// updateDocument('60f06da1183197310868d0c8');

// * Delete Document
const deleteDocument = async (_id) => {
	try {
		// * Returns number of document deleted
		// const result = await Student.deleteOne({ _id });

		// * Returns deleted value
		const result = await Student.findByIdAndDelete({ _id });
		console.log(result);
	} catch (err) {
		console.log(err);
	}
};
// deleteDocument('60f0ff62fb1c7cbdcfd60587');
