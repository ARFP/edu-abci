


## Les 3 commandements du Logicien

1.  **Le "X" est votre meilleur ami :** Ne cherchez pas tout de suite le "O" (la vérité). Éliminez tout ce qui est impossible. Une fois qu'il ne reste qu'une case vide dans une ligne, la vérité s'y trouve par défaut.

2.  **L'indice fantôme :** Si un indice dit "Le serveur Beta n'est pas le premier", il donne une info sur Beta, mais il dit aussi que le premier serveur n'est PAS Beta. Ça paraît bête, mais c'est là que se font les erreurs.

3.  **Le transfert de données :** Si vous avez trouvé que `Alpha = 3ème` et que `3ème = Rootkit`, alors tu dois immédiatement cocher la case `Alpha = Rootkit`. C'est ce lien indirect qui résout les énigmes difficiles.











### 1. Le Mystère du Bug en Production
**Le but :** Retrouver quel développeur a introduit quel bug, dans quel langage, et à quelle heure.

*   **Développeurs :** Alice, Bob, Charlie.
*   **Bugs :** Fuite de mémoire, Erreur de syntaxe, Boucle infinie.
*   **Langages :** Python, C++, JavaScript.
*   **Indices :**
    1. Bob n'a pas travaillé en C++.
    2. Le bug de 9h00 n'est pas la boucle infinie.
    3. Alice a codé en Python, mais n'a pas causé la fuite de mémoire.
    4. L'erreur de syntaxe s'est produite à 10h00, alors que Charlie terminait sa session.

---

### 2. Attribution des Postes de Travail
**Le but :** Déterminer le système d'exploitation (OS), l'IDE et le projet de chaque nouveau stagiaire.

*   **Stagiaires :** Liam, Sarah, Kenza.
*   **OS :** Linux, macOS, Windows.
*   **IDE :** VS Code, IntelliJ, Vim.
*   **Indices :**
    1. Celui qui utilise Linux travaille sur le projet "Cybersecurity".
    2. Sarah utilise VS Code, mais pas sur Windows.
    3. Kenza déteste Vim et travaille sur le projet "Mobile App".
    4. L'utilisateur d'IntelliJ est sur Windows.

---

### 3. La Mise à Jour de l'Infrastructure
**Le but :** Identifier quel serveur a été mis à jour, par quel administrateur et avec quel service.

*   **Serveurs :** Alpha, Delta, Sigma.
*   **Admins :** Eve, Frank, Grace.
*   **Services :** Base de données, Serveur Web, Pare-feu.
*   **Indices :**
    1. Le serveur Delta ne contient pas la Base de données.
    2. Grace s'est occupée du Pare-feu, mais pas sur le serveur Sigma.
    3. Eve a mis à jour le serveur Alpha.
    4. Le Serveur Web a été traité par Frank.

---




Voici les grilles de résolution pour vos logigrammes. Pour les compléter, les élèves doivent placer des **X** pour les exclusions et des **O** (ou des points) pour les confirmations.


### 2. Grille : Les Postes de Travail
| | Linux | macOS | Windows | VS Code | IntelliJ | Vim |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Liam** | | | | | | |
| **Sarah** | | | | | | |
| **Kenza** | | | | | | |
| **Cyber** | | | | | | |
| **Mobile** | | | | | | |
| **Web** | | | | | | |

---

### 3. Grille : L'Infrastructure
| | Alpha | Delta | Sigma | Base de Données | Web | Pare-feu |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Eve** | | | | | | |
| **Frank** | | | | | | |
| **Grace** | | | | | | |
| **BDD** | | | | | | |
| **Web** | | | | | | |
| **FW** | | | | | | |

---

**Astuce :** Pour les exercices plus complexes, rappelez à vos élèves que la zone de jonction entre les deux catégories du bas (par exemple entre *Langages* et *Bugs* dans le premier tableau) est essentielle pour reporter les déductions croisées.