<template>
	<mw-card class="mw-ui-list-item row">
		<mw-thumbnail class="col-4 mw-ui-list-item__thumbnail" :thumbnail="thumbnail" />
		<div class="col-8">
			<div class="mw-ui-list-item__title">
				{{ title }}
			</div>
			<div class="mw-ui-list-item__subtitle">
				{{ subtitle }}
			</div>
		</div>
	</mw-card>
</template>

<script lang="ts">
import Vue from 'vue';
import MwCard from '../card/Card.vue';
import MwThumbnail from '../thumbnail/Thumbnail.vue';

export default Vue.extend( {
	name: 'MwListItem',
	components: { MwCard, MwThumbnail },
	props: {
		title: { type: String, default: '' },
		subtitle: { type: String, default: '' },
		thumbnail: {
			type: Object, // [todo] Props
			default: null
		}
	}
} );
</script>

<style lang="less">
@import '../../styles/mediawiki/mediawiki.less/mediawiki.ui/variables.less';

.mw-ui-list-item__subtitle {
	font-size: 0.9em;
}
</style>
