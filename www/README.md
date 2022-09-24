This is the [root dir for Hugo](https://gohugo.io/getting-started/directory-structure/).

Only the files in `www/public` are made available on the internet.

The directory structure was generated like this
```bash
cd www
# With --force flag because dir was not empty
hugo new site ./ --force
```

Create [theme from scratch](https://retrolog.io/blog/creating-a-hugo-theme-from-scratch/)
```bash
hugo new theme ts
```

**TODO** Use watcher, build script, and Caddy static server instead, how to set `baseURL` in `config.toml`?
Start built-in live server
```bash
hugo server
```

Build static site for dev
```bash
hugo
```

Build static site for prod
```bash
hugo --config config.prod.toml
```

