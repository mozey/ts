# ts

Misc Typescript libraries and examples

## Usage

To run the examples first clone this repo,
then follow the instructions below 

**NOTE** npm is only used for **type definitions** to help with IDE completion.
This keeps the size on disk of `node_modules` to a bare minimum 

This repo is self-contained and must not rely on code inside of `node_modules`.
Eventually the examples might make use of 
[deno imports](https://deno.land/manual/examples/import_export)


### http

Example of doing [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
a.k.a. [AJAX](https://developer.mozilla.org/en-US/docs/Glossary/AJAX)  

Makes use of the [jqXHR](https://api.jquery.com/jquery.ajax) wrapper 
around the browsers native XMLHttpRequest object, and 
[jquery-growl](https://github.com/ksylvest/jquery-growl) for messaging the user

Build

    cd ts/http
    ./build.sh
    
Open the index file in your default browser to run the example.
It will make some requests to [httpbin](https://httpbin.org)
and display the results

    open build.index.html

Make some change, run `build.sh` again, 
and click the browser refresh button to see the results


### template

Basic template loader and cache, makes use of the `http` lib described above

Build

    cd ts/template
    ./build.sh
 
Run

    open build.index.html
    
Reset to remove build artifacts

    ./reset.sh
   
   
### datepicker

Simple datepicker using `<select>` tags.
Works great on mobile browsers

Build, run and reset works the same as the previous examples



