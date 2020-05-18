interface RequestInitCompat extends Omit<RequestInit, 'cache' | 'headers'> {
	headers?: Record<string, string>;
}

// [todo] how to force jQuery operation?
export function fetch( input: string, init?: RequestInitCompat ): Promise<Response> {
	if ( 'fetch' in window ) {
		return window.fetch( input, init );
	}
	return $.ajax( input, init ).promise() as unknown as Promise<Response>;
}

/**
 * Serializes a JS object into a URL parameter string.
 *
 * @param obj Object whose properties will be serialized. A subset of
 *     ConstructorParameters<typeof URLSearchParams>.
 */
export function serializeSearchParams(
	obj: Readonly<Record<string, string|number|boolean>>
): string {
	return Object
		.keys( obj )
		.map( ( prop ) => `${prop}=${encodeURIComponent( obj[ prop ] )}` )
		.join( '&' );
}
