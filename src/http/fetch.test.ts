import { serializeSearchParams } from './fetch';

type Test = [string, Readonly<Record<string, string|number|boolean>>, string];

describe( 'serializeSearchParams()', () => {
	const cases: Test[] = [
		[ 'empty object', {}, '' ],
		[ 'single property object', { single: 'value' }, 'single=value' ],
		[
			'multiple mixed property object',
			{ str: 'val', num: 1, bool: true },
			'str=val&num=1&bool=true'
		]
	];
	test.each( cases )(
		'Case %# %s: (%p) => %p',
		( _, obj, result ) => expect( serializeSearchParams( obj ) ).toStrictEqual( result )
	);
} );
