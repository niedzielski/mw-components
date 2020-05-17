<template>
	<component
		:is="component"
		:id="id"
		:class="classes"
		:href="href"
		:disabled="disabled"
		@click="onClick"
	>
		<mw-icon
			v-if="icon"
			:icon="icon"
			:icon-name="iconName"
			:size="large ? 28 : iconSize"
			class="mw-ui-button__icon"
		/>
		<span
			v-if="type !== icon && label"
			class="mw-ui-button__label"
			v-text="label"
		/>
		<mw-icon
			v-if="indicator"
			:icon="indicator"
			:size="large ? 28 : indicatorSize || iconSize"
			class="mw-ui-button__indicator"
		/>
	</component>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import MwIcon from '../icon/Icon.vue';
import '../styles/mediawiki/mediawiki.ui/components/buttons.less';

export default Vue.extend( {
	name: 'MwButton',
	components: {
		MwIcon
	},
	props: {
		id: { type: String, default: undefined },
		label: { type: String, default: undefined },
		disabled: Boolean,
		depressed: Boolean,
		block: Boolean,
		large: Boolean,
		icon: { type: String, default: undefined },
		iconName: { type: String, default: undefined },
		iconSize: {
			type: [ Number, String ],
			default: undefined
		},
		indicatorSize: {
			type: [ Number, String ],
			default: undefined
		},
		indicator: { type: String, default: undefined },
		href: { type: String, default: undefined },
		accessKey: { type: String, default: undefined },
		outlined: Boolean,
		progressive: Boolean,
		destructive: Boolean,
		type: {
			type: String as PropType<'button'| 'toggle' | 'icon' | 'text'>,
			default: 'button',
			validator( value ) {
				return [ 'button', 'toggle', 'icon', 'text' ].indexOf( value ) !== -1;
			}
		}
	},
	computed: {
		component() {
			return this.href ? 'a' : 'button';
		},
		classes() {
			return {
				'mw-ui-button': true,
				'mw-ui-block': this.block,
				'mw-ui-button-depressed': this.depressed || this.outlined,
				'mw-ui-button-disabled': this.disabled,
				'mw-ui-big': this.large,
				'mw-ui-progressive': this.progressive,
				'mw-ui-destructive': this.destructive,
				'mw-ui-button-icon': this.type === 'icon',
				'mw-ui-button-outlined': this.outlined,
				'mw-ui-button-text': this.type === 'text'
			};
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
@import "../styles/mediawiki/mediawiki.less/mediawiki.ui/variables.less";

// Neutral button styling
//
// These are the main actions on the page/workflow. The page should have only one of progressive and
// destructive buttons, the rest being quiet.
//
// Styleguide 2.1.
.mw-ui-button {
	.mw-ui-button__icon + .mw-ui-button__label,
	.mw-ui-button__label + .mw-ui-button__indicator {
		padding-left: 8px;
	}

	// Do not break words in buttons.
	.mw-ui-button__label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&.mw-ui-button-icon {
		font-size: 0;
	}

	// Buttons that act like links
	&.mw-ui-button-icon,
	&.mw-ui-button-text {
		color: @colorButtonText;
		border-color: transparent;
		background-color: transparent;
		min-width: 0;

		&:hover {
			background-color: transparent;
			color: @colorProgressiveHighlight;
		}

		&:active {
			color: @colorProgressiveActive;
		}

		&:focus {
			background-color: transparent;
			color: @colorProgressive;
		}
	}

	&.mw-ui-button-active {
		color: @colorProgressiveHighlight;
	}

	&.mw-ui-button-depressed {
		color: @colorProgressiveHighlight;
	}
}
</style>
