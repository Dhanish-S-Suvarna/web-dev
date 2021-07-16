class ErrorHandler {
	constructor(status, msg) {
		this.status = status;
		this.msg = msg;
	}

	static validationError(message = 'All fields Are Required') {
		return new ErrorHandler(422, message);
	}

	static notFoundError(message = 'Not Found!') {
		return new ErrorHandler(404, message);
	}

	static serverError(message = 'Internal Error!') {
		return new ErrorHandler(500, message);
	}
}

module.exports = ErrorHandler;
