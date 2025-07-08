export default class AppError extends Error {
	status: number;
	details?: string;

	constructor(error: { message: string; details?: string; status?: number }) {
		super(error.message);
		this.name = this.constructor.name;
		this.details = error.details;
		this.status = error.status || 500;

		// Fixing prototype chain
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}
