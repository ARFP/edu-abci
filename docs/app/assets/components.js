import { exosLevels } from './dataset.js';
import { GameEngine } from './models.js';
import { LocalStorageProvider, ConfigurationManager } from './tools.js';

export const ExoCard = {
  template: "#exo-card",
  props: {
    exo: {
        type: Object,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      levels: exosLevels
    }
  },
  methods: {
    displayLevel(level) {
        const points = "●".repeat(level) + "○".repeat(5 - level);
        //const label = exosLevels[level - 1];
        return `${points}`;
    },
    exoSelect(e) {
        e.preventDefault();
        this.$emit('exo-select', this.exo);
    }
  }
}

export const ExoHelper = {
    template: "#exo-helper",
    props: {
        engine: Object
    },
    data() {
        return {
            indicesAidesAffiches: []
        }
    },
    methods: {
        fournirAide() {
            const etape = this.engine.revelerProchaineEtape();
            if (etape) {
                this.indicesAidesAffiches.push(etape);
            }
        },
        utiliserJoker() {
            this.$emit('use-joker');
        }
    }
};

export const ExoGame = {
    components: { ExoHelper },
    template: "#exo-game",
    props: {
        exo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            indicesBarres: [],
            engine: null,
            stats: null,
            score: 0,
            modeAffichage: 'grids' // 'grids' ou 'linear'
        };
    },
    // On utilise watch pour réinitialiser la grille si on change d'exercice
    watch: {
        exo: {
            immediate: true,
            handler(nouvelExo) {
                this.setupGame(nouvelExo.data); // Passer l'objet de données interne à setupGame
            }
        }
    },
    computed: {
        // Génère les paires de catégories à croiser (0-1, 0-2, 1-2, etc.)
        pairesDeGrilles() {
            const paires = [];
            const cats = this.exo.data.categories; 
            for (let i = 0; i < cats.length; i++) {
                for (let j = i + 1; j < cats.length; j++) {
                    paires.push({
                        indexLigne: i,
                        indexCol: j,
                        nomLigne: cats[i].nom, // Accéder via .data
                        nomCol: cats[j].nom, // Accéder via .data
                        itemsLigne: cats[i].items, // Accéder via .data
                        itemsCol: cats[j].items // Accéder via .data
                    });
                }
            }
            return paires;
        },
        // On exclut la première catégorie (Positions) pour ne pas l'avoir en doublon dans les lignes
        categoriesSansPositions() {
            if (!this.exo || !this.exo.data || !this.exo.data.categories) return []; // Accéder via .data
            return this.exo.data.categories.slice(1); // Accéder via .data
        },
        
        // Pour mapper les sélections des <select> avec ton objet choixUtilisateur
        selectionLineaire() {
            const mapping = {};
            if (!this.engine || !this.exo.data) return mapping; // Vérifier aussi exo.data

            const positions = this.exo.data.categories[0].items;
            const autresCats = this.categoriesSansPositions;

            positions.forEach(pos => {
                autresCats.forEach(cat => {
                    const itemTrouve = cat.items.find(item => 
                        this.engine.logigramme.getLiaison(`${pos}-${item}`) === true
                    );
                    mapping[`${pos}-${cat.nom}`] = itemTrouve || "";
                });
            });
            return mapping;
        },
        isFinished() {
            return this.engine && this.engine.status === 'finished';
        }
    },
    methods: {
        setupGame(data) {
            try {
                ConfigurationManager.validate(data);
            } catch (e) {
                console.error("Erreur de configuration JSON :", e.message);
                return;
            }

            this.indicesBarres = [];
            this.stats = null;
            
            const storage = new LocalStorageProvider(`save_${this.exo.slug}`);
            this.engine = new GameEngine(data, storage);

            // Vérifier s'il existe une sauvegarde pour cet exercice
            const savedState = localStorage.getItem(storage.STORAGE_KEY);
            if (savedState) {
                const userWantsToLoad = confirm("Une partie en cours a été trouvée. Souhaitez-vous la reprendre ?\n(Annuler pour recommencer à zéro)");
                if (userWantsToLoad) {
                    this.engine.storage.load(this.engine);
                } else {
                    this.engine.storage.clear();
                }
            }
            
            // Dans tous les cas, on active le moteur (reprise ou nouveau)
            this.engine.start();
            // 'data.categories.length' est correct car 'data' est l'objet de données interne
            if (data.categories.length > 3) { 
                    this.modeAffichage = 'linear';
                } else {
                    this.modeAffichage = 'grids';
                }
            
            this.exo.data.engine = this.engine; // Attacher l'instance de l'engine à l'objet de données de l'exercice
        },
        cycleCellState(row, col) {
            if (this.isFinished) return;
            const key = `${row}-${col}`;
            const current = this.engine.logigramme.getLiaison(key);
            
            let next = null;
            if (current === null) next = false;
            else if (current === false) next = true;

            this.engine.notifierAction(key, next);
        },
        toggleIndice(idx) {
            const position = this.indicesBarres.indexOf(idx);
            if (position > -1) {
                this.indicesBarres.splice(position, 1);
            } else {
                this.indicesBarres.push(idx);
            }
        },
        getCellSymbol(row, col) {
            const val = this.engine.logigramme.getLiaison(`${row}-${col}`);
            if (val === true) return 'O';
            if (val === false) return 'X';
            return '';
        },

        getCellClass(row, col) {
            const val = this.engine.logigramme.getLiaison(`${row}-${col}`);
            return {
                'cell-interactive': true,
                'cell-ok': val === true,
                'cell-ko': val === false
            };
        },
        updateFromLinear(pos, catNom, nouvelItem) {
            if (this.isFinished) return;
            this.engine.notifierAction(`${pos}-${nouvelItem}`, true);
        },
        undo() {
            this.engine.undo();
        },
        useJoker() {
            this.engine.ajouterJoker();
        },

        validerExo() {
            const rapport = this.engine.verifierProgression();
            // 'this.exo.data.solution.length' est déjà géré par 'this.engine.logigramme.solution.length'
            // Cas 1 : La grille est vide
            if (rapport.nbChoixO === 0) {
                alert("Votre grille est vide ! Analysez les indices pour placer vos premières marques 'O'.");
            } 
            // Cas 2 : Il y a des erreurs (des 'O' là où il ne faut pas)
            else if (rapport.nbErreurs > 0) {
                alert(`Vous avez ${rapport.nbErreurs} erreur(s) dans votre grille.`);
            } 
            // Cas 3 : C'est juste mais incomplet
            else if (rapport.score < rapport.total) {
                alert(`C'est un bon début ! Vous avez ${rapport.score} ligne(s) correcte(s) sur ${rapport.total}. Continuez !`);
            } else {
                // Cas 4 : Tout est parfait
                this.stats = this.engine.stop();
                alert("Félicitations ! Exercice terminé avec succès.");
            }
        }
    }
};
