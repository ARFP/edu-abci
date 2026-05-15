/**
 * ConfigurationManager - Valide et normalise les données de l'exercice.
 * Empêche les erreurs de runtime dues à un JSON mal formé.
 */
export class ConfigurationManager {
    /**
     * Valide le schéma et la cohérence interne du JSON.
     * @param {Object} data 
     * @throws {Error} Si une incohérence majeure est détectée.
     */
    static validate(data) {
        if (!data.categories || !data.solution || !data.indices) {
            throw new Error("Format JSON invalide : 'categories', 'solution' et 'indices' sont obligatoires.");
        }

        const nbCategories = data.categories.length;
        const nbItemsAttendus = data.categories[0].items.length;

        // 1. Vérifier que toutes les catégories ont le même nombre d'items
        data.categories.forEach(cat => {
            if (cat.items.length !== nbItemsAttendus) {
                throw new Error(`Incohérence : La catégorie ${cat.nom} doit avoir ${nbItemsAttendus} items.`);
            }
        });

        // 2. Vérifier la structure de la solution
        data.solution.forEach((ligne, idx) => {
            if (ligne.length !== nbCategories) {
                throw new Error(`Solution ligne ${idx} : attendu ${nbCategories} colonnes, reçu ${ligne.length}.`);
            }
            // Vérifier que les indices pointent vers des items existants
            ligne.forEach((itemIdx, catIdx) => {
                const maxIdx = data.categories[catIdx].items.length - 1;
                if (itemIdx < 0 || itemIdx > maxIdx) {
                    throw new Error(`Solution ligne ${idx}, colonne ${catIdx} : l'index ${itemIdx} est hors limite ` +
                                    `(max: ${maxIdx} pour ${data.categories[catIdx].nom}).`);
                }
            });
        });

        console.log("✅ Configuration validée avec succès.");
        return true;
    }

    /**
     * Génère une liste propre de toutes les clés possibles pour le Logigramme.
     * Utile pour pré-générer la Map ou pour les tests.
     */
    static generateAllPossibleKeys(categories) {
        const keys = [];
        const pivots = categories[0].items; // "Positions"

        for (let i = 1; i < categories.length; i++) {
            pivots.forEach(pivot => {
                categories[i].items.forEach(item => {
                    keys.push(`${pivot}-${item}`);
                });
            });
        }
        return keys;
    }
}

/**
 * Interface de base pour la persistance.
 * Toute nouvelle classe de sauvegarde devra implémenter ces 3 méthodes.
 */
class PersistenceProvider {
    save(engine) { throw new Error("Méthode save() non implémentée"); }
    load(engine) { throw new Error("Méthode load() non implémentée"); }
    clear() { throw new Error("Méthode clear() non implémentée"); }
}


export class LocalStorageProvider extends PersistenceProvider {
    constructor(key = 'exogame_save_state') {
        super();
        this.STORAGE_KEY = key;
    }

    save(engine) {
        const state = {
            choix: Array.from(engine.logigramme.choix.entries()),
            elapsedTime: engine.elapsedTime,
            nbActions: engine.nbActions,
            currentStepIndex: engine.currentStepIndex,
            etapesAffichees: Array.from(engine.logigramme.etapesAffichees)
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }

    load(engine) {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (!saved) return false;
        const data = JSON.parse(saved);
        
        engine.logigramme.choix = new Map(data.choix);
        engine.logigramme.etapesAffichees = new Set(data.etapesAffichees);
        engine.elapsedTime = data.elapsedTime;
        engine.nbActions = data.nbActions;
        engine.currentStepIndex = data.currentStepIndex;
        
        engine.logigramme.extraireMatriceResultat();
        return true;
    }

    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}



/**
 * HistoryManager - Gère la pile d'annulation (Undo) et de rétablissement (Redo).
 */
export class HistoryManager {
    constructor(maxSize = 20) {
        this.undoStack = [];
        this.redoStack = [];
        this.maxSize = maxSize; // On limite la mémoire utilisée
    }

    /**
     * Enregistre un nouvel état dans l'historique.
     * @param {Map} currentChoix - La Map actuelle des choix du Logigramme.
     */
    push(currentChoix) {
        // On crée une copie profonde de la Map pour l'historique
        const snapshot = Array.from(currentChoix.entries());
        
        this.undoStack.push(snapshot);
        
        // On vide la pile de Redo car une nouvelle action brise la chaîne de rétablissement
        this.redoStack = [];

        // On respecte la limite de taille
        if (this.undoStack.length > this.maxSize) {
            this.undoStack.shift(); // On enlève le plus vieux
        }
    }

    /**
     * Retourne l'état précédent.
     * @returns {Array|null}
     */
    undo() {
        if (this.undoStack.length <= 1) return null; // On garde toujours l'état initial ou actuel

        // On déplace l'état actuel vers la pile Redo
        const current = this.undoStack.pop();
        this.redoStack.push(current);

        // On retourne l'état précédent
        return this.undoStack[this.undoStack.length - 1];
    }

    /**
     * Récupère un état précédemment annulé.
     * @returns {Array|null}
     */
    redo() {
        if (this.redoStack.length === 0) return null;

        const state = this.redoStack.pop();
        this.undoStack.push(state);

        return state;
    }
}

/**
 * Validator - Analyse la cohérence entre les choix de l'utilisateur
 * et la solution technique.
 */
export class GameValidator {
    /**
     * Compare une liaison spécifique avec la solution.
     * @param {string} key - La clé (ex: "Pos 1-Dell")
     * @param {Logigramme} logigramme
     * @returns {boolean|null} true si juste, false si faux, null si inconnu (non coché)
     */
    static checkLiaison(key, logigramme) {
        const [posNom, itemNom] = key.split('-');
        const posIdx = logigramme.categories[0].items.indexOf(posNom);
        
        // On cherche dans quelle catégorie se trouve l'item
        let catIdx = -1;
        let itemIdx = -1;
        
        for (let i = 1; i < logigramme.categories.length; i++) {
            const idx = logigramme.categories[i].items.indexOf(itemNom);
            if (idx !== -1) {
                catIdx = i;
                itemIdx = idx;
                break;
            }
        }

        if (posIdx === -1 || catIdx === -1) return null;

        // On vérifie si dans la solution, à cette position, on a bien cet item
        const solutionAttendue = logigramme.solution.find(s => s[0] === posIdx);
        return solutionAttendue[catIdx] === itemIdx;
    }

    /**
     * Analyse toutes les erreurs actuelles (les 'true' qui devraient être 'false')
     * @param {Logigramme} logigramme
     * @returns {Array} Liste des clés erronées
     */
    static getErrors(logigramme) {
        const erreurs = [];
        for (let [key, value] of logigramme.choix) {
            if (value === true) {
                if (this.checkLiaison(key, logigramme) === false) {
                    erreurs.push(key);
                }
            }
        }
        return erreurs;
    }
}