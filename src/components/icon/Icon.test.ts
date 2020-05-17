import { shallowMount } from '@vue/test-utils';
import MwIcon from './Icon.vue';
import { mwIconTrash } from './icons';

describe( 'Icon', () => {
	it( 'renders props.iconName when passed', () => {
		const iconName = 'trash';
		const wrapper = shallowMount( MwIcon, {
			propsData: { iconName }
		} );
		expect( wrapper.find( 'title' ).text() ).toBe( iconName );
	} );

	it( 'matches the snapshot with an HTML element passed as slot', () => {
		const wrapper = shallowMount( MwIcon, {
			propsData: {
				iconName: 'trash',
				width: 48,
				height: 24,
				icon: mwIconTrash,
				iconColor: '#ddd'
			}
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
