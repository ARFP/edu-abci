import { createApp } from '../assets/vue.esm-browser.js';

var initialQueue = [
    { name: 'Bouteille plastique', type: 'jaune', icon: 'local_drink' },
    { name: 'Journal', type: 'jaune', icon: 'newspaper' },
    { name: 'Reste de repas', type: 'gris', icon: 'restaurant' },
    { name: 'Carton de pizza', type: 'jaune', icon: 'inventory_2' }
];

initialQueue.sort(() => Math.random() - 0.5);

var initialPossibleItems = [
    { name: 'Canette soda', type: 'jaune', icon: 'view_in_ar' },
    { name: 'Boite conserve', type: 'jaune', icon: 'kitchen' },
    { name: 'Épluchures', type: 'gris', icon: 'eco' },
    { name: 'Yaourt vide', type: 'gris', icon: 'nest_eco_leaf' },
    { name: 'Magazine', type: 'jaune', icon: 'menu_book' },
    { name: 'Vieux pain', type: 'gris', icon: 'bakery_dining' },
    { name: 'Brique de lait', type: 'jaune', icon: 'egg_alt' },
    { name: 'Enveloppe', type: 'jaune', icon: 'mail' },
    { name: 'Boîte d\'œufs', type: 'jaune', icon: 'egg' },
    { name: 'Masque jetable', type: 'gris', icon: 'masks' },
    { name: 'Sachet de thé', type: 'gris', icon: 'emoji_food_beverage' },
    { name: 'Poussière', type: 'gris', icon: 'cleaning_services' },
    { name: 'Flacon shampoing', type: 'jaune', icon: 'soap' },
    { name: 'Couvercle métal', type: 'jaune', icon: 'settings' }
];

createApp({
    data() {
        return {
            score: 0,
            errors: 0,
            history: [],
            // La file d'attente visible et à venir
            queue: initialQueue,
            // Bibliothèque pour générer de nouveaux déchets aléatoirement
            possibleItems: initialPossibleItems
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
            if (this.history.length > 7) {
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
            initialQueue.sort(() => Math.random() - 0.5);
            this.queue = initialQueue;
        },
        quit() {
            if (confirm("Voulez-vous vraiment quitter l'entraînement ?")) {
                // Simulation de sortie
                alert("Fin de session ! Score final : " + this.score);
            }
        }
    }
}).mount('#app');