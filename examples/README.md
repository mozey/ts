## TypeScript By Example

I started writing web apps in JavaScript around 2005.
The thing I liked most about it back then was,
I could easily experiment with just a browser and a text editor.
Zero configuration.
There was no need to install dev environment stuff or frameworks.
Almost every computer already had a browser and a text editor,
just sit down and start programming.

Fast forward a decade and a half and almost everyone uses a JS framework.
All of them have a significant learning curve.
Serious front end devs must use the popular framework flavour of the month,
or face raised eyebrows

What if we can go back to the days of just including a `<script>` tag.
No 100s of MBs of `node_modules`. No complicated build system.

Another import part of what made programming the browser fun 
was instant visual feedback you could easily inspect and understand, 
the [DOM](https://www.w3schools.com/whatis/whatis_htmldom.asp).
Many modern frameworks make it very hard for the user to understand 
the rendered page source by wrapping it in layers of metadata tags.
The process by which the page source is produced might also be complicated
and difficult to understand, e.g. Virtual DOM 

Consider the following quote re 
[libraries vs frameworks](https://martinfowler.com/bliki/InversionOfControl.html)
*"Inversion of Control is a key part of what makes a framework different to a 
library. A **library** is essentially a set of functions that you can call, 
these days usually organized into classes. Each call does some work and returns 
control to the client... A **framework** embodies some abstract design, with 
more behavior built in. In order to use it you need to insert your behavior into 
various places in the framework either by subclassing or by plugging in your own 
classes. The framework's code then calls your code at these points."* 

Sure, I hear you say, installing the `TypeScript` compiler,
running `bash` build scripts,
and a localhost server written in `golang`... not exactly zero configuration.

The key difference is this. These example try to answer the question,
how do I build web apps with libraries instead of framework?
Or put differently how can I follow the **Hollywood Principle**,
*"Don't call us, we'll call you"*

This guide is a combination of 
- **reference** with simple examples 
(inspired by [gobyexample](https://gobyexample.com/)),
used as quick lookup to answer the question, how do I do that again?
- **cookbook** with slightly more complicated examples
of libraries that can be re-used in your own app

[T](https://www.typescriptlang.org/)
[B](https://www.gnu.org/software/bash/)
[G](https://golang.org/) - The Beginners Guide, 
see [tsbyexample](htts://tsbyexample.mozey.co)


### Build

**TODO** Add build instructions for `tsbyexample` website here...  

