<template>
	<span class="mw-ui-icon notranslate">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			:width="width || size"
			:height="height || size"
			viewBox="0 0 24 24"
			:aria-labelledby="iconName"
			aria-hidden="true"
			role="presentation"
			@click="onClick"
		>
			<title :id="iconName">{{ iconName }}</title>
			<g :fill="iconColor">
				<path :d="icon" />
			</g>
		</svg>
	</span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
	name: 'MwIcon',
	props: {
		icon: {
			type: String,
			default: null
		},
		iconName: {
			type: String,
			default: null
		},
		iconColor: {
			type: String,
			default: 'currentColor'
		},
		width: {
			type: [ Number, String ],
			default: 0
		},
		height: {
			type: [ Number, String ],
			default: 0
		},
		size: {
			type: [ Number, String ],
			default: 20
		}
	},
	methods: {
		onClick( event: MouseEvent ) {
			this.$emit( 'click', event );
		}
	}
} );
</script>

<style lang="less">
@import '../../styles/mediawiki/mediawiki.less/mediawiki.ui/variables.less';
@import '../../styles/mediawiki/mediawiki.less/mediawiki.mixins.less';

.mw-ui-icon {
	align-items: center;
	display: inline-flex;
	font-feature-settings: 'liga';
	font-size: @iconSize;
	justify-content: center;
	letter-spacing: normal;
	line-height: 1;
	text-indent: 0;
	.transition(~'0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s');
	vertical-align: middle;
	user-select: none;
}
</style>
