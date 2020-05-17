import Vue from 'vue';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import MwInput from './Input.vue';
import * as icons from '../icon/icons';
import '../../styles/grid/grid.less';

export default {
	title: 'Components/Input',
	component: MwInput,
	parameters: { layout: 'centered' }
};

export const Inputs = (): Vue.Component => Vue.extend( {
	components: { MwInput },
	data: () => ( { icons } ),
	props: {
		large: {
			default: boolean( 'Large input', false )
		},
		selectall: {
			default: boolean( 'Select content on focus', false )
		},
		icon: {
			default: select( 'Icon', Object.keys( icons ), Object.keys( icons )[ 0 ] )
		},
		indicator: {
			default: select( 'Indicator', Object.keys( icons ), Object.keys( icons )[ 0 ] )
		},
		type: {
			default: select( 'Input type', [ 'input', 'textarea' ], 'input' )
		},
		placeholder: {
			default: text( 'Placeholder', 'Enter some content' )
		},
		value: {
			default: text( 'Value', '' )
		},
		suggestion: {
			default: text( 'Suggestion', 'Suggestion' )
		}
	},
	methods: {
		click() { action( 'input-click' )( 'Clicked' ); },
		focus() { action( 'input-focus' )( 'Focused' ); },
		blur() { action( 'input-blur' )( 'Blurred' ); },
		update( value: unknown ) {
			action( 'input-update' )( `Value update: ${value}` );
		}
	},
	template: `
		<mw-input
			:large="large"
			:type="type"
			:placeholder="placeholder"
			:icon="icons[icon]"
			:indicator="icons[indicator]"
			:value="value"
			:suggestion="suggestion"
			@click="click"
			@focus="focus"
			@blur="blur"
			@update="update"
		/>
	`
} );
