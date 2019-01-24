# vue-sprited-svg-loader

[![Build Status](https://travis-ci.org/eponesh/vue-sprited-svg-loader.svg?branch=master)](https://travis-ci.org/eponesh/vue-sprited-svg-loader)
[![Coverage Status](https://coveralls.io/repos/github/eponesh/vue-sprited-svg-loader/badge.svg)](https://coveralls.io/github/eponesh/vue-sprited-svg-loader)
[![npm version](https://badge.fury.io/js/vue-sprited-svg-loader.svg)](https://badge.fury.io/js/vue-sprited-svg-loader)

Simple svg sprite sheet webpack loader for Vue to use .svg files as component using sprite sheet.

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
    <IconFirst style="color: red"/>
    <IconSecond class="second-icon"/>
</div>
```

## Options

```js
[
    {
        loader: 'vue-sprited-svg-loader',
        options: {
            withStyle: true,
            customClass: 'icon'
        }
    },
    'svg-sprite-loader'
]
```

### withStyle: `boolean` = false

Load with helpful styles

```css
{
    width: 100%;
    height: 100%;
    fill: currentColor;
}
```

### customClass: `string` = ''

Add custom class to component

```html
<svg class="customClass"> ... </svg>
```
