import Vue from 'vue';
import { color, number } from '@storybook/addon-knobs';
import MwIcon from './Icon.vue';
import * as icons from './icons';

export default {
	title: 'Components/Icon',
	component: MwIcon,
	parameters: { actions: { disable: true } }
};

export const AllIcons = (): Vue.Component => Vue.extend( {
	components: { MwIcon },
	data: () => ( {
		icons,
		iconKeys: Object.keys( icons )
	} ),
	props: {
		size: {
			default: number( 'Icon size', 24 )
		},
		iconColor: {
			default: color( 'Icon color', '#000' )
		}
	},
	template: `
		<div>
			<div v-for="icon in iconKeys" :key="icon">
				<mw-icon :title="icon" :icon="icons[icon]" :iconColor="iconColor" :size="size" />
				{{icon}}
			</div>
		</div>
	`
} );
