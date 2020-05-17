import { shallowMount } from '@vue/test-utils';
import MwCard from './Card.vue';

describe( 'Card.vue', () => {
	test( 'renders correctly', () => {
		const title = 'Card title';
		const wrapper = shallowMount( MwCard, { propsData: { title } } );
		expect( wrapper.get( '.mw-ui-card__title' ).text() ).toMatch( title );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
