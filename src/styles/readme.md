# Styles

> We run `postcss-import` against all `.css` files in the root of this dir.\
_Files that are not imported by one of the root files will not be added to the build._

## Structure

All of the imported files start with a brief overview of their purpose but here's a quick summary.

### Settings

📝 _You'll need to edit these to establish your theme!_

`./settings/*.css`

- all of the variable definitions and settings used by your other files.

`./fonts/*.css`

- `@font-face` rules and `font-family` definitions.

_Fairly arbitrary choice to put these in their own directory but I feel like `@font-face` rules don't really fit well with the other settings!_

### High level/base

🕶 _You probably don't need to edit anything in here!_

`./universal/*.css`

- High level rules that we want to apply across the whole site.
- CSS resets, normalise and global `box-sizing` rules.
- Fairly unopinionated.
- Serves to level the playing field for following CSS.

`./elements/*.css`

- Slightly more opinionated.
- Targets elements directly but should never target classes.

```css
/* ✔ elements */
p { margin: 0; }

/* ❌ not classes */
.flush,
.para { margin: 0; }
```

### Site styles

📝 _This is where all of your actual CSS goes!_

> Do whatever you want in here! You don't have to stick to this structure.

`./site/site.css`

- High level but site specific.
- Background colours or flex layout on the body tag for example.
- Perhaps you want to make some pretty radical changes to `a` tags as a whole but don't want to do that behind a class, you could put that here too.

`./sites/utilities/*.css`

- Visual utility classes
- I don't normally like utility classes.
  - 🤮 `.bg-colour-primary.flush.float-left` 🤮
- However I make an exception for `.u-flows`.
  - Look at `./sites/utilities/flows.css` for details.

`./sites/components/*.css`

- Tightly coupled to site components.
- Should endeavour to be small and reusable...
- Delete the examples if you want!

### Helpers & overrides

🕶/📝 _You probably don't need to edit these but can add extra a11y overrides etc. as required!_

- Similar to utility classes but with a different focus.
- These are designed to overwrite other styles.
- Primarily designed around a11y concerns.
- This is where you'd add print stylesheets if you wanted to bundle them in `main.css`
  - although print styles might be better to import separately with a media query...

## PostCSS features and config

We have set `postcss-preset-env` to enable only [stage 3+](http://preset-env.cssdb.org/features#stage-3) features as standard, with the intention that we will enable more experimental features as required.

Features we have explicitly enabled or configured currently are:

### [`custom-media-queries`](http://preset-env.cssdb.org/features#custom-media-queries)

```css
@custom-media --narrow-window (max-width: 30em);

@media (--narrow-window) {
  /* ... */
}
```

One of the only reasons I still used Sass mixins was for referring to media queries by name. This feature allows me to keep all media query definitions in a single file for the same effect.

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

This is already a stage 3 feature but we want to be explicit that it should [`preserve`](https://github.com/postcss/postcss-custom-properties#preserve) the original custom property definitions.
