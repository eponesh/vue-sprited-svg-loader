const compiler = require('vue-template-compiler');
const stripRenderFunction = require('./stripRenderFunction');
const mergeProps = require('./mergeProps');

const SVG_STYLE = `{
    width: '100%',
    height: '100%',
    fill: 'currentColor'
}`;

/**
 * Generates vue component object
 * @prop { string } id - filename / xlink:href #id
 * @prop { string } customClass - custom class to component
 * @prop { boolean } withStyle - enables default styles
 * @returns { string } - component as string
 */
module.exports = function getComponent (id, withStyle, customClass) {
    const style = withStyle ? SVG_STYLE : '';

    const template = `
        <svg
            class="${customClass}"
            :style="${style}">
                <use xlink:href="#${id}"></use>
        </svg>
    `;

    const { render } = compiler.compile(template, {
        preserveWhitespace: false,
        modules: [ mergeProps(style) ]
    });

    const renderFunction = stripRenderFunction(render);

    return `{
        functional: true,
        render: ${renderFunction}
    }`;
}
