# 🧩 @wikimedia/mw-components

Vue.js user interface components for MediaWiki's Vector skin.

**View the components online:**

- [User interface catalog](https://mw-components.netlify.app/ui)
- Chunk source map divisions:
	- MWC: [min](https://mw-components.netlify.app/sourceMaps/mwcMin.html) /
	  [min+gzip](https://mw-components.netlify.app/sourceMaps/mwcMinGzip.html)
	- Primitives: [min](https://mw-components.netlify.app/sourceMaps/primitivesMin.html) /
	  [min+gzip](https://mw-components.netlify.app/sourceMaps/primitivesMinGzip.html)
- [Minified and gzipped bundle size report](https://mw-components.netlify.app/minGzipBundleSize.txt)

[![Netlify Status](https://api.netlify.com/api/v1/badges/93062612-dc3e-4945-a30d-0672b22c5e42/deploy-status)](https://app.netlify.com/sites/mw-components/deploys)

Learn more about the [different builds](#different-builds) available below.

## Table of contents

<!--
	Markdown Preview Enhanced is used to automatically generate the table of contents. You don't
	have to use it but please leave these directives for those who choose to. It helps keeps the
	TOC in sync.
-->
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

- [Table of contents](#table-of-contents)
- [Usage](#usage)
  - [Different builds](#different-builds)
  - [Version history](#version-history)
- [Development](#development)
  - [Quick start](#quick-start)
  - [NPM scripts](#npm-scripts)
  - [Conventions](#conventions)
    - [Terminology and naming](#terminology-and-naming)
      - [Components](#components)
      - [Padding and margins](#padding-and-margins)
      - [Viewports](#viewports)
      - [Et cetera](#et-cetera)
  - [Less styling](#less-styling)
    - [Layout and components](#layout-and-components)
    - [Less vs script imports](#less-vs-script-imports)
    - [MediaWiki legacy compatibility](#mediawiki-legacy-compatibility)
      - [ResourceLoader module mapping and chunks](#resourceloader-module-mapping-and-chunks)
      - [Extending styles without breaking compatibility](#extending-styles-without-breaking-compatibility)
      - [Migration and breaking compatibility](#migration-and-breaking-compatibility)
  - [Storybook](#storybook)
    - [With Vue.js devtools](#with-vuejs-devtools)
  - [Versioning](#versioning)
- [Design goals](#design-goals)
- [Performance](#performance)
  - [Inspecting bundle contents](#inspecting-bundle-contents)
  - [Configuration](#configuration)
- [Known issues](#known-issues)
- [License (MIT)](#license-mit)

<!-- /code_chunk_output -->

## Usage

Install the package and Vue.js:

```bash
npm i -D vue@2 @wikimedia/mw-components
```

Import the appropriate build:

```js
import mwc from '@wikimedia/mw-components';
```

### Different builds

The following chunks are available:

- mwc.js/css: the complete library and default export.
- mwc-primitives.js/css: MwButton, MwInput, and other primitives needed to build any user
	interface.
- mediawiki.ui.button.js/css: MediaWiki styles. Use these in non-MediaWiki contexts only.

Each chunk is side-effect free. All chunks are fully compiled ES5 / CSS and require an Vue.js
runtime.

### Version history

See the [changelog].

[changelog]: changelog.md

## Development

### Quick start

```bash
npm i && npm start
```

[NVM] is used to specify Node.js version but any recent version usually works.

[NVM]:  http://nvm.sh

### NPM scripts

[Configure your NVM shell environment] (e.g., `nvm install $(<.nvmrc) && nvm use`) before executing
these scripts.

- `install` / `i`: install project dependencies. 
- `start`: launch Storybook development workflow.
- `run build`: compile source inputs to bundle outputs under `dist/`.
- `test` / `t`: build the project and execute all tests. Anything that can be validated
	automatically before publishing runs through this command.
- `run format`: apply lint fixes automatically where available.
- `run docs`: generate all documentation under `docs/`.
- `version`: see [Versioning](#versioning).

💡 Tip: add `-s` to omit verbose command echoing. E.g., `npm -s i` or `npm -s run docs`.

The remaining undocumented scripts are utilities and not expressly supported workflows.

[Configure your NVM shell environment]:  http://nvm.sh#usage

### Conventions

The [Vue.js Style Guide] is adhered to where possible.

[Vue.js Style Guide]: https://vuejs.org/v2/style-guide

#### Terminology and naming

##### Components

- PascalCase multi-word component names are used per the Vue.js Style Guide. Since every component
	is prefixed with `Mw`, all components are multi-word just by keeping that pattern. E.g.:
	- ✓ Use `MwFoo` with a lowercase "w".
	- ✗ Do _not_ use `MWFoo` with a capital "W". This breaks kebab-cased HTML in templates.

##### Padding and margins

- ps: *p*adding *s*tart
- ms: *m*argin *s*tart
- pe: *p*adding *e*nd
- me: *m*argin *e*nd
- pt: *p*adding *t*op
- mt: *m*argin *t*op
- pb: *p*adding *b*ottom
- mb: *m*argin *b*ottom
- pa: *pa*dding
- ma: *ma*rgin

##### Viewports

- xs: e*x*tra *s*mall
- sm: *sm*all
- md: *m*e*d*ium
- lg: *l*ar*g*e
- xl: e*x*tra *l*arge

##### Et cetera

- bidir: bidirectional

### Less styling

#### Layout and components

Most of the component-specific Less is within the style sections of single file components
themselves except for legacy and shared styles. Generic layout Less that may or may not be used by
components is under styles/.

#### Less vs script imports

- Use Less imports for variable and mixin definitions required for Less to CSS compilation in single
	file component styles. Only the compiled, unique, single file component CSS ships, not the
	definitions themselves. E.g.:
	```html
	<style lang="less">
	@import "../styles/mediawiki/mediawiki.less/mediawiki.ui/variables.less";
	.mw-foo {
		color: @colorGray1;
	}
	// …
	</script>
	```
- Use script imports to copy rules into the bundle. If MediaWiki compatibility rules were imported
	this way, they would be redundantly shipped on Wikipedia. Don't do that. I.e., these are
	stylesheets that are shipped _in addition to_ the single file component styles. E.g.:
	```html
	<script lang="ts">
	import Vue from 'vue';
	import '../styles/grid/grid.less';
	// …
	</script>
	```

#### MediaWiki legacy compatibility

MediaWiki compatibility is a goal for performance and limiting initial development scope. These
compatibility files have been copied from MediaWiki/resources/src and changed as minimally as
possible (file paths were updated and some conditionals were added to strip rules from
compilations).

Given compatibility, the styles are not structured as consistently as would be ideal for
mw-components. However, they represent years of refining so exercise great care when choosing to
break compatibility.

All _legacy_ styles reside exclusively under [src/components/styles/mediawiki]

- mediawiki/mediawiki.less: variable and mixin definitions required for Less to CSS compilation.
- mediawiki/mediawiki.ui/components: styling rules.

The file hierarchy matches Core. It must be kept in sync with Core as a subset or different styles
will appear in production Wikipedia and in the library. If keeping the styles in sync is too
challenging, a package.json for styles only can be added in Core (anywhere) to publish them and
this project will depend on that package instead of file copies.

[src/components/styles/mediawiki]: src/components/styles/mediawiki

##### ResourceLoader module mapping and chunks

The styles correspond to the following ResourceLoader modules:

| ResourceLoader module | mw-components files |
| --------------------- | :------------------ |
| mediawiki.ui.button   | mediawiki/mediawiki.ui/components/buttons.less |

These modules are shipped on every Vector pageview?

MediaWiki consumers should use chunks that do not include the MediaWiki styles.

##### Extending styles without breaking compatibility

Any single file component can ship additional rules in its styles section. Furthermore, these can be
scoped if necessary. Completely new shared styles should live under components/styles/ like
components/styles/grid.

##### Migration and breaking compatibility

When the time is right to transition with a breaking change, the following should be considered:

- Naming conflicts: if the existing styles will still be shipped in MediaWiki, use different class
	names or scoped styles in mw-components. E.g., the styles for MwButton are currently
	`mw-ui-button`. The styles (not the MwButton component) may transition to `mw-ui-button2` while
	`mw-ui-button` is phased out.
- Stop importing the legacy styles.
- Delete unused MediaWiki style files in mw-components.
- Bump the major version number if the change affects consumers.

Division as needed is similar to the Desktop Improvements Project approach taken for splitting
Vector, an old skin, into "legacy" and "latest" modes. The approach impedes readability, makes the
library a little clumsy in places, and all that hinders reusability but seems the most practical
compromise for all design goals.

### Storybook

#### With Vue.js devtools

[Storybook is incompatible with Vue.js devtools]. There are at least a couple workarounds:

- In Firefox, open the story you wish to inspect. Right-click anywhere in the story and select
	`This Frame -> Open Frame in New Tab`. devtools should now work correctly in the new tab.
- Launch the standalone Vue.js devtools app via `npx -p @vue/devtools vue-devtools` and add
	`<script src="//localhost:8098"></script>` to .storybook/preview-head.html. Now run Storybook
	`npm -s start` and devtools should connect.

[Storybook is incompatible with Vue.js devtools]: https://github.com/storybookjs/storybook/issues/1708

### Versioning

To publish a new release:

1. Update the [changelog](changelog.md).
1. Execute `npm version <patch|minor|major>`.

The NPM scripts are configured to help prevent unstaged changes from being published and that tests
pass prior.

<details markdown>
<summary>Example…</summary>

```
$ vim changlog.md # note a new feature and a couple bug fixes
$ npm version minor
```
</details>

## Design goals

- Deploy to all test wikis before August 31, 2020: frwiktionary, hewiki, ptwikiversity, frwiki,
	euwiki, fawiki.
- Modern, fast, iterative developer / designer workflows.
- Delightful user experiences shareable as an NPM package and reusable everywhere with and without
	MediaWiki.
- Fully typed. Accurate typing improves comprehension for tooling and programmers.
- Performant and intelligently divided with minimal required dependencies.
- Outstanding internationalization and accessibility support.
- Well tested and robust.
- Thoroughly documented for development and usage.
- [Semantically versioned].
- Practical MediaWiki compatibility. In/compatibility strategies are hopefully intentional,
	pragmatic, and ongoing.

[Semantically versioned]: https://semver.org/

## Performance

Bundle sizes and contents are reported under [docs/sourceMaps/] and tested with [bundlesize]. The
rule of thumb is: identical data generally compresses well. It is recommended to evaluate
performance using the minified gzipped outputs.

For example, some CSS selectors are distant but have identical rules. This creates a large
uncompressed CSS bundle when compiled. However, the compressed size may be negligible. Use the
bundlesize tests to evaluate gzipped sizes before making optimizations that impede readability.

[bundlesize]: https://github.com/siddharthkp/bundlesize
[docs/sourceMaps/]: docs/sourceMaps/

### Inspecting bundle contents

See [docs/sourceMaps/]. For a second opinion, consider:

```bash
ls -1 dist/*.{js,css}|
sort|
while IFS= read filename; do
	printf \
		'%s: %sB / %sB\n' \
		"$filename" \
		"$(wc -c < "$filename"|numfmt --to=iec-i)" \
		"$(gzip -c "$filename"|wc -c|numfmt --to=iec-i)"
done
printf \
	'%s: %sB / %sB\n' \
	"Total" \
	"$(cat dist/*.{js,css}|wc -c|numfmt --to=iec-i)" \
	"$(cat dist/*.{js,css}|gzip -c|wc -c|numfmt --to=iec-i)"
```

[docs/sourceMaps/]: docs/sourceMaps/

### Configuration

JavaScript and CSS build product bandwidth performances are tracked and tested with bundlesize. All
configuration is versioned in [bundlesize.config.json]:

- The values in the configuration are upper limits. As a convention, the number is rounded up to
	the nearest tenth of a kibibyte. For example, a new file added of size `4.15 KB` would have its
	initial limit set at `4.2 KB`. Whenever intentional changes causes its limit to increase or
	decrease beyond a tenth of a kibibyte boundary, the size should be revised.
- bundlesize internally uses Bytes utility which [only supports base-2 units]. Case-insensitive
	decimal [JEDEC notation] is used in the config. This means 1.5 KB or 1.5 kb is 1536 bytes,
	_not_ 1500 bytes.
- ⚠️ Warning: values that cannot be parsed are _silently ignored_! When making changes, verify
	that a comparison of two values is printed like `2.54KB < maxSize 2.6KB (gzip)`. If only one
	number is shown (e.g., `2.54KB (gzip)`), the number has been entered incorrectly.
- ⚠️ Warning: values entered must have a leading units position specified. Sub-one sizes like
	`.5 KB` must be written with a leading zero like `0.5 KB` or they will not be pared.
- The bundlesize thresholds specify minified gzipped maximums. Outputs are minified as part of
	the build process and gzip is the a common HTTP compression.

[JEDEC notation]: https://en.wikipedia.org/wiki/Template:Quantities_of_bytes    
[only supports base-2 units]: https://github.com/visionmedia/bytes.js#bytesparsestringnumber-value-numbernull     
[bundlesize.config.json]: bundlesize.config.json

## Known issues

- Type definitions are not emitted to dist/ in the current configuration. The consequence is that
	external consumers will not get great typing. This may be worked around by disabling
	[ForkTsCheckerWebpackPlugin] for production builds. As part of fixing this issue, the
	package.json `types` field should be added.
- If Storybook encounters an error when booting, it does not launch even after the error is
	resolved.

[ForkTsCheckerWebpackPlugin]: https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/49

## License (MIT)

[The MIT License]

Copyright Wikimedia Foundation, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[The MIT License]: https://opensource.org/licenses/MIT
