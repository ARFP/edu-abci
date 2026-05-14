export /**
 * Classe Logigramme - Moteur de logique pour exercices de type Zebra Puzzle
 * Gère la validation des données, le stockage des choix et le calcul du score.
 */
class Logigramme {
    /**
     * @param {Object} data - Le JSON de l'exercice (V2)
     */
    constructor(data) {
        this.categories = data.categories || [];
        this.solution = data.solution || []; // Matrice d'index numériques
        this.indices = data.indices || [];
        this.correction = data.correction || [];
        
        /**
         * Stockage des choix de l'utilisateur
         * Clé : "ItemA-ItemB" (ex: "Cisco-Pos 1")
         * Valeur : 
         *   true  -> Affirmation (équivalent à 'O')
         *   false -> Élimination (équivalent à 'X')
         * (L'absence de clé ou null signifie "vide")
         */
        this.choix = new Map();

        // Matrice des choix de l'utilisateur, alignée avec la solution pour faciliter les comparaisons
        this.proposition = []; 
    }

    /**
     * Enregistre, modifie ou supprime une liaison
     * @param {string} key - Identifiant unique de la liaison (ex: "Dell-Rouge")
     * @param {boolean|null} etat - true (confirmé), false (éliminé), null (reset)
     */
    setLiaison(key, etat) {
        if (etat === null || etat === undefined) {
            this.choix.delete(key);
        } else {
            if (etat === true) {
                this.nettoyerConflits(key);
            }
            this.choix.set(key, etat);
        }
    }

    /**
     * Nettoie les vérités (true) contradictoires.
     */
    nettoyerConflits(nouvelleKey) {
        const [nomA, nomB] = nouvelleKey.split('-');
        const catIdxB = this.getCategorieDeItem(nomB);

        for (let [existKey, value] of this.choix) {
            if (value === true && existKey !== nouvelleKey) {
                const [exNomA, exNomB] = existKey.split('-');

                // 1. Un item (nomB) ne peut pas être à deux positions (nomA) différentes
                // ex: Dell ne peut pas être en Pos 1 ET en Pos 3
                if (nomB === exNomB && nomA !== exNomA) {
                    this.choix.delete(existKey);
                }

                // 2. Une position (nomA) ne peut pas avoir deux items de la MÊME catégorie (catIdxB)
                // ex: Pos 1 ne peut pas avoir Dell ET HP (catégorie "Marques")
                if (nomA === exNomA) {
                    const exCatIdxB = this.getCategorieDeItem(exNomB);
                    if (catIdxB === exCatIdxB && nomB !== exNomB) {
                        this.choix.delete(existKey);
                    }
                }
            }
        }
    }

    /**
     * Retrouve l'index de la catégorie d'un item donné (helper)
     */
    getCategorieDeItem(nomItem) {
        // On commence à 1 car l'index 0 est la catégorie "Position" (le pivot)
        for (let i = 1; i < this.categories.length; i++) {
            if (this.categories[i].items.includes(nomItem)) {
                return i;
            }
        }
        return 0; // C'est une position
    }

    /**
     * Récupère l'état d'une liaison pour l'affichage
     * @param {string} key 
     * @returns {boolean|null}
     */
    getLiaison(key) {
        return this.choix.has(key) ? this.choix.get(key) : null;
    }

    /**
     * Vérifie si un item spécifique est correct selon la solution
     * @param {number} rowIdx - Index du serveur (ligne de la solution)
     * @param {number} catIdx - Index de la catégorie
     * @param {number} itemIdx - Index de l'item choisi
     * @returns {boolean}
     */
    estCorrect(rowIdx, catIdx, itemIdx) {
        return this.solution[rowIdx][catIdx] === itemIdx;
    }

    /**
     * Calcule le score de l'exercice
     * Une ligne est valide si toutes les catégories sont liées au pivot (Position)
     * @returns {number} Nombre de lignes (serveurs) correctement identifiées
     */
    calculerScore() {
        let lignesValides = 0;
        const positions = this.categories[0].items;

        this.solution.forEach((ligne) => {
            const posNom = positions[ligne[0]];
            let ligneComplete = true;

            for (let catIdx = 1; catIdx < ligne.length; catIdx++) {
                const itemNom = this.categories[catIdx].items[ligne[catIdx]];
                const key = `${posNom}-${itemNom}`;
                
                // On vérifie le sens Pivot -> Item
                if (this.choix.get(key) !== true) {
                    ligneComplete = false;
                    break;
                }
            }
            if (ligneComplete) lignesValides++;
        });

        this.extraireScore();
        return lignesValides;
    }

    /**
     * Extrait l'état actuel des choix sous forme de matrice (similaire à la solution)
     * Utile pour la démonstration V2 et les futures statistiques.
     */
    extraireScore() {
        const nbLignes = this.solution.length;
        const nbColonnes = this.categories.length;
        
        // Utilisation de -1 pour un typage Integer cohérent (mieux pour les stats)
        this.matriceResultat = Array.from({ length: nbLignes }, () => 
            Array(nbColonnes).fill(-1)
        );

        this.categories[0].items.forEach((posNom, rowIdx) => {
            this.matriceResultat[rowIdx][0] = rowIdx;

            for (let catIdx = 1; catIdx < nbColonnes; catIdx++) {
                const itemsDeLaCategorie = this.categories[catIdx].items;
                
                itemsDeLaCategorie.forEach((itemNom, itemIdx) => {
                    if (this.choix.get(`${posNom}-${itemNom}`) === true) {
                        this.matriceResultat[rowIdx][catIdx] = itemIdx;
                    }
                });
            }
        });
    }

    /**
     * Retourne les données nécessaires pour une aide technique (basée sur la correction)
     * @param {number} etapeIdx 
     * @returns {Object|null}
     */
    getAideTechnique(etapeIdx) {
        const ligne = this.solution[etapeIdx];
        if (!ligne) return null;

        // On suggère par défaut de lier la Position (0) à la Marque (1)
        return {
            pivot: this.categories[0].items[ligne[0]],
            cible: this.categories[1].items[ligne[1]],
            valeur: true
        };
    }
}