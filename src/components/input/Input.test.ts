import { shallowMount } from '@vue/test-utils';
import MwInput from './Input.vue';
import { mwIconTrash, mwIconAdd } from '../icon/icons';

describe( 'Input', () => {
	it( 'renders props.id when passed', () => {
		const inputClass = 'mw-ui-input';
		const value = 'InputContent';
		const wrapper = shallowMount( MwInput, {
			propsData: { value }
		} );
		expect( wrapper.get( 'input' ) ).toBeTruthy();
		expect( ( wrapper.find( 'input' ).element as HTMLInputElement ).value ).toMatch( value );
		expect( wrapper.classes( inputClass ) ).toBeTruthy();
	} );

	it( 'renders <textarea> tag when type is passed so', () => {
		const type = 'textarea';
		const placeholder = 'Enter some text';
		const wrapper = shallowMount( MwInput, {
			propsData: { type, placeholder }
		} );
		expect( wrapper.get( 'textarea' ) ).toBeTruthy();
		expect( wrapper.find( 'textarea' ).attributes( 'placeholder' ) ).toMatch(
			placeholder
		);
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'renders icons and indicator when passed', () => {
		const wrapper = shallowMount( MwInput, {
			propsData: { icon: mwIconTrash, indicator: mwIconAdd }
		} );
		expect( wrapper.get( '.mw-ui-input__indicator' ) ).toBeTruthy();
		expect( wrapper.get( '.mw-ui-input__icon' ) ).toBeTruthy();
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );
