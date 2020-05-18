import Vue from 'vue';
import MwTypeaheadInput from './TypeaheadInput.vue';
import MwCard from '../card/Card.vue';
import { boolean, select } from '@storybook/addon-knobs';

export default {
	title: 'Components/TypeaheadInput',
	component: MwTypeaheadInput,
	parameters: { layout: 'centered', actions: { disable: true } }
};

export const TypeaheadInput = (): Vue.Component => Vue.extend( {
	components: { MwTypeaheadInput, MwCard },
	props: {
		loaded: { default: boolean( 'Loaded', true ) },
		results: {
			default: select(
				'Results',
				{
					empty: [] as string[],
					singular: [ 'red' ],
					multiple: [ 'red', 'green', 'blue' ]
				},
				[ 'red', 'green', 'blue' ]
			)
		}
	},
	template: `
		<div class="container">
			<mw-typeahead-input :loaded="loaded" :results="results">
				<template v-slot:default="slotProps">
					<mw-card>{{ slotProps.result }}</mw-card>
				</template>
			</mw-typeahead-input>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
				exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
				irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
				pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
				deserunt mollit anim id est laborum.
			</p>
			<p>
				Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis
				et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin
				mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate
				vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu
				tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas
				fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis
				sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit
				ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.
				Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem,
				dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie
				eu, feugiat in, orci. In hac habitasse platea dictumst.
			</p>
		</div>
	`
} );
