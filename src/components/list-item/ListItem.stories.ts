import Vue from 'vue';
import MwListItem from './ListItem.vue';

export default {
	title: 'Components/ListItem',
	component: MwListItem,
	parameters: { layout: 'centered', actions: { disable: true }, knobs: { disable: true } }
};

export const ListItem = (): Vue.Component => Vue.extend( {
	components: { MwListItem },
	data() {
		return {
			title: 'Wikipedia',
			subtitle: 'The free encyclopedia',
			thumbnail: {
				url: 'https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg',
				width: 103,
				height: 94
			}
		};
	},
	template: `
		<div class="container">
			<mw-list-item :title="title" :subtitle="subtitle" :thumbnail="thumbnail" />
		</div>
	`
} );
