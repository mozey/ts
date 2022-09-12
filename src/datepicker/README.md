# src/datepicker

## index.ts

Examples of a simple datepicker using only select elements. 

Date and time calculations are done with [luxon](https://moment.github.io/luxon), to install run `npm install -S luxon`

The datepicker also demonstrates how to use [PureJS](https://pure-js.com/) ("Javascript Template Engine") with directives to render HTML templates. This can be done without adding extra annotations to the markup. The only requirement is a unique selector for the element that is being rendered. This approach to templates is useful for
- keeping the markup clean, and defining template logic in the source only
- improving performance of large component, e.g. less event handlers, and lower level control of reactive elements

To install run `npm install -S pure`

## datepicker.ts

Simple datepicker using only select elements

