import { fetch, serializeSearchParams } from '@/http/fetch';
import { SearchClient, SearchResponse } from './SearchClient';

// https://www.mediawiki.org/wiki/API:Query
// https://www.mediawiki.org/wiki/API:Prefixsearch
export interface ActionResponse {
	continue?: Record<keyof any, string|number>; // eslint-disable-line @typescript-eslint/no-explicit-any
	query?: { pages: ActionResult[] };
}

interface ActionResult {
	pageid: number;
	ns: number;
	title: string;
	// 1-based.
	index: number;
	description: string;
	thumbnail: ActionThumbnail;
	descriptionsource: string;
}

interface ActionThumbnail {
	source: string;
	width: number;
	height: number;
}

export function actionSearchClient( cors?: boolean ): SearchClient {
	return {
		fetchByTitle( query, language, cursor ) {
			return fetchByTitle( query, language, cursor, cors );
		}
	};
}

function fetchByTitle(
	query: string,
	language: string,
	cursor?: string,
	cors?: boolean
): Promise<SearchResponse> {
	const params: Record<string, string> = {
		format: 'json',
		formatversion: '2',
		action: 'query',
		prop: 'pageimages|description',
		// Use the wiki's content language (T97096) to enabled cached responses.
		uselang: 'content',
		smaxage: '300', // seconds
		maxage: '300', // seconds
		generator: 'prefixsearch',
		pilicense: 'any',
		piprop: 'thumbnail',
		pithumbsize: Math.round( window.devicePixelRatio * 80 ).toString(),
		gpssearch: query,
		gpslimit: '50'
	};
	if ( cors ) {
		params.origin = '*';
	}

	// [todo] pass bits of this in.
	let url = `//${encodeURIComponent( language )}.wikipedia.org/w/api.php`;
	url += `?${serializeSearchParams( params )}${cursor ? '&' + cursor : ''}`;

	return fetch( url, {
		headers: { Accept: 'application/json', 'Accept-Language': language }
	} )
		.then( ( response ) => response.json() )
		.then( ( response ) => parse( language, response ) );
}

function parse( language: string, actionResponse: ActionResponse ): SearchResponse {
	return {
		cursor: actionResponse.continue ?
			serializeSearchParams( actionResponse.continue ) :
			undefined,
		results:
			actionResponse.query?.pages
				?.sort( ( lhs, rhs ) => lhs.index - rhs.index )
				.map( ( page ) => ( {
					id: page.pageid,
					key: page.title,
					language,
					// Unavailable without bloating the response.
					titleHTML: page.title,
					description: page.description,
					thumbnail: page.thumbnail ? {
						url: page.thumbnail.source,
						width: page.thumbnail.width,
						height: page.thumbnail.height
					} : undefined
				} ) ) ?? []
	};
}
