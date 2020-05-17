import { shallowMount } from '@vue/test-utils';
import MwDialog from './Dialog.vue';

describe( 'Dialog', () => {
	it( 'renders dialog with given properties', () => {
		const wrapper = shallowMount( MwDialog, {
			propsData: { title: 'Dialog Title' }
		} );
		expect( wrapper.get( '.mw-ui-dialog__header-title' ) ).toBeTruthy();
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
