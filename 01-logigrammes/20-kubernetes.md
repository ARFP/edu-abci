### Exercice : Lancement du Cluster Kubernetes

**Objectif :** Retrouver pour chaque développeur son **rôle**, le **micro-service** dont il s'occupe et la **couleur du bandeau** de son écran de monitoring.

*   **Développeurs :** Aya, Boris, Chloé.
*   **Micro-services :** Authentification (Auth), Paiement, Stockage.
*   **Rôles :** Lead Dev, SRE, Sécurité.
*   **Couleurs de bandeau :** Bleu, Violet, Orange.

**Indices :**
1. La personne en charge du service **Paiement** a un bandeau **Violet**.
2. **Boris** est le **SRE**, mais il n'a pas de bandeau **Orange**.
3. Le **Lead Dev** s'occupe du service **Stockage**.
4. **Chloé** n'a pas de bandeau **Bleu**.
5. La personne à la **Sécurité** n'est pas **Aya**.

---

### Les Grilles de Résolution

| **GRILLE A (Métiers/Services)** | Auth | Paiement | Stockage |
| :--- | :---: | :---: | :---: |
| **Lead Dev** | | | |
| **SRE** | | | |
| **Sécurité** | | | |
| **---** | **---** | **---** | **---** |
| **Aya** | | | |
| **Boris** | | | |
| **Chloé** | | | |

| **GRILLE B (Couleurs/Développeurs)** | Bleu | Violet | Orange |
| :--- | :---: | :---: | :---: |
| **Aya** | | | |
| **Boris** | | | |
| **Chloé** | | | |

<div style="page-break-after:always;"></div>

## Correction : Lancement du Cluster Kubernetes

1.  **Grille A :** L'indice 3 lie **Lead Dev** et **Stockage**.
2.  **Grille A :** L'indice 2 fixe **Boris comme SRE**.
3.  **Grille B :** Boris n'a pas le bandeau Orange (indice 2). Chloé n'a pas le Bleu (indice 4).
4.  **Lien Grille A/B :** L'indice 1 dit que **Paiement = Violet**.
    *   Si Boris est SRE, il ne peut pas être Lead Dev (Stockage). Boris est donc soit Auth, soit Paiement.
    *   Si Boris était au Paiement, il aurait le bandeau Violet. Mais attendons de voir les autres.
5.  **Grille A :** La Sécurité n'est pas Aya (indice 5). Comme Boris est SRE, **Chloé est à la Sécurité** et **Aya est Lead Dev**.
6.  **Déductions croisées :**
    *   Si Aya est **Lead Dev**, elle s'occupe du **Stockage** (Indice 3).
    *   Si Chloé est à la **Sécurité**, elle ne peut pas être au Paiement (car Paiement = Violet et l'indice 4 dit que Chloé n'est pas Bleue... attendez).
    *   *Reprenons :* Aya (Lead), Boris (SRE), Chloé (Sécurité).
    *   Aya a le Stockage. Il reste Auth et Paiement pour Boris et Chloé.
    *   Si Chloé (Sécurité) s'occupait du Paiement (Violet), elle ne serait pas Bleue. Mais si Chloé est au Paiement, alors Boris est à l'Auth.
    *   Regardons les couleurs : Boris n'est pas Orange. S'il est à l'Auth, il est soit Bleu soit Violet. Si Chloé est au Paiement, elle est Violette. Donc Boris est Bleu.
    *   Vérification : Aya (Orange), Boris (Bleu), Chloé (Violet/Paiement). Ça marche !

**Résultat final :**

| Développeur | Rôle | Micro-service | Couleur Bandeau |
| :--- | :--- | :--- | :--- |
| **Aya** | Lead Dev | Stockage | Orange |
| **Boris** | SRE | Authentification | Bleu |
| **Chloé** | Sécurité | Paiement | Violet |
