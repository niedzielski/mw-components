# 🧩 @wikimedia/mw-components

Vue.js user interface components for search.

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
  - [Versioning](#versioning)
- [Design goals](#design-goals)
- [Performance](#performance)
  - [Inspecting bundle contents](#inspecting-bundle-contents)
  - [Configuration](#configuration)
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

- index.js: the complete library and default export.

Each entry is side-effect free.

### Version history

See the [changelog].

[changelog]: changelog.md

## Development

### Quick start

```bash
npm i && npm run build
```

[NVM] is used to specify Node.js version but any recent version usually works.

[NVM]:  http://nvm.sh

### NPM scripts

[Configure your NVM shell environment] (e.g., `nvm install $(<.nvmrc) && nvm use`) before executing
these scripts.

- `install` / `i`: install project dependencies. 
- `run build`: compile source inputs to bundle outputs under `dist/`.
- `test` / `t`: build the project and execute all tests. Anything that can be validated by
	automation before publishing runs through this command.
- `run docs`: generate all documentation under `docs/`.
- `version`: see [Versioning](#versioning).

💡 Tip: add `-s` to omit verbose command echoing. E.g., `npm -s i` or `npm -s run docs`.

The remaining undocumented scripts are utilities and not expressly supported workflows.

[Configure your NVM shell environment]:  http://nvm.sh#usage

### Conventions

- The [Vue.js Style Guide] is adhered to where possible.
- PascalCase multi-word component names are used per the Vue.js Style Guide. Since every component
  is prefixed with `Mw`, all components are multi-word just by keeping that pattern. E.g.:
  - ✓ Use `MwFoo` with a lowercase "w".
  - ✗ Do _not_ use `MWFoo` with a capital "W". This breaks kebab-cased HTML in templates.

[Vue.js Style Guide]: https://vuejs.org/v2/style-guide

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

- Fully typed. Accurate typing improves comprehension for tooling and programmers.
- Performant and intelligently divided with minimal required dependencies.
- Well tested and robust.
- Thoroughly documented for development and usage.
- [Semantically versioned].

[Semantically versioned]: https://semver.org/

## Performance

Bundle sizes and contents are reported under [docs/source-maps/] and tested with [bundlesize]. The
rule of thumb is: identical data generally compresses well. It is recommended to evaluate
performance using the minified gzipped outputs.

For example, some CSS selectors are distant but have identical rules. This creates a large
uncompressed CSS bundle when compiled. However, the compressed size may be negligible. Use the
bundlesize tests to evaluate gzipped sizes before making optimizations that impede readability.

[bundlesize]: https://github.com/siddharthkp/bundlesize
[docs/source-maps/]: docs/source-maps/

### Inspecting bundle contents

See [docs/source-maps/]. For a second opinion, consider:

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

[docs/source-maps/]: docs/source-maps/

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
