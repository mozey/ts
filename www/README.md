This is the [root dir for Hugo](https://gohugo.io/getting-started/directory-structure/).

Only the files in `www/public` are made available on the internet.

## Quick start

Create a new example
```bash
hugo new content/examples/foo.html
```


## Setup

The directory structure was generated like this
```bash
cd www
# With --force flag because dir was not empty
hugo new site ./ --force
```

Start built-in live server. Note that (the TypeScript) app builds to `www/public/dist` by default. This is done to avoid a rebuild loops, since there are separate watchers for app and the static site. First build app to `www/static/dist`, then start the live server. This approach can be used instead of `scripts/up.sh` when working on the hugo site or theme only
```bash
../scripts/build-app.sh static
hugo server
```

Build static site for dev. Also see `scripts/deploy.sh`
```bash
hugo
```

Create [theme from scratch](https://retrolog.io/blog/creating-a-hugo-theme-from-scratch/). Note tutorial link is just for reference, didn't follow the steps exactly
```bash
hugo new theme ts
``
