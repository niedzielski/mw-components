import { shallowMount } from '@vue/test-utils';
import MwButton from './Button.vue';
import { mwIconTrash, mwIconAdd } from '../icon/icons';

describe( 'Button', () => {
	it( 'renders props.id when passed', () => {
		const id = 'buttonId';
		const buttonClass = 'mw-ui-button';
		const wrapper = shallowMount( MwButton, {
			propsData: { id }
		} );
		expect( wrapper.attributes( 'id' ) ).toMatch( id );
		expect( wrapper.get( 'button' ) ).toBeTruthy();
		expect( wrapper.classes( buttonClass ) ).toBeTruthy();
	} );

	it( 'renders <a> tag when href is passed', () => {
		const href = 'wikipedia.org';
		const wrapper = shallowMount( MwButton, {
			propsData: { href }
		} );
		expect( wrapper.get( 'a' ) ).toBeTruthy();
		expect( wrapper.attributes( 'href' ) ).toMatch( href );
	} );

	it( 'renders indicator icon when passed', () => {
		const href = 'wikipedia.org';
		const wrapper = shallowMount( MwButton, {
			propsData: { href, indicator: mwIconTrash, label: 'Label' }
		} );
		expect( wrapper.get( '.mw-ui-button__indicator' ) ).toBeTruthy();
		expect( () => wrapper.get( '.mw-ui-button__icon' ) ).toThrow();
	} );

	it( 'matches the snapshot with an HTML label', () => {
		const wrapper = shallowMount( MwButton, {
			propsData: {
				progressive: true,
				large: true,
				label: 'Large button text with <b>html</b>',
				indicator: mwIconAdd
			}
		} );

		// HTML label should be converted to text.
		expect( wrapper.find( '.mw-ui-button__label' ).text() ).toBe(
			'Large button text with <b>html</b>'
		);
		// ... and not an html element as child.
		expect( () => wrapper.get( '.mw-ui-button__label b' ) ).toThrow();
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'matches the snapshot with an destructive type icon button', () => {
		const wrapper = shallowMount( MwButton, {
			propsData: {
				type: 'icon',
				destructive: true,
				icon: mwIconTrash
			}
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
