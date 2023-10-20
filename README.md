# Gridify
Tailwind CSS plugin to generate grid template areas

## Install

```bash
npm i @adremp/tailwind-gridify
```

```bash
yarn add tailwindcss-gridify
```

```js
import gridify from "@adremp/tailwind-gridify";

module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [gridify({defaultUnit: "rem"})],
};
```

## Options

| Name  | Description |
| ------------- | ------------- |
| templatePrefix  | Prefix for classes defining Grid Templates. Default is "tmp".  |
| areaPrefix  | Prefix for classes defining Grid Areas. Default is "ga".  |
| defaultUnit  | The unit of grid ceil. Default is "px". |

## Using

| Shortcut  | Description |
| ------------- | ------------- |
| .  | Just space |
| \<name>  | An element that fills 1 cell |
| \<name>*2  | An element that fills 2 cells |
| \<name>*  | An element that fills free cells, at least 1 cell. Multiple elements can fill equal space |
| # | An empty cell (.) that can have the same effect as a regular cell |
| \<name1>..\<name2> | Equivalent to "\<name1>.#*.\<name2>" |
| @100  | Row size is 100px (default unit is px). Supports all units |
| @50%^max  | Creates a "minmax(50%, max-content)" row size. Also accepts min (min-content) |
| @50%^  | minmax(50%, auto) |
| @^50%  | minmax(auto, 50%) |
| / max^1fr*2  |  Column sizes defines after "/" like by default |

## Example 

```html
  <div className="grid tmp-[el1*@100|#*@30|el2.el3*3.#@30%^|..el3*3../25%.1fr*.25%]">
    <div className="ga-[el1]"></div>
    <div className="ga-[el2]"></div>
    <div className="ga-[el3]"></div>
  </div>

// Equivalent grid-template:
// "el1 el1 el1 el1 el1" 100px
// ". . . . ." 30px
// "el2 el3 el3 el3 ." minmax(30%, auto)
// ". el3 el3 el3 ." auto / 25% 1fr 1fr 1fr 25%;
```
