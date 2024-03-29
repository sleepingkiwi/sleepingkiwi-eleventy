const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env = {}) => {
  /** isProduction
   *  --------------------------------------------------------------------------------------------
   *  Used throughout this config to check whether we're building for production or development
  **/
  const isProduction = env.production === true;
  const isAdmin = env.admin === true; // we have seperated calls to process the admin scripts

  return [
    /** NOMODULES (browserlist) CONFIG
     *  --------------------------------------------------------------------------------------------
     *  We actually run through two webpack configs (hence the array of two objects)
     *  look at `Serving more modern JavaScript to browsers that support modules`
     *  in the readme for more info.
     *  -
     *  in this first config we produce a version of our client
     *  js that uses our browserslistrc file to detrmine transforms and polyfills
     *  we also bundle any polyfills that we need for older browsers.
     *  look at `Loading polyfills` in the readme for more info.
    **/
    // admin scripts don't get nomodules bundle - admins need to use a modern browser!
    isAdmin ? null : {
      /** mode
       *  ------------------------------------------------------------------------------------------
       *  see https://webpack.js.org/concepts/mode/
      **/
      mode: isProduction ? 'production' : 'development',


      // all svelte specific.
      // see: https://github.com/sveltejs/svelte-loader#usage
      resolve: {
        alias: {
          svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
      },

      entry: {
        main: './src/js/entry.js',
        polyfills: './src/js/polyfills.js',
      },

      output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        // we handle cachebusting directly in package.json with `node-file-rev`
        filename: '[name].js',

        // outputs comments in the bundled files with details of path/tree shaking
        // should be false in production, true for development
        pathinfo: !isProduction,
      },

      stats: 'normal',

      // performance hints for large file sizes
      performance: (() => {
        if (isProduction) {
          return {
            // could set to error for production...
            hints: 'warning',

            // each 'entry' bundle (250kb)
            maxEntrypointSize: 250000,

            // any individual assets (250kb)
            maxAssetSize: 250000,
          };
        }
        // development doesn't show performance hints currently
        return {};
      })(),


      /** webpack plugins
       *  ------------------------------------------------------------------------------------------
       *  Array of plugins used to expand webpack functionality
       *  we finish this array with [].filter(plugin => plugin != null),
       *  which removes any empty entries
       *  i.e. `[1,2,,4,5,6].filter(p => p != null)` -- would return --> [1, 2, 4, 5, 6]
       *  this allows us to conditionally include plugins based on the dev/production env.
      **/
      plugins: [
        /** define some global constants
         *  ----------------------------------------------------------------------------------------
         *  creates global constants - ref: https://webpack.js.org/plugins/define-plugin/
         *  for example we could call process.env.NODE_ENV anywhere in our bundled code
        **/
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development'),
        }),
      ],

      /** Loaders to handle files
       *  ------------------------------------------------------------------------------------------
       *  loaders are used to tell webpack how to interpret different file types.
       *  run bottom to top
       *  running svelte js through babel - we also have to include the svelte code from
       *  node_modules for this...
       *  ref: https://github.com/sveltejs/svelte-loader/issues/108#issuecomment-614861126
      **/
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules\/(?!svelte)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      /** automatically importing polyfills.
                       *  --------------------------------------------------------------------------
                       *  see https://babeljs.io/docs/en/babel-preset-env#usebuiltins
                       *  'usage' should (in theory) automatically add import statements for js
                       *  that needs polyfilling based on our .browserlist file
                       *  to the top of files that need them
                      **/
                      useBuiltIns: 'usage',
                      /** enabling corejs version 3
                       *  --------------------------------------------------------------------------
                       *  see https://babeljs.io/blog/2019/03/19/7.4.0
                       *  and https://github.com/zloirock/core-js#babelpreset-env
                      **/
                      corejs: '3.10',
                      /** outputs plugins and polyfills used to the build log
                       *  --------------------------------------------------------------------------
                       *  set this to true if you would like to see what polyfills and transforms
                       *  are being used based on your browserlist
                      **/
                      debug: isProduction,
                    },
                  ],
                ],
                plugins: [
                  // we used to explicitly include @babel/plugin-proposal-object-rest-spread
                  // but it's part of es2018 formally which means it's now supported by babel/env
                  // '@babel/plugin-proposal-object-rest-spread',
                ].filter((mightBeNull) => mightBeNull !== null),
              },
            },
          },
          {
            test: /\.svelte$/,
            exclude: /node_modules\/(?!svelte)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: '3.10',
                        debug: isProduction,
                      },
                    ],
                  ],
                },
              },
              {
                loader: 'svelte-loader',
                options: {
                  dev: !isProduction,
                },
              },
            ],
          },
        ],
      },
    }, // nomodules config (heavily transpiled)


    /** MODULES CONFIG
     *  --------------------------------------------------------------------------------------------
     *  in this config we produce a version of our client
     *  js that uses @babel/preset-modules to minimise transforms and polyfills
     *  look at `Serving more modern JavaScript to browsers that support modules`
     *  in the readme for more info.
    **/
    {
      /** mode
       *  ------------------------------------------------------------------------------------------
       *  see https://webpack.js.org/concepts/mode/
      **/
      mode: isProduction ? 'production' : 'development',

      // all svelte specific.
      // see: https://github.com/sveltejs/svelte-loader#usage
      resolve: {
        alias: {
          svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
      },

      entry: isAdmin ? {
        admin: './src/admin/admin.js',
      } : {
        main: './src/js/entry.js',
      },

      output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].modules.js',
        pathinfo: !isProduction,
      },

      stats: 'normal',

      performance: (() => {
        if (isProduction) {
          return {
            hints: 'warning',
            maxEntrypointSize: 250000,
            maxAssetSize: 250000,
          };
        }
        return {};
      })(),

      // https://github.com/babel/preset-modules#important-minification
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: 8,
              safari10: true,
            },
          }),
        ],
      },

      // source maps in dev.
      // production uses the plugin below to exclude admin
      devtool: isProduction ? false : 'eval-source-map',

      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': isProduction ? JSON.stringify('production') : JSON.stringify('development'),
        }),
        isProduction ? new webpack.SourceMapDevToolPlugin({
          filename: '[file].map',
          test: /\.(js|jsx|css)($|\?)/i,
          // exclude: /admin\..+\.js/,
        }) : null,
        isProduction ? null : new webpack.HotModuleReplacementPlugin(),
      ].filter((mightBeNull) => mightBeNull !== null),

      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules\/(?!svelte)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  // no longer using https://github.com/babel/preset-modules
                  // it's in preset-env now: https://github.com/babel/preset-modules/issues/16#issuecomment-602780794
                  [
                    '@babel/preset-env',
                    {
                      targets: { esmodules: true },
                      // this enables what used to be @babel/preset-modules
                      // https://babeljs.io/docs/en/babel-preset-env#bugfixes
                      bugfixes: true,
                      // set loose false if you need function.prototype.name in IE...
                      // https://github.com/babel/preset-modules#options
                      loose: true,
                      useBuiltIns: 'usage',
                      corejs: '3.10',
                      debug: isProduction,
                    },
                  ],
                ],
                plugins: [
                  // removed react bits
                ].filter((mightBeNull) => mightBeNull !== null),
              },
            },
          },
          {
            test: /\.svelte$/,
            exclude: /node_modules\/(?!svelte)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: { esmodules: true },
                        bugfixes: true,
                        loose: true,
                        useBuiltIns: 'usage',
                        corejs: '3.10',
                        debug: isProduction,
                      },
                    ],
                  ],
                },
              },
              {
                loader: 'svelte-loader',
                options: {
                  compilerOptions: {
                    dev: !isProduction,
                  },
                  hotReload: !isProduction,
                },
              },
            ],
          },
          {
            // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
            // ref: https://github.com/sveltejs/svelte-loader#usage
            test: /node_modules\/svelte\/.*\.mjs$/,
            resolve: {
              fullySpecified: false,
            },
          },
          // we want to include the sourcemap for the admin cms side
          // but only in dev because it's flipping huge
          isProduction ? {} : {
            test: /netlify-cms\.js$/,
            use: ['source-map-loader'],
            enforce: 'pre',
          },
        ],
      },
    }, // modules config (less heavily transpiled)
  ].filter((mightBeNull) => mightBeNull !== null);
};
