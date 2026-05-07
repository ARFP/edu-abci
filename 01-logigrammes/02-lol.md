## Exercice : Sélection des Champions

Déterminer pour chaque joueur son **Rôle**, son **Champion** et son **Rang**.

*   **Joueurs :** Yumi, Faker, Rookie.
*   **Rôles :** Support, Mid, Jungle.
*   **Champions :** Ahri, Lee Sin, Lulu.

**Indices :**
1. Le **Support** joue le champion **Lulu**.
2. **Rookie** joue au poste de **Jungle**.
3. **Faker** est un joueur **Mid**, mais il ne joue pas Ahri aujourd'hui.
4. **Yumi** n'est pas le joueur de Jungle.

---

### La Grille (À compléter)

| | Support | Mid | Jungle | Ahri | Lee Sin | Lulu |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Yumi** | | | | | | |
| **Faker** | | | | | | |
| **Rookie** | | | | | | |
|  |  |  |  |  |  |  |
| **Ahri** | | | | | | |
| **Lee Sin** | | | | | | |
| **Lulu** | | | | | | |

<div style="page-break-after:always;"></div>

## Correction : Sélection des champions

**Raisonnement :**
1. L'indice 2 fixe **Rookie en Jungle**.
2. L'indice 3 fixe **Faker en Mid**. Par élimination, **Yumi est Support**.
3. L'indice 1 lie **Support et Lulu**. Donc **Yumi joue Lulu**.
4. Faker est en Mid et ne joue pas Ahri (Indice 3), il joue donc forcément **Lee Sin**.
5. Par élimination, **Rookie joue Ahri**.

**Tableau final :**

| | Support | Mid | Jungle | Ahri | Lee Sin | Lulu |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Yumi** | **O** | X | X | X | X | **O** |
| **Faker** | X | **O** | X | X | **O** | X |
| **Rookie** | X | X | **O** | **O** | X | X |

**Récapitulatif :**
*   **Yumi :** Support avec Lulu.
*   **Faker :** Mid avec Lee Sin.
*   **Rookie :** Jungle avec Ahri.