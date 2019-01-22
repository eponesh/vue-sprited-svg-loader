const loaderUtils = require('loader-utils');

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
    if (this.cacheable) {
        this.cacheable(true);
    }

    const id = loaderUtils.interpolateName(this, '[name]', {});
    const {
        withStyle = false,
        customClass = ''
    } = loaderUtils.getOptions(this) || {};

    const style = JSON.stringify(withStyle ? SVG_STYLE : {});

    const resolvedPath = require.resolve('./lib/createSvgComponent');
    const importPath = loaderUtils.stringifyRequest(this, resolvedPath);

    const completedModule = (`
        import createSvgComponent from ${importPath};
        var component = createSvgComponent("#${id}", ${style}, "${customClass}");
        export default component;
    `).replace(/\s{2,}/g, '\n');

    const modifiedSource = `${source.replace(/export.*/, '')}${completedModule}`;

    return modifiedSource;
}
