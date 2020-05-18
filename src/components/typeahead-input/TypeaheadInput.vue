<template>
	<div class="mw-ui-typeahead-input">
		<div class="mw-ui-typeahead-input__wrapper">
			<mw-input
				class="mw-ui-typeahead-input__input"
				:value="query"
				type="search"
				autofocus="autofocus"
				accesskey="F"
				dir="auto"
				autocomplete="off"
				list="suggestions"
				@update="onUpdate"
			/>
			<mw-card
				v-show="!loaded || results.length > 0"
				class="mw-ui-typeahead-input__results-container"
			>
				<mw-spinner v-if="!loaded" />
				<ul class="mw-ui-typeahead-input__results-container__results">
					<li
						v-for="(result, index) in results"
						:key="index"
						class="mw-ui-typeahead-input__result col-12"
					>
						<slot :result="result" />
					</li>
				</ul>
				<div v-show="loaded && results.length === 0">
					No results available. Try searching within pages.
				</div>
			</mw-card>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import MwInput from '../input/Input.vue';
import MwCard from '../card/Card.vue';
import MwSpinner from '../spinner/Spinner.vue';

export default Vue.extend( {
	name: 'MwTypeaheadInput',
	components: { MwCard, MwInput, MwSpinner },
	props: {
		results: { type: Array as PropType<any[]>, default: (): any[] => [] }, // eslint-disable-line @typescript-eslint/no-explicit-any
		loaded: { type: Boolean, default: true }
	},
	data() {
		return {
			query: ''
		};
	},
	methods: {
		onUpdate( input: string ): void {
			this.query = input;
			this.$emit( 'update', input );
		}
	}
} );
</script>

<style lang="less">
.mw-ui-typeahead-input__wrapper {
	float: left;
	position: relative;
	width: 100%;
}

.mw-ui-typeahead-input__input {
	width: 100%;
	display: block;
}

.mw-ui-typeahead-input__results-container {
	position: absolute;
	width: 100%;
	max-height: 480px;
	overflow-y: auto;
}

.mw-ui-typeahead-input__results-container__results {
	list-style-type: none;
	padding: 0;
}
</style>
