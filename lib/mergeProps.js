/**
 * Merge classes and styles
 * @prop { string } style - default style if enabled
 * @returns {{ transformNode: Function }} - creates transform function
 */
module.exports = function mergeProps (style) {
    return {
        transformNode: (el) => {
            if (el.tag !== 'svg') {
                return;
            }
    
            el.classBinding = `[data.class, data.staticClass]`;
            el.styleBinding = `[data.style, data.staticStyle, ${style}]`;
        }
    };
}
