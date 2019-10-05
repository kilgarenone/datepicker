# Datepicker

Gives you the most basic datepicker functionality, while having total freedom on what to do with the selected date(ISO8601), its display format, and the overall look & feel.

🦢 A **Preact** datepicker component

🦩 Lightweight ([2.9kB](https://bundlephobia.com/result?p=datepickerdate@1.0.1) minified+gzipped)

🦆 No-frills- Just give you the standard **ISO8601** date. Provide your own formatter function for display.

🦅 You can skip the external CSS file and style yourself completely using pure CSS

## Demo

https://kheohyeewei.com/datepicker/

## Install

You can install `datepickerdate` as an NPM package:

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
<script
  type="module"
  src="https://unpkg.com/datepickerdate@1.0.12/lib/index.esm.js"
></script>
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
<img src="https://i.imgur.com/q7Q5Z7A.png" width="400" />

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
      />
    );
  }
}
```

## Formatting

In practise, the display and transmission of a date are usually in a very different format.

To give you total control in both cases, this datepicker simply output selected dates in the standard **ISO8601** format e.g `2019-10-22`.

To display a selected date however you want, you will provide your own function that accepts an argument that is a ISO8601 date in string.

For example, to display a date like `Fri 28`:

```js
function dateFormatter(dateStr) {
  const date = new Date(dateStr);
  return `${date.toLocaleString("en-US", { month: "short" })} ${date.getDate()}`;
}

...

<Datepicker formatter={dateFormatter} />
```

#### Storage

Before transmitting and storing your date, you might want to convert it to a **UTC** format by simply doing this:

`new Date().toISOString() // 2019-10-05T05:51:02.124Z`

## Props

**label** : string
_Optional_

The label name of your datepicker form control.

**name** : string
_Optional_

The `name` of your datepicker control. Exactly like the `name` in `<input name="age" />`

**placeholder** : string
_Optional_

The placeholder for your datepicker input field.

**value** : string
_Optional_

The initial date value.

It must be in a format that can be parsed by the `Date` object. The standard practise is follow the **ISO8601** format (e.g `2019-10-22`) or in **UTC** (e.g `2019-10-05T05:51:02.124Z`)

**onDateChanged** : (name: string, date: string) => void
_Optional_

A function to handle date changes.

Parameter:

1. `name` - The value of the value passed to the `name` prop.
2. `date` - The selected date in ISO8601 format as a `string`.

**formatter** : (date: string) => string
_Optional_

A function to convert a selected date into a desired format to display in the UI.

Parameter:

1. `date` - The selected date in ISO8601 format as a `string`.

## License

MIT © <a href="mailto:oldjoy@protonmail.com">Kheoh Yee Wei</a>
