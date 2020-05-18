import Vue from 'vue';
import { number } from '@storybook/addon-knobs';
import MwCard from './Card.vue';
import MwIcon from '../icon/Icon.vue';
import { mwIconWikipediaLogo } from '../icon/icons';

export default {
	title: 'Components/Card',
	component: MwCard,
	parameters: { layout: 'centered', actions: { disable: true } }
};

export const Card = (): Vue.Component => Vue.extend( {
	components: { MwCard, MwIcon },
	props: {
		size: {
			default: number( 'Icon size', 256 )
		}
	},
	data() {
		return { mwIconWikipediaLogo };
	},
	template: `
		<mw-card>
			<mw-icon :icon="mwIconWikipediaLogo" :size="size" />
		</mw-card>
	`
} );
