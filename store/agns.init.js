// Load app global namespace,
// then call back to framework
window.AGNS = function (config, cb) {
    // Configure RequireJS to use arbitrary globals
    // https://requirejs.org/docs/jquery.html
    requirejs.config({
        paths: {
            "agns": "build/agns",
            "axios": "lib/axios-0.21.1.min",
            "sprintf-js": "lib/sprintf-1.1.2"
        }
    });

    requirejs(["agns"], function (module) {
        // Run main
        window.agns = module.agns
        agns.main(config)

        // Callback to framework app
        cb(agns.data)
    })
}
