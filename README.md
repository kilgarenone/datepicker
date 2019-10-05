# Datepicker

Gives you the most basic datepicker functionality, while having total freedom on what to do with the selected date(ISO8601), its display format, and the overall look & feel.

🦢 A **Preact** datepicker component
🦩 Lightweight ([2.9kB](https://bundlephobia.com/result?p=datepickerdate@1.0.1) minified+gzipped)
🦆 No-frills- Just give you the standard **ISO8601** date. Provide your own formatter function for display.
🦅 You can skip the external CSS file and style yourself completely using pure CSS

## Demo

https://kheohyeewei.com/datepicker/

## Installation

You can install `Datepickerdate` as an NPM package:

```
npm install datepickerdate
```

Or link directly to the [CDN](https://unpkg.com/browse/datepickerdate/):

**CommonJS**

```
<script src="https://unpkg.com/datepickerdate@1.0.12/lib/index.cjs.js"></script>
```

**UMD**

```
<script src="https://unpkg.com/datepickerdate@1.0.12/lib/index.js"></script>
```

**ES Module**

```
<script src="https://unpkg.com/datepickerdate@1.0.12/lib/index.esm.js"></script>
```

## Styles

You can either just use my CSS:

```
<link rel="stylesheet" href="https://unpkg.com/datepickerdate@1.0.12/lib/index.css"/>
```

```
// in a css file
@import './node_modules/datepickerdate/lib/index.css';

// js file with bundler(webpack)
import "datepickerdate/lib/index.css";
```

Or, skip all that and style your own with pure CSS! The wrapper `div` of the component has a CSS class called `dpd` as a namespace, and each of the major UI elements in the datepicker has an associated class you can select for styling.

For example, to style the `calendar` component,
