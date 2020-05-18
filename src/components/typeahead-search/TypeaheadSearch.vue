<template>
	<div class="mw-ui-typeahead-search container justify-center">
		<div class="row">
			<mw-typeahead-input
				class="mw-ui-typeahead-search__input col-4"
				:results="results"
				:loading="loading"
				@update="onInput"
			>
				<template v-slot:default="slotProps">
					<mw-list-item
						:title="slotProps.result.titleHTML"
						:subtitle="slotProps.result.description"
						:thumbnail="slotProps.result.thumbnail"
					/>
				</template>
			</mw-typeahead-input>
			<mw-button
				class="mw-ui-typeahead-search__button"
				:progressive="true"
				:icon="mwIconSearch"
				icon-name="Search"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import MwButton from '../button/Button.vue';
import MwListItem from '../list-item/ListItem.vue';
import MwTypeaheadInput from '../typeahead-input/TypeaheadInput.vue';
import { mwIconSearch } from '../icon/icons';
import { SearchClient, SearchResult } from './http/SearchClient';
import { actionSearchClient } from './http/actionSearchClient';

export default Vue.extend( {
	name: 'MwTypeaheadSearch',
	components: { MwButton, MwListItem, MwTypeaheadInput },
	props: {
		client: {
			type: Object as PropType<SearchClient>,
			default: () => actionSearchClient(),
			validator( val: object ): val is SearchClient {
				return 'fetchByTitle' in val;
			}
		},
		language: {
			type: String, default: 'en'
		}
	},
	data() {
		return {
			mwIconSearch,
			results: [] as SearchResult[],
			loading: false
		};
	},
	methods: {
		onInput( input: string ): void {
			// [todo] cancel outstandings requests.
			this.loading = true;
			this.client
				.fetchByTitle( input, this.language )
				.then( ( response ) => {
					this.loading = false;
					this.results.length = 0;
					this.results.push( ...response.results );
					return response;
				} );
		}
	}
} );
</script>

<style lang="less">
.mw-ui-typeahead-search {
	min-width: 240px;
}
</style>
