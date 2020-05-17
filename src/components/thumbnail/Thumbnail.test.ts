import { shallowMount } from '@vue/test-utils';
import MwThumbnail from './Thumbnail.vue';

describe( 'Thumbnail', () => {
	it( 'renders image when passed', () => {
		const wrapper = shallowMount( MwThumbnail, {
			propsData: { thumbnail: { src: 'randomimage.png' } }
		} );
		expect( wrapper.get( 'img' ) ).toBeTruthy();
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'use fallback icon when image not passed', () => {
		const wrapper = shallowMount( MwThumbnail, {
			propsData: {}
		} );

		expect( () => wrapper.get( 'img' ) ).toThrow();
		expect( wrapper.get( '.mw-ui-thumbnail--missing' ) ).toBeTruthy();
	} );
} );
