import createSvgComponent from '../lib/createSvgComponent';
import Vue from 'vue/dist/vue.js';
import VueButton from '../examples/sources/components/VueButton';

const stubs = [
    {
        id: 'icon-menu',
        className: 'icon',
        slotName: 'iconSlot'
    }
];

describe('[vue-sprited-svg-loader]: createSvgComponent', () => {
    test('should return component', async () => {
        const { id, className } = stubs[0];
        expect(() => createSvgComponent(id, className)).not.toThrow();
    });

    test('Vue should mount component', async () => {
        const { id, className } = stubs[0];
        const component = createSvgComponent(id, className);

        const promise = new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon></icon>`,
            mounted () {
                resolve();
            }
        }).$mount());

        return expect(promise).resolves.not.toThrow();
    });

    test('Vue should has valid class, id', async () => {
        const { id, className } = stubs[0];
        const component = createSvgComponent(id, className);

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            const currentId = $el.querySelector('use')
                .getAttributeNS('http://www.w3.org/1999/xlink', 'href');

            expect(currentId).toBe(`#${id}`);
            expect($el.getAttribute('class')).toBe(className);
        });
    });

    test('should has combined class as object', async () => {
        const { id, className } = stubs[0];
        const component = createSvgComponent(id, className);
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
        const { id, className } = stubs[0];
        const component = createSvgComponent(id, className);
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

    test('should has default slot name "icon" and substitute into button', async () => {
        const { id, className } = stubs[0];
        const component = createSvgComponent(id, className, 'icon');

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
        const { id, className, slotName } = stubs[0];
        const component = createSvgComponent(id, className, slotName);

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

    test('should add width style', async () => {
        const { id, className } = stubs[0];
        const component = createSvgComponent(id, className);

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon width="128"></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            expect($el.getAttribute('style')).toBe('width: 128px;');
        });
    });


    test('should add height to style', async () => {
        const { id, className } = stubs[0];
        const component = createSvgComponent(id, className);

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon height="32"></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            expect($el.getAttribute('style')).toBe('height: 32px;');
        });
    });

    test('should add width and height to style using size', async () => {
        const { id, className } = stubs[0];
        const component = createSvgComponent(id, className);

        return new Promise (resolve => new Vue({
            components: { icon: component },
            template: `<icon size="24"></icon>`,
            mounted () {
                resolve(this.$el);
            }
        }).$mount()).then(($el) => {
            expect($el.getAttribute('style')).toBe('width: 24px; height: 24px;');
        });
    });
});
