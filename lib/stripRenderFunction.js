const stripWith = require('vue-template-es2015-compiler');

/**
 * Converts render function to ES6+ syntax
 * @prop { string } render - compiled render function
 * @returns { string } - render function as string
 */
module.exports = function stripRenderFunction (render) {
    const renderFunction = `function render(_, _vm) { ${render} }`;

    return stripWith(renderFunction, {
        transforms: {
            stripWithFunctional: true,
        }
    });
}
