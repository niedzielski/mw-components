import { shallowMount } from '@vue/test-utils';
import MwCard from './Card.vue';

describe( 'Card', () => {
	test( 'renders correctly', () => {
		const wrapper = shallowMount( MwCard );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
