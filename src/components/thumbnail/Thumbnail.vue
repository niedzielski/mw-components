<template>
	<div class="mw-ui-thumbnail">
		<img
			v-if="thumbnail"
			loading="lazy"
			:width="thumbnail.width"
			:height="thumbnail.height"
			:src="thumbnail.url"
		>
		<mw-icon
			v-else
			class="mw-ui-thumbnail mw-ui-thumbnail--missing justify-center"
			:icon="mwIconImageLayoutFrameless"
			:size="48"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import MwIcon from '../icon/Icon.vue';
import { mwIconImageLayoutFrameless } from '../icon/icons';

export default Vue.extend( {
	name: 'MwThumbnail',
	components: { MwIcon },
	props: {
		thumbnail: {
			type: Object, // [todo] Props
			default: null
		}
	},
	data: () => ( { mwIconImageLayoutFrameless } ),
	methods: {
		onClick( event: MouseEvent ) {
			this.$emit( 'click', event );
		}
	}
} );
</script>

<style lang="less">
@import '../../styles/mediawiki/mediawiki.less/mediawiki.ui/variables.less';

.mw-ui-thumbnail {
	align-items: center;
	width: auto;
	display: inline-block;

	& img {
		width: 100%;
		height: auto;
	}

	&.mw-ui-thumbnail--missing {
		background-color: @colorGray15;
	}
}

</style>
