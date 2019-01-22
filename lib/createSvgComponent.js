/**
 * Creates Vue svg component by id
 * @param { string } id - filename
 * @param { string } customStyle - helpful styles if enabled
 * @param { string } className - custom class
 * @returns {{ functional: true, render: Function }} - vue component
 */
export default function createSvgComponent (id, customStyle, className) {
    return {
        functional: true,
        render: function (create, context) {
            return create(
                'svg',
                {
                    staticClass: className,
                    class: [context.data.class, context.data.staticClass],
                    style: [context.data.style, context.data.staticStyle, customStyle]
                },
                [create('use', { attrs: { 'xlink:href': id } })]
            );
        }
    };
}
