import { serializeSearchParams } from './fetch';

// [description, input, expected]
type Case = [string, Record<string, string|number|boolean>, string];

describe( 'serializeSearchParams()', () => {
	const cases: Case[] = [
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
		( _, obj, result ) =>
			expect( serializeSearchParams( obj ) ).toStrictEqual( result )
	);
} );
