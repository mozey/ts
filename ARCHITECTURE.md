Each folder in this repo is a self-contained example,
following this pattern
- `build.sh` copies dependencies, builds source code, 
  and starts a localhost server if required
- `build.index.html` is the entry point
- `reset.sh` removes ignored files created by build 
- `watch.sh` may or may not exist, 
  re-builds when files are changed 

Some examples build on top of others,
the first example to use something will be the source of that thing.
`README.md` in the repo root lists all examples in the order they were created.
The build script must copy all dependencies into the example dir,
and create a symlink to `http/lib`.
Lib is in http because that was the first example

The `examples` dir contains the source for building the 
`tsbyexample.mozey.co` reference guide and cookbook.
