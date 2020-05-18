export interface SearchClient {
	/**
	 * @param query query string to search for.
	 * @param lang ISO code of language to search in.
	 */
	fetchByTitle( query: string, language: string, cursor?: string ): Promise<SearchResponse>;

	// [todo] ad fetchByContent() to be used on submission for redirect.
}

export interface SearchResponse {
	cursor?: string;
	results: SearchResult[];
}

export interface SearchResult {
	/** Integral page identifier. */
	id: number;
	/** Page title in URL-friendly format. Matches the database key. */
	key: string;
	/** Wiki language. Matches the dbname. */
	language: string;
	/** Page title as it appears on the page. */
	titleHTML: string;
	/** Page lead. */
	excerptHTML?: string;
	/** Page description. */
	description?: string;
	/** Page image. */
	thumbnail?: SearchResultThumbnail;
}

export interface SearchResultThumbnail {
	url: string;
	/** Image width in pixels. */
	width: number;
	/** Image height in pixels. */
	height: number;
}
