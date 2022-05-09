# sleepity - sleepingkiwi eleventy starter/reference

A personal starting point for building static sites with [eleventy] using [netlify CMS] for content.

[Visit the live site for this repo](https://sleepity.netlify.app/)

- lots of opinions
- lots of comments
- more code than is sensible for an effective starter

> I use this repo to keep minimal examples of common problems I need to solve on static sites.\
It is useful as a reference but delete all the bits you don't want before you use it!

---

## 👋 overrides in pacakge.json
colorthief causes builds to fail due to a deep dep issue.
Currently using this workaround: https://github.com/lokesh/color-thief/issues/206#issuecomment-1118462710
⚠️ This should be reviewed!


## Structure

- Built with [eleventy]
- Using [Nunjucks], JSON and JavaScript to template content
- Data generated through [netlify CMS]
- Templates and examples integrate [netlify CMS] with [eleventy]
- Includes custom [netlify CMS] widgets to simplify image handling and admin layout

## CSS

- Styled using modern CSS transformed with [postcss-preset-env]
- Browser prefixes added with [Autoprefixer]
- Minified with [CSS nano]
- All through [PostCSS]
- linted by [stylelint]

## JavaScript

- Client script transpiled by [babel]
- [Svelte] for progressively enhanced components
- Bundled by [webpack]
- Linted by [eslint]

## Development

- Served in development by [light-server]

---

## 👻 to do

- make this readme more useful for when nothing makes sense in a few months.
- move custom image widgets into their own repo
- revisit image handling once [these issues](https://github.com/netlify/netlify-cms/issues/2955#issuecomment-564461031) are resolved. See _Cloudinary for images_ below.

---

## My intentions

> Explanations of the thought process behind decisions made in this starter

### Using CLI tools directly

**Moving away from a huge webpack config** : Traditionally I have used webpack to handle all aspects of bundling, linting, transpiling, etc. which is very useful when using webpack's dev server but results in huge config files.

With this project I've tried to use individual tooling more directly from the scripts in `package.json`

__[light-server]__ is very useful in helping to achieve this because it gives me an easy way to watch multiple files, run browser sync and run npm commands on changes.

### Serving modern JavaScript

**Modern JS for browsers that support modules**: This is currently a little complex but will hopefully become simpler over time!

Serving more modern code (less babel transformations) to modern browsers by targeting browsers that support [modules](https://v8.dev/features/modules) (browser support is a [very good 88%+ of traffic](https://caniuse.com/#feat=es6-module)) is widely recommend and gives big file size savings to modern browsers. However there are several implementation details that are tricky! [Modern Script Loading by Jason Miller](https://jasonformat.com/modern-script-loading/) is probably the best reference to the multiple problems of serving code in this way.

#### Building two bundles

This is handled by the webpack config. We output two configs, one which uses [@babel/preset-modules](https://github.com/babel/preset-modules) for modern browsers and the other which uses [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env).

#### Serving the JavaScript to the right browsers

We are currently using a bit of inline JavaScript to detect support and serve the correct file. Additionally we use preload tags to preload the modern script (older script is not preloaded). This method is discussed in more length [on the next.js repo](https://github.com/zeit/next.js/issues/7563#issuecomment-509823285).

If we decide not to use this inline JavaScript then *Option 3* from [Modern Script Loading](https://jasonformat.com/modern-script-loading/) would be a strong candidate for an alternative. [It's the method preact-cli use](https://github.com/preactjs/preact-cli/blob/master/packages/cli/lib/resources/body-end.ejs).

### Cutting the mustard or ignoring nomodule JavaScript

There's an argument that if our no JavaScript version of the site is strong enough we could serve no JavaScript at all to browsers that don't support a basic subset of features. We could potentially *only* serve the modern JS and just let older browsers use the JavaAScript free version of the site or we could cut the mustard like the BBC did in the past by adding feature detection to our inline JavaScript that writes out the script tags.

We can determine what features to detect or whether to serve the fall-back JavaScript on a per-project basis.

### Progressive enhancement

👻 **to do:** outline some coherent examples from real projects or bring in small examples...

### Svelte for complex/stateful JavaScript

👻 **to do:** outline some coherent examples from real projects or bring in small examples...

[GLADD](https://gladd.co.uk) is a live site built from this starter that uses Svelte extensively in the membership areas...

### Modern CSS

**Using modern CSS with [PostCSS] and [postcss-preset-env]**: Previously I have used Sass heavily but in this starter I'm trying to use native (or upcoming) features of CSS.

I'm trying not to use too many experimental features but details of the features that are enabled and a more in depth look at CSS structure can be found in [`src/styles/readme.md`](src/styles/readme.md).

---

## Implementation notes

> Things to remember or gotchas

### Cloudinary for images

This repo is setup to use [Cloudinary] as the media library for [netlify CMS]. There were multiple reasons behind this decision but primarily it is easier to handle responsive images with a Cloudinary integration.

> **For a new project:** remember to set up new Cloudinary settings in the config file!

We initially planned to store the primary image upload in the repo (so that we had ownership of content and it was all centrally located) and then use Cloudinary to [fetch remote images](https://cloudinary.com/documentation/fetch_remote_images) to generate and serve the various responsive sizes. However, currently, storing images in the repo can be unintuitive. Specifically we had issues with previews, validation etc. becoming unavailable until builds had completed. [This is currently being addressed](https://github.com/netlify/netlify-cms/issues/2955#issuecomment-564461031) so we may change the way we handle media going forwards!

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
[Svelte]: https://svelte.dev/
[Sass]: https://sass-lang.com/
[stylelint]: https://github.com/stylelint/stylelint
[eslint]: https://eslint.org/
[npm]: https://www.npmjs.com/
[babel]: https://babeljs.io/
[light-server]: https://github.com/txchen/light-server
[PostCSS]: https://postcss.org/
[postcss-preset-env]: http://preset-env.cssdb.org/
[Autoprefixer]: https://github.com/postcss/autoprefixer
[CSS nano]: https://cssnano.co/
[node-file-rev]: https://github.com/lukasoppermann/node-file-rev
[cloudinary]: https://cloudinary.com
[Nunjucks]: https://mozilla.github.io/nunjucks/
