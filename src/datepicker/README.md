# src/datepicker

## index.ts

Examples of a simple datepicker using only select elements. Date and time calculations are done with [luxon](https://moment.github.io/luxon).

The pre-build ES module release of luxon is included in the `app.js` bundle. This is done without adding all the artifacts that are created by `npm install -S luxon`, keeping the size of `node_modules` small, but still vendor-ing dependencies in the repo. See [node_modules/luxon/README](https://github.com/mozey/ts/tree/main/node_modules/luxon#readme)

The datepicker also demonstrates how to use [PureJS](https://pure-js.com/) ("Javascript Template Engine") with directives to render HTML templates. This can be done without adding extra annotations to the markup. The only requirement is a unique selector for the element that is being rendered

## datepicker.ts

Simple datepicker using only select elements

