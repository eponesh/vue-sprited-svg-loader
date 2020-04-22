import IconFirst from '../icons/icon-1.svg';
import IconSecond from '../icons/icon-2.svg';
import IconThird from '../icons/icon-3.svg';
import VueButton from './VueButton';

const components = {
    IconFirst,
    IconSecond,
    IconThird,
    VueButton
};

export default {
    data () {
        return {
            color: '#16A085'
        }
    },
    methods: {
        getRandomColor () {
            const red = Math.random() * 256 | 0;
            const green = Math.random() * 256 | 0;
            const blue = Math.random() * 256 | 0;
            this.color = `rgb(${red}, ${green}, ${blue})`;
        }
    },
    components,
    template: `
        <div class="app">
            <div class="app__buttons">
                <VueButton>
                    <span>Button</span>

                    <Icon-Second :class="{ button__icon: true }">
                    </Icon-Second>
                </VueButton>

                <Icon-First
                    class="iconSvg iconSvg_first"
                    style="color: #ccc;">
                </Icon-First>

                <VueButton @click="getRandomColor">
                    <Icon-Third
                        class="button__icon"
                        :style="{ color, width: '64px', height: '64px' }">
                    </Icon-Third>

                    <template name="icon">Press me</template>
                </VueButton>
            </div>
            <span class="description">Using sizes</span>
            <div class="app__sizes">
                <div class="size">
                    <span class="description">width = 48</span>
                    <Icon-Second width="48"></Icon-Second>
                </div>

                <div class="size">
                    <span class="description">height = 64</span>
                    <Icon-Third height="64"></Icon-Third>
                </div>

                <div class="size">
                    <span class="description">size = 32</span>
                    <Icon-First size="32"></Icon-First>
                </div>
            </div>
        </div>
    `,
}
