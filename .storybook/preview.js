import Vue from 'vue';
import { addParameters } from '@storybook/vue';
import '../src/styles/grid/grid.less';

// See src/styles/grid.less.
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

// Disable informational message in the console log:
//
//   You are running Vue in development mode.
//   Make sure to turn on production mode when deploying for production.
//   See more tips at https://vuejs.org/guide/deployment.html
Vue.config.productionTip = false;
