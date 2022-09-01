// TODO Make window.AGNS return a promise
// The namespace (agns.ts) might be compiled to other module types,
// accordingly this file can be swapped out for other module loaders.
// Load namespace, then call back to framework
window.AGNS = function (config, cb) {
    // Wait for static content to load first
    // https://stackoverflow.com/a/1033448/639133
    window.addEventListener("load", function () {
        console.info("load")

        // Configure RequireJS to use arbitrary globals
        // https://requirejs.org/docs/jquery.html
        requirejs.config({
            paths: {
                "agns": "static/build/agns",
                "sprintf-js": "static/lib/sprintf-1.1.2"
            }
        });

        requirejs(["agns"], function (module) {
            console.info("module", module)
            // Run main
            window.agns = module.agns
            agns.main(config)

            // Callback to framework
            cb()
        })
    })
}
