# 🧩 @wikimedia/mw-components

Vue.js user interface components for search.

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
- `build`: compile source inputs to bundle outputs.
- `test` / `t`: build the project and execute all tests. Anything that can be validated by
  automation before publishing runs through this command.

The remaining undocumented scripts are utilities and not expressly supported workflows.

[Configure your NVM shell environment]:  http://nvm.sh#usage

## Design goals

- Thoroughly typed. Accurate typing improves comprehension for tooling and programmers.
- Performant and intelligently divided with minimal required dependencies.
- Well tested and robust.

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
