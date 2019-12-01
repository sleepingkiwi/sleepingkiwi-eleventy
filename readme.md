# sleepingkiwi eleventy starter

A starting point for building static sites with [eleventy] using [netlify CMS] for content.

- Styled with [Sass]/SCSS, browser prefixes added with [Autoprefixer] and minified with [CSS nano] through [PostCSS], linted by [stylelint]
- Client script transpiled by [babel], bundled by [webpack], linted by [eslint]
- Served in development by [light-server] (see _Using CLI tools directly_ below)

---

## 👻 to do

make this readme useful for when nothing makes sense in a few months.

---

## My intentions

> Explanations of the thought process behind decisions made in this starter

### Using CLI tools directly _(Moving away from a huge webpack config)_

Traditionally I have used webpack to handle all aspects of bundling, linting, transpiling, etc. which is very useful when using webpack's dev server but results in huge config files.

With this project I've tried to use individual tooling more directly from the scripts in `package.json`

__[light-server]__ is very useful in helping to achieve this because it gives me an easy way to watch multiple files, run browser sync and run npm commands on changes.

### Progressive enhancement

### Preact for complex/stateful JavaScript

---

## Implementation notes

> Things to remember or gotchas

### Authentication

We are authenticating access to our GitHub repo [using the process outlined in the netlify CMS docs](https://www.netlifycms.org/docs/authentication-backends/#github-backend). This only works because Netlify is providing the server side aspect.

If we were not hosting on Netlify (or didn't want them involved in authentication) but wanted to continue using netlify CMS we  could look at using client side authentication with something like [implicit grants in GitLab](https://www.netlifycms.org/docs/authentication-backends/#client-side-implicit-grant-gitlab)

As a result, the config for authentication is located largely on [netlify]

### Admin/CMS in development

- Accessed at `/admin/` (that trailing slash is [important for it to work](https://github.com/netlify/netlify-cms/issues/332))
- __Remember:__ when running locally [changes are still pushed to the remote repo](https://www.netlifycms.org/docs/configuration-options/#backend)

[eleventy]: https://www.11ty.io/
[netlify CMS]: https://github.com/netlify/netlify-cms
[netlify]: https://www.netlify.com/
[webpack]: https://webpack.js.org/
[Preact]: https://preactjs.com/
[Sass]: https://sass-lang.com/
[stylelint]: https://github.com/stylelint/stylelint
[eslint]: https://eslint.org/
[npm]: https://www.npmjs.com/
[babel]: https://babeljs.io/
[light-server]: https://github.com/txchen/light-server
[PostCSS]: https://postcss.org/
[Autoprefixer]: https://github.com/postcss/autoprefixer
[CSS nano]: https://cssnano.co/
