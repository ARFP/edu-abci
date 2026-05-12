import { createApp, ref } from './vue.esm-browser.js';
import { exosLevels, exosCollection } from './dataset.js';

createApp(
{
    data() {
        return {
            exos: exosCollection,
            levels: exosLevels
        }
    },
    mounted() {

    },
    methods: {
        displayLevel(level) {
            
            const points =
                "●".repeat(level) +
                "○".repeat(5 - level);

            const label = exosLevels[level - 1];

            return `${points}`;

        }
    }
}
).mount('#app')