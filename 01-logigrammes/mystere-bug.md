# 1. Le Mystère du Bug en Production

Retrouver quel développeur a introduit quel bug, dans quel langage, et à quelle heure.

*   **Développeurs :** Alice, Bob, Charlie.
*   **Bugs :** Fuite de mémoire, Erreur de syntaxe, Boucle infinie.
*   **Langages :** Python, C++, JavaScript.
*   **Indices :**
    1. Bob n'a pas travaillé en C++.
    2. Le bug de 9h00 n'est pas la boucle infinie.
    3. Alice a codé en Python, mais n'a pas causé la fuite de mémoire.
    4. L'erreur de syntaxe s'est produite à 10h00, alors que Charlie terminait sa session.

---
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

## 1. Grille : Le Mystère du Bug

| | Python | C++ | JS | Fuite Mémoire | Err. Syntaxe | Boucle Inf. |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Alice** | | | | | | |
| **Bob** | | | | | | |
| **Charlie** | | | | | | |
| **9h00** | | | | | | |
| **10h00** | | | | | | |
| **11h00** | | | | | | |

<div style="page-break-after:always;"></div>

## 1. Solution : Le Mystère du Bug

*   **Alice :** Python / Boucle infinie / 11h00
*   **Bob :** JavaScript / Erreur de syntaxe / 10h00
*   **Charlie :** C++ / Fuite de mémoire / 09h00

| | Python | C++ | JS | Fuite | Syntaxe | Boucle |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Alice** | **O** | X | X | X | X | **O** |
| **Bob** | X | X | **O** | X | **O** | X |
| **Charlie** | X | **O** | X | **O** | X | X |
| **9h00** | X | **O** | X | **O** | X | X |
| **10h00** | X | X | **O** | X | **O** | X |
| **11h00** | **O** | X | X | X | X | **O** |

---