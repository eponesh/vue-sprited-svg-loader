import createSvgComponent from '../lib/createSvgComponent';
import Vue from 'vue/dist/vue.js';
import VueButton from '../examples/sources/components/VueButton';

const stubs = [
    {
        id: 'icon-menu',
        style: {
            width: '100%'
        },
        className: 'icon',
        slotName: 'iconSlot'
    }
];

describe('[vue-sprited-svg-loader]: createSvgComponent', () => {
    test('should return component', async () => {
        const { id, style, className } = stubs[0];
        expect(() => createSvgComponent(id, style, className)).not.toThrow();
    });

    test('Vue should mount component', async () => {
        const { id, style, className } = stubs[0];
        const component = createSvgComponent(id, style, className);

        const promise = new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon></icon>`,
            mounted () {
                resolve();
            }
        }).$mount());

        return expect(promise).resolves.not.toThrow();
    });

    test('Vue should has valid class, style, id', async () => {
        const { id, style, className } = stubs[0];
        const component = createSvgComponent(id, style, className);

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            const currentId = $el.querySelector('use')
                .getAttributeNS('http://www.w3.org/1999/xlink', 'href');

            expect(currentId).toBe(id);
            expect($el.getAttribute('class')).toBe(className);
            expect($el.style._values).toEqual(style);
        });
    });

    test('should has combined class as object', async () => {
        const { id, style, className } = stubs[0];
        const component = createSvgComponent(id, style, className);
        const extendClass = 'icon_combined icon_small';
        const extendClassObject = {
            icon_combined: true,
            icon_small: true
        };

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon :class='${JSON.stringify(extendClassObject)}'></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            expect($el.getAttribute('class')).toBe(`${className} ${extendClass}`);
        });
    });

    test('should has combined class as text', async () => {
        const { id, style, className } = stubs[0];
        const component = createSvgComponent(id, style, className);
        const extendClass = 'icon_combined icon_small';

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon class="${extendClass}"></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            expect($el.getAttribute('class')).toBe(`${className} ${extendClass}`);
        });
    });

    test('should has combined style as object', async () => {
        const { id, style, className } = stubs[0];
        const component = createSvgComponent(id, style, className);
        const extendStyle = {
            height: '100%',
            fill: 'currentColor'
        };

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon :style='${JSON.stringify(extendStyle)}'></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            expect($el.style._values).toEqual({
                ...style,
                ...extendStyle
            });
        });
    });

    test('should has combined style as text', async () => {
        const { id, style, className } = stubs[0];
        const component = createSvgComponent(id, style, className);
        const extendStyle = {
            height: '100%',
            fill: 'currentColor'
        };
        const extendStyleAsString = 'height: 100%; fill: currentColor';

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon style="${extendStyleAsString}"></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            expect($el.style._values).toEqual({
                ...style,
                ...extendStyle
            });
        });
    });

    test('should has default slot name "icon" and substitute into button', async () => {
        const { id, style, className } = stubs[0];
        const component = createSvgComponent(id, style, className, 'icon');

        return new Promise (resolve => new Vue({
            components: {
                VueButton,
                icon: component
            },
            template: `<div><VueButton @slots="loadSlots"><icon></icon></VueButton></div>`,
            methods: {
                loadSlots (slots) {
                    resolve(slots);
                }
            }
        }).$mount()).then((slots) => {
            expect(!!slots.icon).toBe(true);
        });
    });

    test('should has default slot name "icon"', async () => {
        const { id, style, className, slotName } = stubs[0];
        const component = createSvgComponent(id, style, className, slotName);

        return new Promise (resolve => new Vue({
            components: {
                VueButton,
                icon: component
            },
            template: `<icon></icon>`,
            mounted () {
                resolve(this._vnode.data.slot);
            }
        }).$mount()).then((slot) => {
            expect(slot).toBe(slotName);
        });
    });
});
