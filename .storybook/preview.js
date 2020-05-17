import { addParameters } from '@storybook/vue';

// See components/styles/grid.less.
const viewports = {
	xs: {
		name: 'Extra small (xs) phone',
		styles: { width: '411px', height: '731px' }
	},
	sm: {
		name: 'Small (sm) to medium phablet',
		styles: { width: '768px', height: '1024px' }
	},
	md: {
		name: 'Medium (md) tablet to laptop',
		styles: { width: '960px', height: '1200px' }
	},
	lg: {
		name: 'Large (lg) desktop',
		styles: { width: '1264px', height: '1200px' }
	},
	xl: {
		name: 'Extra large (xl) 4k and ultra-wide',
		styles: { width: '2000px', height: '2000px' }
	}
};

const backgrounds = [
	{ name: 'white', value: '#fff' }, // Base100
	{ name: 'dark', value: '#202122' }, // Base10
	{ name: 'black', value: '#000' } // Base0
];

addParameters( { viewport: { viewports }, backgrounds } );
