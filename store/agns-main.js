// TODO Generate this file to support different module loaders?

// TODO How to do this without a callback?
// Or at least make the callback option.
// For example, create the data structures up front,
// the VueJS app binds to them, and sometime later they're populated
window.AGNSInit = function(cb) {
    // Configure RequireJS to use arbitrary globals
    // https://requirejs.org/docs/jquery.html
    requirejs.config({
        paths: {
            "agns": "build/agns",
            "axios": "lib/axios-0.21.1.min"
        }
    });

    // App global name-space
    requirejs(["agns"], function (module) {
        window.agns = module.agns

        // Make build variables available on agns
        agns.Host = "http://localhost:{{.Port}}"
        agns.Version = "{{.Version}}"

        agns.main()

        // Callback to user app
        cb()
    })
}
