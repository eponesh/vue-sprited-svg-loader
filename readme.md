# vue-sprited-svg-loader

[![Build Status](https://travis-ci.org/eponesh/vue-sprited-svg-loader.svg?branch=master)](https://travis-ci.org/eponesh/vue-sprited-svg-loader)
[![Coverage Status](https://coveralls.io/repos/github/eponesh/vue-sprited-svg-loader/badge.svg)](https://coveralls.io/github/eponesh/vue-sprited-svg-loader)
[![npm version](https://badge.fury.io/js/vue-sprited-svg-loader.svg)](https://badge.fury.io/js/vue-sprited-svg-loader)

Simple svg sprite webpack loader for Vue to use .svg files as component. Based on `svg-sprite-loader`. With typescript support.

See [Demo Example](https://eponesh.github.io/vue-sprited-svg-loader/examples/dist/index.html).

[![example image](https://pp.userapi.com/c844720/v844720788/190a76/jnPq2s_x3sw.jpg)](https://eponesh.github.io/vue-sprited-svg-loader/examples/dist/index.html)

## Install

Requires `svg-sprite-loader` as first loader.

```bash
npm i -D vue-sprited-svg-loader svg-sprite-loader
```
## Webpack Loader
 
```js
module: {
    rules: [
        {
            test: /\.svg$/,
            use: [
                'vue-sprited-svg-loader',
                'svg-sprite-loader'
            ]
        }
    ]
}
```

## Usage

### Script
```js
import IconFirst from './icons/icon-1.svg';
import IconSecond from './icons/icon-2.svg';

export default {
    components: {
        IconFirst,
        IconSecond
    }
};
```

### Template
```html
<div class="icons-example">
    <IconFirst class="first-icon"/>
    <IconSecond :style="{ fill: 'currentColor', color: 'red' }"/>
</div>
```

## Usage inside Slot

By default component has slot named `icon`.

`VueButton.vue`
```html
<button class="button">
    <slot name="icon"></slot>
    <slot></slot>
</button>
```

`App.vue`
```html
<VueButton>
    <IconFirst />
    Press Me
</VueButton>
```

## Props

### width: `string | number`
Append width to style in `pixels`.

```html
<MyIcon width="24" />
```

### height: `string | number`
Append height to style in `pixels`.

```html
<MyIcon height="24" />
```

### size: `string | number`
Append both width and height to style in `pixels`.

```html
<MyIcon size="24" />
```

## Options

```js
[
    {
        loader: 'vue-sprited-svg-loader',
        options: {
            customClass: 'icon',
            slotName: 'icon'
        }
    },
    'svg-sprite-loader'
]
```

### customClass: `string` = ''

Add custom class to component

```html
<svg class="customClass"> ... </svg>
```

### slotName: `string` = 'icon'

Add custom slot name to component

```html
<svg slot="slotName"> ... </svg>
```
