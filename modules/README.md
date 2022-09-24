# modules

More example source code, organized by framework.

Note that `node_modules` nested in here can be very large, and must not be versioned.

However, build artifacts created by these examples, are versioned in `www`. That enables the examples to work without having to re-install or run build scripts.

Module source code is not intended to be watched, or built by `scripts/build-app.sh`. The modules are versioned in this repo as examples. In practice, a better dev workflow would be to keep each module in it's own repo
