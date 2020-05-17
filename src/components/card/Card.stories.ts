import Vue from 'vue';
import { text } from '@storybook/addon-knobs';
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
		title: {
			default: text( 'Card title', 'Title' )
		}
	},
	data() {
		return { mwIconWikipediaLogo };
	},
	template: `
		<mw-card :title="title">
			<mw-icon title="Wikipedia" :icon="mwIconWikipediaLogo" size="256" />
		</mw-card>
	`
} );
