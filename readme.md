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

### Serving more modern JavaScript to browsers that support modules

This is currently a little complex but will hopefully become simpler over time!

Serving more modern code (less babel transformations) to modern browsers by targeting browsers that support [modules](https://v8.dev/features/modules) (browser support is a [very good 88%+ of traffic](https://caniuse.com/#feat=es6-module)) is widely recommend and gives big file size savings to modern browsers. However there are several implementation details that are tricky! [Modern Script Loading by Jason Miller](https://jasonformat.com/modern-script-loading/) is probably the best reference to the multiple problems of serving code in this way.

#### Building two bundles

This is handled by our webpack config. We output two configs, one which uses [@babel/preset-modules](https://github.com/babel/preset-modules) for modern browsers and the other which uses

#### Serving the JavaScript to the right browsers

We are currently using a bit of inline JavaScript to detect support and serve the correct file. Additionally we use preload tags to preload the modern script (older script is not preloaded). This method is discussed in more length [on the next.js repo](https://github.com/zeit/next.js/issues/7563#issuecomment-509823285).

If we decide not to use this inline JavaScript then *Option 3* from [Modern Script Loading](https://jasonformat.com/modern-script-loading/) would be a strong candidate for an alternative. [It's the method preact-cli use](https://github.com/preactjs/preact-cli/blob/master/packages/cli/lib/resources/body-end.ejs)

### Cutting the mustard or ignoring nomodule JavaScript

There's an argument that if our no JavaScript version of the site is strong enough then we can serve no JavaScript at all to browsers that don't support a basic subset of features. We could potentially *only* serve the modern JS and just let older browsers use the JavaAScript free version of the site or we could cut the mustard like the BBC did in the past by adding feature detection to our inline JavaScript that writes out the script tags.

We can determine what features to detect or whether to serve the fall-back JavaScript on a per-project basis.

### Progressive enhancement

### Preact for complex/stateful JavaScript

---

## Implementation notes

> Things to remember or gotchas

### Cache busting (adding new files to be cache busted)

We use [node-file-rev] for cache busting, currently we manually specify which files to cache bust in the `npm run rev` script. This is simple but if you generate lots of individual files that need to be cache busted it could be worth looking at automating this a little more.

### Loading polyfills

We load a [small fetch polyfill](https://github.com/developit/unfetch) in the head of `_includes/layouts/base.njk`. If you don't need it, delete it!

Most other required polyfills are bundled with our code by Core JS thanks to the Babel `preset-env` but fetch [isn't polyfilled by Core JS](https://github.com/zloirock/core-js#missing-polyfills)

Because all browsers that support ES modules also support fetch we use `nomodule` to avoid loading this script when it isn't required. _If you want to load other polyfills you should check whether this method of loading is suitable_

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
[node-file-rev]: https://github.com/lukasoppermann/node-file-rev
