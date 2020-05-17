import Vue from 'vue';
import MwSpinner from './Spinner.vue';

export default {
	title: 'Components/Spinner',
	component: MwSpinner,
	parameters: { layout: 'centered', actions: { disable: true }, knobs: { disable: true } }
};

export const Spinner = (): Vue.Component => Vue.extend( {
	components: { MwSpinner },
	template: '<mw-spinner />'
} );
