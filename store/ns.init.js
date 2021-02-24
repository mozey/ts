// The namespace (ns.ts) might be compiled to other module types,
// accordingly this file can be swapped out for other module loaders.
// Load namespace, then call back to framework
window.ns = function (config, cb) {
    // Configure RequireJS to use arbitrary globals
    // https://requirejs.org/docs/jquery.html
    requirejs.config({
        paths: {
            "ns": "build/ns",
            "axios": "lib/axios-0.21.1.min",
            "sprintf-js": "lib/sprintf-1.1.2"
        }
    });

    requirejs(["ns"], function (module) {
        // Run main
        window.ns = module.ns
        ns.main(config)

        // Callback to init framework
        cb(ns.data)
    })
}
