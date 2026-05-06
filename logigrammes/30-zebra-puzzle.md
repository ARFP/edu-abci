## Exercice : Rack maudit du Data Center

**Objectif :** Dans une baie de brassage, il y a **5 serveurs** alignés horizontalement (de 1 à 5). Chaque serveur a une **marque**, un **OS**, une **application** spécifique, une **LED de couleur** et une **consommation électrique**.

**Les données :**
*   **Marques :** Dell, HP, IBM, Cisco, Lenovo.
*   **OS :** Ubuntu, Debian, CentOS, Windows, FreeBSD.
*   **Applications :** Docker, SQL, Nginx, Redis, Minecraft.
*   **LED :** Rouge, Verte, Bleue, Jaune, Blanche.
*   **Consommation :** 200W, 300W, 400W, 500W, 600W.

**Les indices :**
1.  Le serveur **Dell** possède la LED **Rouge**.
2.  Le serveur **HP** fait tourner **Docker**.
3.  Le serveur **IBM** utilise **Debian**.
4.  Le serveur à LED **Verte** est situé immédiatement à **gauche** de celui à LED **Blanche**.
5.  Le serveur à LED **Verte** consomme **500W**.
6.  Le serveur qui fait tourner **Nginx** possède une LED **Bleue**.
7.  Le serveur du **milieu** (n°3) utilise **Ubuntu**.
8.  Le serveur **Cisco** est le **premier** de la baie (n°1).
9.  Le serveur qui fait tourner **SQL** est à côté de celui qui consomme **200W**.
10. Le serveur qui consomme **300W** est à côté de celui qui fait tourner **Minecraft**.
11. Le serveur qui consomme **600W** utilise **FreeBSD**.
12. Le serveur **Lenovo** utilise **Windows**.
13. Le serveur **Cisco** est à côté du serveur à LED **Jaune**.
14. Le serveur qui fait tourner **SQL** a un voisin qui utilise **CentOS**.

<div style="page-break-after:always;"></div>

### La Grille de Travail (Méthode Linéaire)

| Position | 1 | 2 | 3 | 4 | 5 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Marque** | | | | | |
| **LED** | | | | | |
| **OS** | | | | | |
| **App** | | | | | |
| **Watt** | | | | | |

<div style="page-break-after:always;"></div>

### La Solution (Le Rack débuggé)

Le secret du Zebra Puzzle est de trouver l'élément fixe (ici, le **Cisco en position 1**) et de remonter la chaîne de voisinage.

| Pos | Marque | LED | OS | App | Watt |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Cisco** | Bleue | CentOS | **Nginx** | 400W |
| **2** | **IBM** | Jaune | **Debian** | SQL | 300W |
| **3** | **Dell** | Rouge | **Ubuntu** | Minecraft | 200W |
| **4** | **HP** | Verte | **FreeBSD** | Docker | 500W |
| **5** | **Lenovo** | Blanche | **Windows** | Redis | 600W |

---

### Pourquoi c'est le "Boss Final" ?
Contrairement aux logigrammes classiques, un Zebra Puzzle contient des informations **spatiales** ("à côté de", "à gauche de"). 

Si tes collègues réussissent celui-ci sans s'énerver, ils sont officiellement prêts pour devenir **Architectes Cloud Senior**. C'est le test ultime de patience et de vision d'ensemble !