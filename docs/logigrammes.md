---
marp: true
theme: default
paginate: true
header: 'Logique & Déduction'
footer: 'Méthode : Le Logigramme à grille'
style: |
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: center; }
  .highlight { color: #2563eb; font-weight: bold; }

---

# Résoudre un Logigramme 
## Maîtriser l'art de la déduction par élimination

---

## 1. Qu'est-ce qu'un logigramme ?

C'est une énigme où vous devez croiser des informations pour remplir une grille.

- **Le but** : Trouver la seule combinaison possible entre plusieurs catégories.
- **La règle d'or** : 
  - Un **Vrai (O)** élimine toute sa ligne et toute sa colonne.
  - Un **Faux (X)** aide à trouver le Vrai par élimination.

---

## 2. La Méthode de Résolution

### A. Traduire les indices
Chaque phrase cache une information positive ou négative.
- *"Léa n'utilise pas Python"* -> Mettre un **X** à l'intersection Léa/Python.
- *"Le développeur de Java est plus âgé que Marc"* -> Marc n'utilise pas Java (**X**) ET le plus jeune du groupe n'utilise pas Java (**X**).

### B. Le raisonnement par défaut
Si dans une ligne de 4 cases, vous avez 3 **X**, alors la 4ème est obligatoirement un **O**.

---

## 3. Exemple visuel (Grille simplifiée)

| | Python | Java | C++ |
| :--- | :---: | :---: | :---: |
| **Alice** | **O** | X | X |
| **Bob** | X | ? | ? |
| **Charlie** | X | ? | ? |

> **Indice :** Alice code en Python.
> **Conséquence :** On barre toute la ligne d'Alice et toute la colonne Python.

---

## 4. Pourquoi est-ce utile pour un Dev ?

1. **Analyse de contraintes** : Apprendre à lire un cahier des charges où les informations sont éparpillées.
2. **Pensée booléenne** : Raisonner en `VRAI` ou `FAUX` (0 ou 1).
3. **Déduction logique** : Si A = B et B = C, alors A = C (Transitivité).
4. **Éviter les suppositions** : En logigramme comme en bug, on ne devine pas, on prouve.

---

## 5. À vous de jouer !

### L'énigme des 3 serveurs :
3 serveurs (**Alpha, Beta, Gamma**) ont 3 pannes différentes (**Disque, RAM, CPU**).

1. Beta n'a pas de problème de Disque.
2. La panne CPU appartient à Gamma ou à Beta.
3. Le problème de Disque n'est pas chez Alpha.

**Remplissez la grille pour trouver le coupable !**