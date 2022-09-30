package main

// This calls a JS function from Go.
func main() {
	msg := "adding two numbers:"
	result := add(2, 3)
	println(msg, result) // stdout prints to browser dev console
}

// This function is imported from JavaScript, as it doesn't define a body.
// You should define a function named 'main.add' in the WebAssembly 'env'
// module from JavaScript.
// TODO Adding a string param (e.g. msg) breaks this?
func add(x int, y int) int

// This function is exported to JavaScript, so can be called using
// exports.multiply() in JavaScript.
//export multiply
func multiply(x, y int) int {
	return x * y
}
