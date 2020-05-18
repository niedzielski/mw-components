/* eslint-env node */
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const path = require( 'path' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const { version } = require( './package.json' );
const { VueLoaderPlugin } = require( 'vue-loader' );
const webpack = require( 'webpack' );

// Enum of chunk names. The key is a symbol. The value is the chunk name and file stem. See
// readme.md#different-builds for details. Some of these chunks have specific entry points under
// src/entries and others are generated automatically.
const Chunk = {
	Mwc: 'mwc',
	Common: 'mwc-common',
	Primitives: 'mwc-primitives',
	Search: 'mwc-search',
	MediaWikiUiButton: 'mediawiki.ui.button'
};

// The extension used for source map files. Per T173491, files with a .map extension cannot be
// served from prod. It doesn't seem to be practical to rename the CSS source maps.
const jsSourceMapExtension = '.map.json';

const resolve = {
	extensions: [ '.js', '.ts' ],
	alias: { '@': path.resolve( __dirname, './src' ) }
};

/**
 * @param {'development' | 'production' | 'none'} [mode]
 * @return {webpack.RuleSetRule[]}
 */
function rules( mode ) {
	return [
		// Transpile TypeScript to JavaScript (embedded in SFCs or distinct files). Also, grab
		// any JavaScript so that is transpiled to ES5.
		{
			test: /\.[jt]s$/,
			exclude( filename ) {
				// Don't transpile package JavaScript files in development. It's slow.
				return mode === 'development' && /.*\.js$/.test( filename );
			},
			use: {
				// Type checking is performed by ForkTsCheckerWebpackPlugin.
				loader: 'ts-loader', options: { transpileOnly: true }
			}
		},

		// Concatenate and compile Less and CSS (embedded in SFCs or distinct files) to chunks.
		{
			test: /\.(c|le)ss$/,
			use: [
				{ loader: MiniCssExtractPlugin.loader, options: { hmr: mode === 'development' } },
				'css-loader',
				'less-loader'
			]
		}
	];
}

/** @return { webpack.Plugin[]} */
function plugins() {
	return [
		new ForkTsCheckerWebpackPlugin( {
			vue: true,
			logger: {
				error: console.error, // eslint-disable-line no-console
				warn: console.warn, // eslint-disable-line no-console
				info: () => {
					// Suppress informational messages.
				} }
		} ),
		new MiniCssExtractPlugin(),
		new webpack.DefinePlugin( {
			VERSION: JSON.stringify( version )
		} )
	];
}

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

	resolve,

	// Map of chunk names to entry files.
	entry: {
		[ Chunk.Mwc ]: './src/entries/mwc.ts',
		[ Chunk.Primitives ]: './src/entries/mwc-primitives.ts',
		[ Chunk.Search ]: './src/entries/mwc-search.ts'
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

	optimization: {
		runtimeChunk: {
			/** @param {webpack.compilation.Chunk} chunk */
			name( chunk ) {
				// Extract the runtime for all chunks except the default Mwc.
				return chunk.name === Chunk.Mwc ? Chunk.Mwc : Chunk.Common;
			}
		},
		splitChunks: {
			cacheGroups: {
				[ Chunk.Common ]: {
					name: Chunk.Common,
					// Minimum number of chunks module must share before excising into common chunk.
					minChunks: 2,
					// Don't reuse existing chunks when splitting (i.e. we do not want Webpack
					// excising modules into an async chunk.
					// https://github.com/webpack/webpack.js.org/issues/2122#issuecomment-388609306
					reuseExistingChunk: false,
					// Ignore Webpack's default minSize option (and other splitChunks defaults) and
					// always create chunks based on criteria specified for this cacheGroup.
					enforce: true,
					// Only consider splitting chunks off of these whitelisted entry names.
					// eslint-disable-next-line no-restricted-syntax
					chunks: ( chunk ) => [
						Chunk.Primitives,
						Chunk.Search
					].includes( chunk.name ),
					test: ( module ) => !testMediaWikiUiButton( module )
				},
				[ Chunk.MediaWikiUiButton ]: {
					name: Chunk.MediaWikiUiButton,
					minChunks: 1,
					reuseExistingChunk: false,
					enforce: true,
					// eslint-disable-next-line no-restricted-syntax
					chunks: ( chunk ) => [
						Chunk.Primitives,
						Chunk.Search
					].includes( chunk.name ),
					test: ( module ) => testMediaWikiUiButton( module )
				}
			}
		},
		// Enable CSS minification. Unfortunately, this overrides the default JavaScript
		// minification so it must be re-enabled with the TerserJSPlugin. The default processor is
		// cssnano which uses postcss.
		// https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
		// https://github.com/NMFR/optimize-css-assets-webpack-plugin
		// https://cssnano.co
		minimizer: argv.mode === 'production' ? [
			new TerserJSPlugin(),
			new OptimizeCSSAssetsPlugin( {
				cssProcessorOptions: {
					// Keep sourceMappingURL comments in the output CSS.
					// https://github.com/postcss/postcss/blob/master/docs/source-maps.md
					map: { annotation: true }
				}
			} )
		] : []
	},

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
			...rules( argv.mode ),

			// Process single-file components (SFCs). This match loader extensions to the SFC
			// language attributes.
			{ test: /\.vue$/, use: 'vue-loader' }
		]
	},

	plugins: [
		new CleanWebpackPlugin( {
			// Don't delete the ES5 linter config.
			cleanOnceBeforeBuildPatterns: [ '**/*', '!.eslintrc.js' ]
		} ),
		...plugins(),
		new VueLoaderPlugin()
	]
} );

module.exports.commonConfig = { resolve, rules, plugins };

/**
 * @param {webpack.compilation.Module} module
 * @return {boolean}
 */
function testMediaWikiUiButton( module ) {
	return module.constructor.name === 'CssModule' &&
		/[\\/]styles[\\/]mediawiki[\\/]/.test( module.context || '' );
}
