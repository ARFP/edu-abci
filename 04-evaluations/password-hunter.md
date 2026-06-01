Le projet **Password Hunter** est un excellent choix pour travailler sur la **validation de données en temps réel** (Regex) et le **feedback visuel dynamique**. 


### Le Concept

L'utilisateur est face à un coffre-fort numérique (ou un bouclier). Un "robot hacker" tente de le forcer. Plus le mot de passe saisi est complexe, plus le bouclier devient résistant et change d'apparence.

---

### Structure de l'Interface (Monopage)

1. **La Zone de Saisie (Input)** :
* Un champ `password` central.
* Une icône "œil" pour afficher/masquer le texte (exercice classique d'interaction).


2. **L'Indicateur Visuel (Le Bouclier)** :
* Un élément graphique (cercle ou bouclier) dont la **couleur** et la **taille** changent selon la force du mot de passe.
* **Rouge / Brisé** : Très faible.
* **Orange / Fragile** : Moyen.
* **Vert / Éclatant** : Fort.
* **Bleu / Électrique** : Incassable (Bonus).


3. **La Checklist de Sécurité** :
* Une liste de conditions qui passent du gris au vert (avec une icône ✅) dès qu'elles sont remplies :
* 8 caractères minimum.
* Au moins une majuscule.
* Au moins un chiffre.
* Au moins un caractère spécial.





---

### Logique Technique (Progressive)

#### Niveau 1 (DWWM) : Les Conditions Simples

L'apprenant utilise des propriétés calculées (`computed` en Vue.js) pour vérifier la longueur et la présence de types de caractères.

* **Exercice** : Lier la couleur d'une `div` à la valeur d'un score (0 à 4).

#### Niveau 2 (CDA) : L'Entropie et le Temps de Craquage

On ajoute une dimension mathématique.

* **Le calcul** : Estimer le temps nécessaire pour qu'un ordinateur force le mot de passe (ex: "Il faudrait 2 siècles pour casser ce code").
* **La mécanique de jeu** : Si l'utilisateur s'arrête de taper un mot de passe trop simple, une barre de progression "Hacking..." se remplit. S'il ne renforce pas son code avant la fin, le coffre "explose".

---

### Pourquoi ce projet est adapté à tes groupes ?

* **Gestion des Regex** : C'est le projet idéal pour démystifier les expressions régulières sans douleur.
* **Feedback Instantané** : Pour des profils ayant besoin de concret, voir le bouclier changer à chaque touche pressée est très gratifiant.
* **Sensibilisation** : Il aborde la **cybersécurité** de manière frontale mais ludique, un sujet majeur de leur futur métier de développeur.

### Variante "Accessibilité"

Pour tes apprenants en situation de handicap, on peut remplacer les couleurs par des **symboles** ou des **niveaux de blindage** (ex: Bois $\rightarrow$ Fer $\rightarrow$ Diamant) pour ne pas pénaliser les daltoniens et renforcer l'aspect "RPG".



# Regex 

Pour accompagner tes apprenants sur le projet **Password Hunter**, voici une liste de **Regex** classées par niveau de difficulté. L'idée est de leur permettre de valider chaque critère un par un pour mettre à jour leur checklist interactive.

---

### 1. Les Regex de base (Validation unitaire)

Ces expressions permettent de vérifier un seul critère à la fois. C'est l'approche la plus simple pour des débutants en **DWWM**.

* **Au moins une minuscule** : `/[a-z]/`
* **Au moins une majuscule** : `/[A-Z]/`
* **Au moins un chiffre** : `/\d/` ou `/[0-9]/`
* **Au moins un caractère spécial** : `/[!@#$%^&*(),.?":{}|<>]/` ou `/[^a-zA-Z0-9\s]/` 
* **Longueur minimum (ex: 8 caractères)** : `/.{8,}/`

---

### 2. Les Regex combinées (Niveau Avancé / CDA)

Si tes apprenants sont plus à l'aise, ils peuvent utiliser des "lookaheads" (assertions) pour tout vérifier en une seule expression. C'est plus complexe à lire mais très puissant.

* **Sécurité Moyenne** (Majuscule + Minuscule + Chiffre + 8 caractères) :
`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$`
* **Sécurité Maximale** (Majuscule + Minuscule + Chiffre + Spécial + 12 caractères) :
`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$`

---

### 3. Astuces pédagogiques pour le projet

* **Le testeur de Regex** : Pour les aider à comprendre, conseille-leur d'utiliser des outils comme **Regex101**. Ils peuvent y coller leur expression et voir l'explication détaillée de chaque symbole.
* **Méthode JS** : Rappelle-leur d'utiliser la méthode `.test()` en JavaScript pour retourner un booléen :
```javascript
const isStrong = /[A-Z]/.test(passwordValue); // Retourne true ou false

```


* **Accessibilité** : Pour les profils en situation de handicap, suggère-leur de lier ces Regex à des changements d'états visuels immédiats (une icône qui passe du rouge au vert) pour éviter la frustration d'un formulaire qui ne "dit rien".

### 4. Le barème de score (Exemple)

Tu peux leur suggérer un système de points basé sur ces Regex pour faire évoluer le **Bouclier** :

1. **Score 1** : Longueur OK.
2. **Score 2** : + Majuscules.
3. **Score 3** : + Chiffres.
4. **Score 4** : + Caractères spéciaux (Bouclier de diamant).

```

```