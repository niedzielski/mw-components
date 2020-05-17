<template>
	<div :id="id" class="mw-ui-card">
		<div class="mw-ui-card__title title" v-text="title" />
		<div class="mw-ui-card__content">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
	name: 'MwCard',
	props: {
		id: {
			type: String,
			default: null
		},
		title: { type: String, default: '' }
	}
} );
</script>

<style lang="less">
@import "../../styles/mediawiki/mediawiki.less/mediawiki.ui/variables.less";
@import "../../styles/mediawiki/mediawiki.less/mediawiki.mixins.less";

.mw-ui-card {
	background-color: @background-color-base;
	box-sizing: border-box;
	margin-bottom: 1em;
	border-radius: @border-radius-base;
	padding: 8px;
	.box-shadow(0 1px 1px rgba(0, 0, 0, 0.15));
	.mw-ui-card__title {
		height: 2em;
		color: @colorGray5;
	}
}
</style>
