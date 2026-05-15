import { createApp, ref } from '../../assets/vue.esm-browser.js';
import { exosTypes, exosLevels, exosCollection } from './dataset.js';
import { ExoCard, ExoGame } from './components.js';

createApp(
{
    components: { ExoCard, ExoGame },
    data() {
        return {
            types: exosTypes,
            levels: exosLevels,
            exos: exosCollection,
            currentType: null,
            current: null,
            // Timer
            elapsed: 0,      // temps écoulé en secondes
            timerId: null    // id du setInterval

        }
    },
    mounted() {
        this.currentType = this.types[0];
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.elapsed / 60);
            const seconds = this.elapsed % 60;
            return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        }

    },
    methods: {
        filterCategories(e) {
            if(this.current !== null) return;
            let c = e.target.dataset.cat;
            this.currentType = c;
            this.exos = exosCollection.filter(exo => exo.categorie === c);
        },
        async exoLoad(exo) {
            const r = await fetch('./data/' + exo.slug + '.json');
            const data = await r.json();
            exo.data = data;
        },
        async exoSelect(exo) {
            await this.exoLoad(exo);
            this.current = exo;
            this.startTimer();
        },
        startTimer() {
            this.stopTimer(); 
            this.elapsed = 0;
            this.timerId = setInterval(() => {
            this.elapsed++;
            }, 1000);
        },
        stopTimer() {
            if (this.timerId !== null) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
        }

    }
}
).mount('#app')