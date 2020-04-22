/**
 * Applies width and height styles to component
 * @param { object } data - vue context
 * @returns {{ width?: string, height?: string }} - vue component
 */
export default function applyStyles (data) {
    var styles = [];

    if (data.attrs) {
        var width = data.attrs.width || data.attrs.size;
        var height = data.attrs.height || data.attrs.size;

        var sizes = {};
        if (width) {
            sizes.width = width + 'px';
        }
        if (height) {
            sizes.height = height + 'px';
        }

        styles.push(sizes);
    }

    styles.push(data.style);
    styles.push(data.staticStyle);
    return styles;
}
