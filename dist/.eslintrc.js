// Validate that only ES5 is shipped.

const notEs5 = require( 'eslint-config-wikimedia/language/not-es5' );

// Disable the Object.assign() rule. The TypeScript compiler provides a polyfill. Disable the rest
// as needed to catch _unexpected_ ES6+ code.
notEs5.rules[ 'no-restricted-properties' ] = notEs5.rules[ 'no-restricted-properties' ]
	.filter( ({property}) => property !== 'assign' );

module.exports = {
	root: true,
	parserOptions: { ecmaVersion: 5 },
	rules: notEs5.rules
};
