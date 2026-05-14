import { HistoryManager, GameValidator } from "./tools";
/**
 * Classe Logigramme V2
 * Gère la logique bidirectionnelle entre Grille et Vue Linéaire.
 */
export class Logigramme {
    constructor(data) {
        this.categories = data.categories || [];
        this.solution = data.solution || [];
        this.indices = data.indices || []; 
        this.correction = data.correction || []; // Les étapes textuelles
        
        this.choix = new Map();
        this.matriceResultat = [];
        this.etapesAffichees = new Set(); // Pour les stats : quelles étapes ont été lues.
    }

    /**
     * Point d'entrée unique pour modifier une liaison
     */
    setLiaison(key, etat) {
        if (etat === null || etat === undefined) {
            this.choix.delete(key);
        } else {
            // on nettoie les doublons logiques avant d'affirmer un 'true'
            if (etat === true) {
                this.nettoyerConflits(key);
            }
            this.choix.set(key, etat);
        }
    }

    getLiaison(key) {
        return this.choix.has(key) ? this.choix.get(key) : null;
    }

    /**
     * Garantit l'exclusivité : un item par position, une position par item de catégorie.
     */
    nettoyerConflits(nouvelleKey) {
        const [nomA, nomB] = nouvelleKey.split('-');
        const catIdxB = this.getCategorieDeItem(nomB);

        for (let [existKey, value] of this.choix) {
            if (value === true && existKey !== nouvelleKey) {
                const [exNomA, exNomB] = existKey.split('-');

                // Conflit 1 : L'item est déjà ailleurs
                if (nomB === exNomB && nomA !== exNomA) {
                    this.choix.delete(existKey);
                }

                // Conflit 2 : La position a déjà un autre item de cette catégorie
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
     * Extrait le rack final pour la vue linéaire et les stats
     */
    extraireMatriceResultat() {
        const nbLignes = this.solution.length;
        const nbColonnes = this.categories.length;
        
        this.matriceResultat = Array.from({ length: nbLignes }, () => 
            Array(nbColonnes).fill(-1)
        );

        this.categories[0].items.forEach((posNom, rowIdx) => {
            this.matriceResultat[rowIdx][0] = rowIdx;

            for (let catIdx = 1; catIdx < nbColonnes; catIdx++) {
                this.categories[catIdx].items.forEach((itemNom, itemIdx) => {
                    if (this.choix.get(`${posNom}-${itemNom}`) === true) {
                        this.matriceResultat[rowIdx][catIdx] = itemIdx;
                    }
                });
            }
        });
    }

    /**
     * Calcule le score final basé sur la solution technique
     */
    calculerScore() {
        let lignesValides = 0;
        const positions = this.categories[0].items;

        this.solution.forEach((ligne) => {
            const posNom = positions[ligne[0]];
            let ligneComplete = true;

            for (let catIdx = 1; catIdx < ligne.length; catIdx++) {
                const itemNom = this.categories[catIdx].items[ligne[catIdx]];
                if (this.choix.get(`${posNom}-${itemNom}`) !== true) {
                    ligneComplete = false;
                    break;
                }
            }
            if (ligneComplete) lignesValides++;
        });

        this.extraireMatriceResultat();
        return lignesValides;
    }

    getCategorieDeItem(nomItem) {
        for (let i = 1; i < this.categories.length; i++) {
            if (this.categories[i].items.includes(nomItem)) return i;
        }
        return 0;
    }

    /**
     * Récupère le contenu d'une étape sans modifier les choix de l'utilisateur
     */
    getContenuCorrection(index) {
        if (this.correction[index]) {
            this.etapesAffichees.add(index);
            return this.correction[index];
        }
        return null;
    }

    /**
     * Trouve une liaison correcte qui n'a pas encore été découverte par l'apprenant.
     * @returns {string|null} La clé de la liaison (ex: "Pos 1-Dell") ou null si tout est trouvé.
     */
    rechercherLiaisonAleatoire() {
        const liaisonsPossibles = [];

        // On parcourt la solution pour lister toutes les liaisons 'true'
        this.solution.forEach(ligne => {
            const pivotNom = this.categories[0].items[ligne[0]]; // Ex: "Pos 1"
            
            for (let i = 1; i < ligne.length; i++) {
                const itemNom = this.categories[i].items[ligne[i]]; // Ex: "Dell"
                const key = `${pivotNom}-${itemNom}`;

                // On ne garde que celles que l'apprenant n'a pas encore cochées en 'true'
                if (this.choix.get(key) !== true) {
                    liaisonsPossibles.push(key);
                }
            }
        });

        if (liaisonsPossibles.length === 0) return null;

        // Sélection aléatoire
        const randomIndex = Math.floor(Math.random() * liaisonsPossibles.length);
        return liaisonsPossibles[randomIndex];
    }
}


/**
 * GameEngine - Responsable du cycle de vie d'une partie.
 * Gère le temps, le comptage des actions et l'accès à l'aide technique.
 */
export class GameEngine {
    /**
     * @param {Object} exerciceData 
     * @param {PersistenceProvider} storageProvider - Le moteur de sauvegarde choisi
     */
    constructor(exerciceData, storageProvider) {
        this.logigramme = new Logigramme(exerciceData);
        this.storage = storageProvider; // On injecte la dépendance
        
        this.status = 'idle';
        this.elapsedTime = 0;
        this.nbActions = 0;
        this.currentStepIndex = 0;

       
        this.history = new HistoryManager();
        // On enregistre l'état vide initial
        this.history.push(this.logigramme.choix);
    }

    /**
     * Démarre la partie et lance le chronomètre.
     */
    start() {
        if (this.status === 'playing') return;

        this.status = 'playing';
        this.startTime = Date.now();
        this.nbActions = 0;
        this.currentStepIndex = 0;

        // Mise à jour du timer chaque seconde
        this.timerInterval = setInterval(() => {
            if (this.status === 'playing') {
                this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            }
        }, 1000);
    }

    /**
     * Enregistre une interaction utilisateur (clic grille ou changement select).
     * À appeler depuis la vue à chaque modification de liaison.
     */
    notifierAction(key, etat) {
        if (this.status !== 'playing') return;

        // On délègue la modification logique au moteur Logigramme
        this.logigramme.setLiaison(key, etat);
        
        // On incrémente le compteur d'actions pour les stats
        this.nbActions++;

        // On demande au provider de sauvegarder, peu importe comment il le fait
        this.history.push(this.logigramme.choix);
        if (this.storage) this.storage.save(this);
    }

    /**
     * Méthodes de pont pour l'UI Vue.js
     */
    undo() {
        const prevState = this.history.undo();
        if (prevState) {
            this.logigramme.choix = new Map(prevState);
            this.logigramme.extraireMatriceResultat();
            if (this.storage) this.storage.save(this);
        }
    }

    /**
     * Récupère l'étape de correction suivante.
     * Cette méthode ne modifie pas les choix de l'élève (pas d'auto-correction).
     * @returns {Object|null} L'objet correction {etape, titre, explication}
     */
    revelerProchaineEtape() {
        if (this.status !== 'playing') return null;

        const etape = this.logigramme.getContenuCorrection(this.currentStepIndex);
        if (etape) {
            this.currentStepIndex++;
            // Consulter une aide est considéré comme une action de jeu
            this.nbActions++; 
        }
        return etape;
    }

    /**
     * Arrête la partie, fige le timer et retourne le bilan final.
     */
    stop() {
        if (this.status !== 'playing') return;

        this.status = 'finished';
        clearInterval(this.timerInterval);
        
        return this.generateStats();
    }

    /**
     * Compile les données de la session pour le reporting formateur.
     */
    generateStats() {
        // Le calcul du score est délégué au moteur Logigramme
        const scoreFinal = this.logigramme.calculerScore();
        const totalLignes = this.logigramme.solution.length;

        return {
            dateSession: new Date().toLocaleString('fr-FR'),
            dureeSeconde: this.elapsedTime,
            dureeFormatee: this.formattedTime,
            score: `${scoreFinal} / ${totalLignes}`,
            nbActions: this.nbActions,
            nbAidesConsultees: this.logigramme.etapesAffichees.size,
            nbJokers: this.nbJokersUtilises || 0,
            scoreAide: `${scoreFinal} / ${this.logigramme.solution.length}`,
            // On peut même calculer un score "mérité"
            scorePur: scoreFinal - (this.nbJokersUtilises || 0),
            // La matrice finale représente le "produit fini" livré par l'apprenant
            matriceResultat: this.logigramme.matriceResultat
        };
    }

    verifierProgression() {
        const erreurs = GameValidator.getErrors(this.logigramme);
        const scoreActuel = this.logigramme.calculerScore();
        
        return {
            estValide: erreurs.length === 0,
            nbErreurs: erreurs.length,
            listeErreurs: erreurs,
            score: scoreActuel
        };
    }

    /**
     * Ajoute une liaison correcte au hasard.
     * Utilisé pour un bouton "Coup de pouce".
     */
    ajouterJoker() {
        if (this.status !== 'playing') return null;

        const bonneLiaison = this.logigramme.rechercherLiaisonAleatoire();

        if (bonneLiaison) {
            // 1. On applique la liaison (le moteur gère le nettoyage des conflits)
            this.logigramme.setLiaison(bonneLiaison, true);

            // 2. On trace l'utilisation du joker dans les stats
            if (!this.nbJokersUtilises) this.nbJokersUtilises = 0;
            this.nbJokersUtilises++;
            this.nbActions++; // On compte cela comme une action

            // 3. On synchronise l'historique et la persistance
            this.history.push(this.logigramme.choix);
            if (this.storage) this.storage.save(this);

            // 4. On rafraîchit la matrice pour la vue linéaire
            this.logigramme.extraireMatriceResultat();

            return bonneLiaison;
        }

        return null;
    }

    /**
     * Getter pour afficher le temps au format MM:SS
     */
    get formattedTime() {
        const minutes = Math.floor(this.elapsedTime / 60);
        const secondes = this.elapsedTime % 60;
        return `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
    }
}
