import Vue from 'vue';
import { action } from '@storybook/addon-actions';
import MwButton from './Button.vue';
import { boolean, select, text } from '@storybook/addon-knobs';
import * as icons from '../icon/icons';
export default {
	title: 'Components/MwButton',
	component: MwButton,
	parameters: { layout: 'centered' }
};
export const DifferentButtons = (): Vue.Component => Vue.extend( {
	components: { MwButton },
	data: () => ( {
		icons
	} ),
	props: {
		large: {
			default: boolean( 'Large button', false )
		},
		label: {
			default: text( 'Button label', 'Button label' )
		},
		href: {
			default: text( 'Button click target(href)', '' )
		},
		block: {
			default: boolean( 'Block button', false )
		},
		outlined: {
			default: boolean( 'Outlined', false )
		},
		icon: {
			default: select( 'Icon', Object.keys( icons ), '' )
		},
		indicator: {
			default: select( 'Indicator', Object.keys( icons ), '' )
		},
		progressive: {
			default: boolean( 'Progressive', true )
		},
		destructive: {
			default: boolean( 'Destructive', false )
		},
		type: {
			default: select( 'Button type', [ 'button', 'toggle', 'icon', 'text' ], 'button' )
		}
	},
	methods: { click: action( 'click' ) },
	template: `
		<mw-button
			:large="large"
			:progressive="progressive"
			:destructive="destructive"
			:outlined="outlined"
			:type="type"
			:icon="icons[icon]"
			:indicator="icons[indicator]"
			:href="href"
			:block="block"
			:label="label"
			@click="click"
		/>
	`
} );
