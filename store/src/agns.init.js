// Frameworks (like VueJS) can use this to initialize the root data object
window.AGNS_DATA = {}

// The namespace (agns.ts) might be compiled to other module types,
// accordingly this file can be swapped out for other module loaders.
// Load namespace, then call back to framework
window.AGNS = function (config, cb) {
    // Wait for static content to load first
    // https://stackoverflow.com/a/1033448/639133
    window.addEventListener("load", function () {
        // Configure RequireJS to use arbitrary globals
        // https://requirejs.org/docs/jquery.html
        requirejs.config({
            paths: {
                "agns": "build/agns",
                "sprintf-js": "lib/sprintf-1.1.2"
            }
        });

        requirejs(["agns"], function (module) {
            // Run main
            window.agns = module.agns
            agns.main(config)

            // Callback to framework
            cb()
        })
    })
}
