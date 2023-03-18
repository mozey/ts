import { sprintf } from "sprintf-js"

// HttpError must be returned (by functions or methods) on error...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
// ...instead of null or undefined
// https://stackoverflow.com/a/48197438/639133
// Callers can then use "instanceof HttpError" to check for errors
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
// "explicitly check for errors where they occur [instead of] 
// throwing exceptions and sometimes catching them"
// https://go.dev/blog/error-handling-and-go
export class HttpError extends Error {
	method: string | null = null
	path: string | null = null

	constructor(method: string | null, path: string | null, ...params: any) {
		super(...params)
		if (method) {
			this.method = method
		}
		if (path) {
			this.path = path
		}
	}

	// error can be used for logging, 
	// i.e. console.error(...HttpError.error())
	error(): any {
		if (this.path) {
			return [sprintf("%s %s %s", this.method, this.path, this.message)]
		} else {
			// Avoid logging "undefined"
			return [this.message]
		}
	}
}
