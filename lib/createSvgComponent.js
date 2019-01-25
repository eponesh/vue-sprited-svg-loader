/**
 * Creates Vue svg component by id
 * @param { string } id - filename
 * @param { string } customStyle - helpful styles if enabled
 * @param { string } className - custom class
 * @param { string } slotName - custom slot name
 * @returns {{ functional: true, render: Function }} - vue component
 */
export default function createSvgComponent (id, customStyle, className, slotName) {
    return {
        functional: true,
        render: function (create, context) {
            return create(
                'svg',
                {
                    slot: slotName,
                    staticClass: className,
                    class: [context.data.class, context.data.staticClass],
                    style: [context.data.style, context.data.staticStyle, customStyle]
                },
                [create('use', { attrs: { 'xlink:href': id } })]
            );
        }
    };
}
