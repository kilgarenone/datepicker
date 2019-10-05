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

```html
<script src="https://unpkg.com/datepickerdate@1.0.12/lib/index.cjs.js"></script>
```

**UMD**

```html
<script src="https://unpkg.com/datepickerdate@1.0.12/lib/index.js"></script>
```

**ES Module**

```html
<script src="https://unpkg.com/datepickerdate@1.0.12/lib/index.esm.js"></script>
```

## Styles

You can either just use my CSS:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/datepickerdate@1.0.12/lib/index.css"
/>
```

```js
// in a css file
@import './node_modules/datepickerdate/lib/index.css';

// js file with bundler(webpack)
import "datepickerdate/lib/index.css";
```

Or, skip all that and style your own with pure CSS!

The wrapper `div` of the component has a CSS class called `dpd` as a namespace, and each of the major UI elements in the datepicker has an associated class you can select for styling.

For example, to style the `.calendar` element,
![alt text](https://i.imgur.com/q7Q5Z7A.png)

you would do this in your CSS file:

```CSS
.dpd .calendar {
  background-color: #f1f1f1;
  font-size: 0.8rem;
}
```

So it's just pure CSS- You select a class name, but here we 'namespace' it under the `.dpd` class to prevent classes collision.

## Usage

Well, you use it like any other React component with props:

```js
import { Datepicker } from "datepickerdate";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.toLocaleString("en-US", {
    month: "short"
  })} ${date.getDate()}`;
}

class Datepicker extends Component {
  handleCtrlChange(name, value) {
    console.log(name, value);
  }

  render() {
    return (
      <Datepicker
        name="yourFormControlName"
        value="2019-08-28"
        placeholder="Your custom placeholder"
        onDateChanged={this.handleCtrlChange}
        formatter={formatDate}
      />
    );
  }
}
```

## Formatting

The display and transmission of a date are usually in a very different format.

This datepicker output a selected date in the standard **ISO8601** format, effectively giving you total control in both cases.

To display a selected date however you want, you will provide your own function that accepts an argument that is a ISO8601 date string.

For example, to display a date like `Fri 28`:

```js
function dateFormatter(dateStr) {
  const date = new Date(dateStr);
  return `${date.toLocaleString("en-US", { month: "short" })} ${date.getDate()}`;
}

...

<Datepicker formatter={dateFormatter} />
```
