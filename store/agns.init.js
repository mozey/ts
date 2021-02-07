window.AGNSInit = function(cb) {
    // Configure RequireJS to use arbitrary globals
    // https://requirejs.org/docs/jquery.html
    requirejs.config({
        paths: {
            "agns": "build/agns"
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
