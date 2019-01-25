export default {
    template: `
        <button
            class="button"
            @click="$emit('click')">
                <slot name="icon"></slot>
                <slot></slot>
        </button>
    `,
    mounted () {
        this.$emit('slots', this.$slots);
    }
}
