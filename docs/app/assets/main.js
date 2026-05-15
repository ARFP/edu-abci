import { createApp, ref } from './vue.esm-browser.js';
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
        }
    },
    mounted() {
        this.currentType = this.types[0];
    },
    computed: {
        // Le temps est maintenant géré par le GameEngine de l'exercice courant
        formattedTime() {
            return this.current && this.current.data && this.current.data.engine
                ? this.current.data.engine.formattedTime
                : '00:00';
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
        }
    }
}
).mount('#app')