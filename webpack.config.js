/* eslint-env node */
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );
const { VueLoaderPlugin } = require( 'vue-loader' );
const webpack = require( 'webpack' );

// Enum of chunk names. The key is a symbol. The value is the chunk name and file stem. See
// readme.md#different-builds for details.
const Chunk = {
	Mwc: 'mwc',
	Primitives: 'mwc-primitives'
};

// The extension used for source map files. Per T173491, files with a .map extension cannot be
// served from prod. It doesn't seem to be practical to rename the CSS source maps.
const jsSourceMapExtension = '.map.json';

/**
 * @param {Parameters<webpack.ConfigurationFactory>[0]} _env
 * @param {Parameters<webpack.ConfigurationFactory>[1]} argv
 * @return {ReturnType<webpack.ConfigurationFactory>}
 */
module.exports = ( _env, argv ) => ( {
	stats: {
		all: false,
		// Output a timestamp when a build completes. Useful when watching files.
		builtAt: true,
		errors: true,
		warnings: true
	},

	// Fail on the first build error instead of tolerating it.
	bail: true,

	resolve: {
		extensions: [ '.js', '.ts' ],
		alias: { '@': path.resolve( __dirname, './src' ) }
	},

	// Specify that all paths are relative the Webpack configuration directory not the current
	// working directory. If NPM is executed in a child folder, the references will be correct.
	context: __dirname,

	// Map of chunk names to entry files.
	entry: {
		[ Chunk.Mwc ]: './src/entries/mwc.ts',
		[ Chunk.Primitives ]: './src/entries/mwc-primitives.ts'
		// Other chunks are configured under optimization.
	},

	// Omit these external dependencies to be provided by the consumer.
	externals: [ 'vue' ],

	performance: {
		// The default filter excludes map files but we rename ours. See T173491.
		assetFilter: ( filename ) => !filename.endsWith( jsSourceMapExtension )
	},

	// Accurate source maps come at the expense of build time. The source map is intentionally
	// exposed to users via sourceMapFilename for prod debugging. This goes against convention as
	// this source code is publicly distributed.
	devtool: argv.mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

	output: {
		sourceMapFilename: `[file]${jsSourceMapExtension}`,

		// Set the name to avoid possible Webpack runtime collisions of globals with other Webpack
		// runtimes. See https://webpack.js.org/configuration/output/#outputuniquename.
		library: 'mwc',

		libraryTarget: 'umd',

		// https://github.com/webpack/webpack/issues/6525
		globalObject: 'this'
	},

	module: {
		rules: [
			// Process single-file components (SFCs). This match loader extensions to the SFC
			// language attributes.
			{ test: /\.vue$/, use: 'vue-loader' },

			// Transpile TypeScript to JavaScript (embedded in SFCs or distinct files). Also, grab
			// any JavaScript so that is transpiled to ES5.
			{
				test: /\.[jt]s$/,
				exclude( filename ) {
					// Don't transpile package JavaScript files in development. It's slow.
					return argv.mode === 'development' && /.*\.js$/.test( filename );
				},
				use: 'ts-loader'
			},

			// Concatenate and compile Less and CSS (embedded in SFCs or distinct files) to chunks.
			{
				test: /\.(c|le)ss$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ]
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin( {
			// Don't delete the ES5 linter config.
			cleanOnceBeforeBuildPatterns: [ '**/*', '!.eslintrc.js' ]
		} ),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin()
	]
} );