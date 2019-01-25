const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const schema = require('./schema.json');

/**
 * Helpful styles to provide coloring and fit svg
 */
const SVG_STYLE = {
    width: '100%',
    height: '100%',
    fill: 'currentColor'
};

/**
 * Takes svg converted source from "svg-sprite-loader"
 * and converts to vue component with svg from sprite
 * @prop { string } source - converted svg file
 * @returns { string } - vue functional component
 */
module.exports = function (source) {
    const options = { ...loaderUtils.getOptions(this) };
    validateOptions(schema, options, 'Vue sprited svg loader');

    const {
        withStyle = false,
        customClass = '',
        slotName = 'icon',
    } = options;

    const id = loaderUtils.interpolateName(this, '[name]', {});
    const style = JSON.stringify(withStyle ? SVG_STYLE : {});

    const resolvedPath = require.resolve('./lib/createSvgComponent');
    const importPath = loaderUtils.stringifyRequest(this, resolvedPath);

    const completedModule = (`
        import createSvgComponent from ${importPath};
        var component = createSvgComponent("#${id}", ${style}, "${customClass}", "${slotName}");
        export default component;
    `).replace(/\s{2,}/g, '\n');

    const modifiedSource = `${source.replace(/export.*/, '')}${completedModule}`;

    return modifiedSource;
}
