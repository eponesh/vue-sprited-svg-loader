const loaderUtils = require('loader-utils');
const getComponent = require('./lib/getComponent');

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

    return `${source.replace(/export.*/, '')}
        var component = ${getComponent(id, withStyle, customClass)};
        export default component;
    `;
}
