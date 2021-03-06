<template>
	<transition :name="`mw-ui-dialog-${animation}`">
		<div
			class="mw-ui-dialog"
			:class="classes"
			tabindex="0"
			role="dialog"
			aria-fullscreen="true"
			@keyup.esc="closeOnEscapeKey && close()"
		>
			<div class="mw-ui-dialog__overlay" @click="close()" />
			<div class="mw-ui-dialog__shell items-stretch">
				<slot name="header">
					<div class="mw-ui-dialog__header row ">
						<!-- eslint-disable vue/no-v-html -->
						<div
							class="col-11 items-center mw-ui-dialog__header-title justify-start"
							v-html="title"
						/>
						<!-- eslint-enable vue/no-v-html -->
						<div class="col-1 justify-center">
							<mw-button type="icon" :icon="mwIconClose" @click="close()" />
						</div>
					</div>
					<mw-divider />
				</slot>

				<div class="mw-ui-dialog__body row">
					<slot />
				</div>
				<slot name="footer" />
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import MwButton from '../button/Button.vue';
import MwDivider from '../divider/Divider.vue';
import { mwIconClose } from '../icon/icons';

export default Vue.extend( {
	name: 'MwDialog',
	components: {
		MwButton,
		MwDivider
	},
	props: {
		animation: {
			type: String as PropType<'slide-right' | 'slide-left' | 'slide-up' | 'slide-down'>,
			default: 'slide-left',
			validator: ( value ) => {
				return (
					[ 'slide-right', 'slide-left', 'slide-up', 'slide-down' ].indexOf(
						value
					) !== -1
				);
			}
		},
		fullscreen: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: null
		},
		closeOnEscapeKey: {
			type: Boolean,
			default: true
		}
	},
	data: () => ( { mwIconClose } ),
	computed: {
		classes() {
			return {
				'mw-ui-dialog': true,
				'mw-ui-dialog--fullscreen': this.fullscreen
			};
		}
	},
	mounted() {
		this.$nextTick( () => {
			( this.$el as HTMLElement ).focus();
		} );
	},
	methods: {
		close() {
			this.$emit( 'close' );
		}
	}
} );
</script>

<style lang="less">
@import '../../styles/mediawiki/mediawiki.less/mediawiki.ui/variables.less';
@import '../../styles/mediawiki/mediawiki.less/mediawiki.mixins.less';

.mw-ui-dialog {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;

	&.mw-ui-dialog--fullscreen {
		.mw-ui-dialog__shell {
			position: absolute;
			top: 0;
			left: 0;
			max-width: 100vw;
			min-width: calc( 100vw - 2px );
			min-height: calc( 100vh - 2px );
			max-height: 100vh;
		}
	}

	.mw-ui-dialog__overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: @background-color-base;
	}

	// stylelint-disable-next-line no-descending-specificity
	.mw-ui-dialog__shell {
		flex-direction: column;
		background-color: @background-color-base;
		border: @border-base;
		border-radius: @border-radius-base;
		position: relative;
		max-width: calc( 100vw - 100px );
		min-width: 300px;
		max-height: calc( 100vh - 100px );
		min-height: 200px;
		.box-shadow(0 2px 2px 0 rgba(0, 0, 0, 0.25));
	}

	.mw-ui-dialog__header {
		& > .mw-ui-dialog__header-title:not( :empty ) {
			max-height: 2em;
			max-width: 100%;
			font-weight: bold;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.mw-ui-dialog__body {
		flex: 1;
		height: 100%;
		overflow: auto;
	}

	.mw-ui-dialog__footer:not( :empty ) {
		border-top: 1px solid @colorGray12;
		max-height: 2em;
	}
}

.mw-ui-dialog- {
	&slide-left-enter-active,
	&slide-left-leave-active,
	&slide-right-enter-active,
	&slide-right-leave-active,
	&slide-up-enter-active,
	&slide-up-leave-active,
	&slide-down-enter-active,
	&slide-down-leave-active {
		transition-duration: 0.5s;
		transition-property: height, opacity, transform;
		transition-timing-function: cubic-bezier( 0.55, 0, 0.1, 1 );
		overflow: hidden;
	}

	&slide-left-enter,
	&slide-left-leave-active {
		opacity: 0;
		transform: translate( 100vw, 0 );
	}

	&slide-right-enter,
	&slide-right-leave-active {
		opacity: 0;
		transform: translate( -100vw, 0 );
	}

	&slide-up-enter,
	&slide-up-leave-active {
		opacity: 0;
		transform: translate( 0, 100vw );
	}

	&slide-down-leave-active,
	&slide-down-enter {
		opacity: 0;
		transform: translate( 0, -100vw );
	}
}
</style>
