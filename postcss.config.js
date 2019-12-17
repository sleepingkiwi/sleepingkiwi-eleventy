// ref: https://github.com/postcss/postcss-cli#context
// because we use postcss from the commmand line we can use this function to get `ctx` context,
// allows us to configure settings based on the file/settings used on the CL

module.exports = (ctx) => ({
  map: ctx.options.map,
  // parser: ctx.options.parser,
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-media-queries': { preserve: false },
        'nesting-rules': true,
        'custom-properties': { preserve: true },
      },
      // autoprefixer is included in postcssPresetEnv:
      // https://github.com/csstools/postcss-preset-env
      autoprefixer: {
        // setting remove to false means old prefixes aren't stripped if we manually include them
        // sometimes we might want to manually add a prefix for a hack or specific targetting...
        remove: false,
      },
    },
    cssnano: ctx.env === 'production'
      ? {
        preset: 'default',
      } : false,
  },
});
