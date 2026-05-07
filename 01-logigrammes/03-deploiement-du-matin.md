## Exercice : Déploiement du Matin

**Objectif :** Associer chaque développeur à son **outil de versioning** et à l'**heure** de son dernier déploiement.

*   **Développeurs :** Sam, Alex, Lou.
*   **Outils :** Git, SVN, Mercurial.
*   **Heures :** 08h00, 09h00, 10h00.

**Indices :**
1. Sam a déployé à **08h00**.
2. Celui qui utilise **Mercurial** a déployé à **10h00**.
3. Alex utilise **Git**.
4. Lou n'utilise pas **SVN**.

---

### La Grille (À compléter)

| | Git | SVN | Mercurial | 08h00 | 09h00 | 10h00 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Sam** | | | | | | |
| **Alex** | | | | | | |
| **Lou** | | | | | | |
|  | | | | | | |
| **08h00** | | | | | | |
| **09h00** | | | | | | |
| **10h00** | | | | | | |

<div style="page-break-after:always;"></div>

## Correction : Déploiement du Matin

**Raisonnement :**
1. L'indice 1 fixe **Sam à 08h00**.
2. L'indice 3 fixe **Alex à Git**.
3. L'indice 4 dit que Lou n'utilise pas SVN. Comme Alex a déjà Git, **Lou utilise Mercurial**.
4. L'indice 2 lie Mercurial à 10h00. Donc **Lou a déployé à 10h00**.
5. Par déduction, **Alex a déployé à 09h00** et **Sam utilise SVN**.

**Tableau final :**

| | Git | SVN | Mercurial | 08h00 | 09h00 | 10h00 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Sam** | X | **O** | X | **O** | X | X |
| **Alex** | **O** | X | X | X | **O** | X |
| **Lou** | X | X | **O** | X | X | **O** |

**Récapitulatif :**
*   **Sam :** SVN à 08h00.
*   **Alex :** Git à 09h00.
*   **Lou :** Mercurial à 10h00.