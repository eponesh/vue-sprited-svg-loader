const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const schema = require('./schema.json');

/**
 * Takes svg converted source from "svg-sprite-loader"
 * and converts to vue component with svg from sprite
 * @param { string } source - converted svg file
 * @returns { string } - vue functional component
 */
module.exports = function (source) {
    const options = { ...loaderUtils.getOptions(this) };
    validateOptions(schema, options, 'Vue sprited svg loader');

    const {
        customClass = '',
        slotName = 'icon',
    } = options;

    const resolvedPath = require.resolve('./lib/createSvgComponent');
    const importPath = loaderUtils.stringifyRequest(this, resolvedPath);

    const completedModule = (`
        import createSvgComponent from ${importPath};
        var component = createSvgComponent(symbol.id, "${customClass}", "${slotName}");
        export default component;
    `).replace(/\s{2,}/g, '\n');

    const modifiedSource = `${source.replace(/export.*/, '')}${completedModule}`;

    return modifiedSource;
}
