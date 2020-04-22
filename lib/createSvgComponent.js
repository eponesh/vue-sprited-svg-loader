import applyStyles from "./applyStyles";

/**
 * Creates Vue svg component by id
 * @param { string } id - svg symbol id without #
 * @param { string } className - custom class
 * @param { string } slotName - custom slot name
 * @returns {{ functional: true, render: Function }} - vue component
 */
export default function createSvgComponent (id, className, slotName) {
    return {
        functional: true,
        render: function (create, context) {
            var data = context.data;
            var style = applyStyles(data);

            return create(
                'svg',
                {
                    slot: slotName,
                    staticClass: className,
                    class: [data.class, data.staticClass],
                    style: style
                },
                [create('use', { attrs: { 'xlink:href': '#' + id } })]
            );
        }
    };
}
