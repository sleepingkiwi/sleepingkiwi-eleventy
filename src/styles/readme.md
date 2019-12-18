# styles

## structure

we run `postcss-import` against all `.css` files in the root of this dir.

Files that are not imported by one of the root files are not added to the build.

## postCSS features and config

We have set `postcss-preset-env` to enable only [stage 3+](http://preset-env.cssdb.org/features#stage-3) features as standard, with the intention that we will enable more experimental features as required.

Features we have explicitly enabled or configured currently are:

### [`custom-media-queries`](http://preset-env.cssdb.org/features#custom-media-queries)

```css
@custom-media --narrow-window (max-width: 30em);

@media (--narrow-window) {}
```

one of the only reasons I still used Sass mixins was for referring to media queries by name. This feature allows me to keep all media query definitions in a single file for the same effect.

### [`nesting-rules`](http://preset-env.cssdb.org/features#nesting-rules)

```css
article {
  & p {
    color: #333333;
  }

  @nest .parent & {
    color: blue;
  }
}
```

I don't like heavy nesting in Sass but it is undeniably useful for hover and focus states etc.

### [`custom-properties`](http://preset-env.cssdb.org/features#custom-properties)

```css
:root {
  --some-length: 32px;
}

img {
  height: var(--some-length);
  width: var(--some-length);
}
```

this is already a stage 3 feature but we want to be explicit that it should [`preserve`](https://github.com/postcss/postcss-custom-properties#preserve) the original custom property definitions.
