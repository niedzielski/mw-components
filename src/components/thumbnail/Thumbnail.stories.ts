import Vue from 'vue';
import MwThumbnail from './Thumbnail.vue';

export default {
	title: 'Components/Thumbnail',
	component: MwThumbnail,
	parameters: { layout: 'centered', actions: { disable: true }, knobs: { disable: true } }
};

export const Thumbnail = (): Vue.Component => Vue.extend( {
	components: { MwThumbnail },
	data() {
		return {
			thumbnail: {
				url: 'https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg',
				width: 103,
				height: 94
			}
		};
	},
	template: '<mw-thumbnail :thumbnail="thumbnail" />'
} );
