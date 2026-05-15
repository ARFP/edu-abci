import { exosLevels } from './dataset.js';

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
        const label = exosLevels[level - 1];
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
        exo: Object,
        choixUtilisateur: Object
    },
    // Props : correction (Array), choixUtilisateur (Object)
    data() {
        return {
            etapeAideActuelle: 0,
            indicesAidesAffiches: []
        }
    },
    methods: {
        fournirAide() {
            if (this.etapeAideActuelle < this.exo.correction.length) {
              const etape = this.exo.correction[this.etapeAideActuelle];
              this.indicesAidesAffiches.push(etape);

              // On émet l'étape actuelle pour que le parent sache quelle "vérité" révéler
              this.$emit('debloquer-case', this.etapeAideActuelle);

              this.etapeAideActuelle++;
          }
        },
        appliquerAideTechnique(indexEtape) {
            // Logique pour extraire une paire et l'injecter dans choixUtilisateur
            // Par exemple, si l'étape parle de "Cisco" et "Pos 1" :
           // this.$emit('force-choice', { key: 'Cisco-Pos 1', value: 'O' });
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
            // On initialise un objet vide qui contiendra les états de la grille
            choixUtilisateur: {},
            dejaValide: false,
            score: 0,
            modeAffichage: 'grids' // 'grids' ou 'linear'
        };
    },
    // On utilise watch pour réinitialiser la grille si on change d'exercice
    watch: {
        exo: {
            immediate: true,
            handler(nouvelExo) {
                this.initialiserGrille(nouvelExo);
            }
        }
    },
    computed: {
        // Génère les paires de catégories à croiser (0-1, 0-2, 1-2, etc.)
        pairesDeGrilles() {
            const paires = [];
            const cats = this.exo.categories;
            for (let i = 0; i < cats.length; i++) {
                for (let j = i + 1; j < cats.length; j++) {
                    paires.push({
                        indexLigne: i,
                        indexCol: j,
                        nomLigne: cats[i].nom,
                        nomCol: cats[j].nom,
                        itemsLigne: cats[i].items,
                        itemsCol: cats[j].items
                    });
                }
            }
            return paires;
        },
        // On exclut la première catégorie (Positions) pour ne pas l'avoir en doublon dans les lignes
        categoriesSansPositions() {
            if (!this.exo || !this.exo.categories) return [];
            return this.exo.categories.slice(1);
        },
        
        // Pour mapper les sélections des <select> avec ton objet choixUtilisateur
        selectionLineaire() {
            const mapping = {};
            if (!this.exo) return mapping;

            const positions = this.exo.categories[0].items;
            const autresCats = this.categoriesSansPositions;

            positions.forEach(pos => {
                autresCats.forEach(cat => {
                    // On cherche si une valeur "O" existe déjà pour cette paire
                    const itemTrouve = cat.items.find(item => 
                        this.choixUtilisateur[`${pos}-${item}`] === 'O' || 
                        this.choixUtilisateur[`${item}-${pos}`] === 'O'
                    );
                    mapping[`${pos}-${cat.nom}`] = itemTrouve || "";
                });
            });
            return mapping;
        }
    },
    methods: {
        initialiserGrille(data) {
            // Reset des états
            this.choixUtilisateur = {};
            this.indicesBarres = [];
            this.dejaValide = false;

            // Sécurité : on vérifie que les catégories et items existent
            if (!data.categories || data.categories.length < 2) return;

            const lignes = data.categories[0].items;
            const colonnes = data.categories[1].items;

            lignes.forEach(row => {
                colonnes.forEach(col => {
                    // Création d'une clé unique pour chaque cellule de la grille
                    this.choixUtilisateur[`${row}-${col}`] = null;
                });
            });

            if (data.categories.length > 3) {
                    this.modeAffichage = 'linear';
                } else {
                    this.modeAffichage = 'grids';
                }
        },
        cycleCellState(row, col) {
            if (this.dejaValide) return; // Bloque la grille après validation

            const key = `${row}-${col}`;
            const current = this.choixUtilisateur[key];
            
            // Cycle d'états : Vide -> X (Faux) -> O (Vrai) -> Vide
            if (current === null) this.choixUtilisateur[key] = 'O';
            else if (current === 'O') this.choixUtilisateur[key] = 'X';
            else this.choixUtilisateur[key] = null;
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
            const val = this.choixUtilisateur[`${row}-${col}`];
            return val === null ? '' : val;
        },

        getCellClass(row, col) {
            const val = this.choixUtilisateur[`${row}-${col}`];
            return {
                'cell-interactive': true,
                'cell-ok': val === 'O',
                'cell-ko': val === 'X'
            };
        },
        updateFromLinear(pos, catNom, nouvelItem) {
            // 1. On trouve la catégorie concernée
            const categorie = this.exo.categories.find(c => c.nom === catNom);
            
            // 2. AVANT de mettre à jour, on nettoie les anciens "O" pour cette ligne/colonne
            // (Un serveur ne peut avoir qu'une seule marque, un seul OS, etc.)
            categorie.items.forEach(item => {
                delete this.choixUtilisateur[`${pos}-${item}`];
                delete this.choixUtilisateur[`${item}-${pos}`];
            });

            // 3. On ajoute le nouveau "O" si une valeur est sélectionnée
            if (nouvelItem) {
                this.choixUtilisateur[`${pos}-${nouvelItem}`] = 'O';
            }
            
            // 4. (Optionnel) On peut aussi déduire les "X" automatiquement ici 
            // mais rester sur les "O" suffit pour la validation.
        },
        validerExo() {
          let liaisonsCompletes = 0;
          const totalAttendu = this.exo.solution.length;

          this.exo.solution.forEach(sol => {
              const itemsAttendus = sol.liaison; // ex: ["Pos 1", "Cisco", "Bleue", "CentOS", "Nginx", "400W"]
              
              // On définit un pivot (la Position, qui est toujours itemsAttendus[0])
              const pivot = itemsAttendus[0];
              let correspondanceParfaite = true;

              // On vérifie si CHAQUE autre item de la solution est lié au pivot dans choixUtilisateur
              for (let i = 1; i < itemsAttendus.length; i++) {
                  const itemCible = itemsAttendus[i];
                  const key = `${pivot}-${itemCible}`;
                  const keyInverse = `${itemCible}-${pivot}`;

                  if (this.choixUtilisateur[key] !== 'O' && this.choixUtilisateur[keyInverse] !== 'O') {
                      correspondanceParfaite = false;
                      break;
                  }
              }

              if (correspondanceParfaite) liaisonsCompletes++;
          });

          this.score = liaisonsCompletes;
            this.dejaValide = this.score === totalAttendu; // Si tout est correct, on bloque la grille

            if (this.score === totalAttendu) {
                alert("Félicitations ! Tous les éléments sont correctement associés. 🎉");
            } else {
                alert(`Attention, il te manque des associations. Tu as ${this.score} association(s) complète(s) sur ${totalAttendu}.`);
            }
        },
        appliquerIndiceTechnique(indexEtape) {
            // Stratégie simple : on révèle un élément de la solution 
            // correspondant à l'index de l'aide demandée.
            const solutionGénérale = this.exo.solution[indexEtape]; 
            
            if (solutionGénérale) {
                const pivot = solutionGénérale.liaison[0]; // ex: "Pos 1"
                const itemARevéler = solutionGénérale.liaison[1]; // ex: "Cisco"

                // On injecte le "O" dans les choix de l'utilisateur
                this.choixUtilisateur = {
                    ...this.choixUtilisateur,
                    [`${pivot}-${itemARevéler}`]: 'O'
                };
            }
        }
    }
};



