import { createApp } from '../assets/vue.esm-browser.js';

createApp({
    data() {
        return {
            score: 0,
            errors: 0,
            history: [],
            // La file d'attente visible et à venir
            queue: [
                { name: 'Bouteille plastique', type: 'jaune', icon: 'local_drink' },
                { name: 'Journal', type: 'jaune', icon: 'newspaper' },
                { name: 'Reste de repas', type: 'gris', icon: 'restaurant' },
                { name: 'Carton de pizza', type: 'jaune', icon: 'inventory_2' }
            ],
            // Bibliothèque pour générer de nouveaux déchets aléatoirement
            possibleItems: [
                { name: 'Canette soda', type: 'jaune', icon: 'view_in_ar' },
                { name: 'Boite conserve', type: 'jaune', icon: 'kitchen' },
                { name: 'Épluchures', type: 'gris', icon: 'eco' },
                { name: 'Yaourt vide', type: 'gris', icon: 'nest_eco_leaf' },
                { name: 'Magazine', type: 'jaune', icon: 'menu_book' },
                { name: 'Vieux pain', type: 'gris', icon: 'bakery_dining' },
                { name: 'Brique de lait', type: 'jaune', icon: 'egg_alt' }
            ]
        }
    },
    computed: {
        // Le déchet "Actif" est toujours le premier de la file
        activeItem() {
            return this.queue.length > 0 ? this.queue[0] : null;
        }
    },
    methods: {
        /**
         * Tente de trier le déchet actif dans le bac choisi
         * @param {string} binType 'jaune' ou 'gris'
         */
        sort(binType) {
            if (!this.activeItem) return;

            const isCorrect = this.activeItem.type === binType;

            // Vérification de la réponse
            if (isCorrect) {
                this.score++;
            } else {
                this.errors++;
            }

            // Mise à jour de l'historique (on ajoute au début)
            this.history.unshift({
                name: this.activeItem.name,
                isCorrect: isCorrect
            });

            // On ne garde que les 5 derniers tris
            if (this.history.length > 5) {
                this.history.pop();
            }

            // On retire le déchet traité
            this.queue.shift();
            
            // On remplit la file pour qu'il y en ait toujours 4
            this.refillQueue();
        },
        refillQueue() {
            while (this.queue.length < 4) {
                const randomIndex = Math.floor(Math.random() * this.possibleItems.length);
                const newItem = { ...this.possibleItems[randomIndex] };
                this.queue.push(newItem);
            }
        },
        restart() {
            this.score = 0;
            this.errors = 0;
            this.history = [];
            this.queue = [
                { name: 'Bouteille plastique', type: 'jaune', icon: 'local_drink' },
                { name: 'Journal', type: 'jaune', icon: 'newspaper' },
                { name: 'Reste de repas', type: 'gris', icon: 'restaurant' },
                { name: 'Carton de pizza', type: 'jaune', icon: 'inventory_2' }
            ];
        },
        quit() {
            if (confirm("Voulez-vous vraiment quitter l'entraînement ?")) {
                // Simulation de sortie
                alert("Fin de session ! Score final : " + this.score);
            }
        }
    }
}).mount('#app');