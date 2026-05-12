import { createApp, ref } from './vue.esm-browser.js';
import { exosTypes, exosLevels, exosCollection } from './dataset.js';
import { ExoCard } from './components.js';

createApp(
{
    components: { ExoCard },
    data() {
        return {
            types: exosTypes,
            levels: exosLevels,
            exosSrc: exosCollection,
            exos: exosCollection,
            current: null,
            // Timer
            elapsed: 0,      // temps écoulé en secondes
            timerId: null    // id du setInterval

        }
    },
    mounted() {

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
            this.exos = this.exosSrc.filter(exo => exo.categorie === c);
        },
        exoSelect(exo) {
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