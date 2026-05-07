## Exercice : "L'Algorithme du Videur"

- Passage de la **narration** (scénarios) à la **formalisation** (algorithme).
- Introduction aux **variables** simples et aux structures de décision.

### Objectif
Traduire un règlement (scénario métier) en une suite d'instructions logiques compréhensibles par une machine.

### La Consigne

Vous êtes le développeur du système de contrôle d'une porte d'entrée automatique pour un club. Voici le règlement que vous devez automatiser :
1.  L'entrée est réservée aux personnes de **18 ans ou plus**.
2.  Le client doit porter des **chaussures de ville** (les baskets sont interdites).
3.  Si le client a **moins de 18 ans**, l'accès est refusé.
4.  Si le client est **majeur** mais **porte des baskets**, l'accès est refusé.
5.  Dans tous les autres cas, la porte s'ouvre.

---

### Travail à faire

#### 1. Identification des Variables
Listez les informations que la machine doit "connaître" avant de prendre une décision.
*   *Exemple : L'âge du client.*

#### 2. L'Arborescence de décision
Dessinez ou listez le cheminement logique en utilisant des embranchements.
*   *Exemple : Est-ce qu'il est majeur ? Si oui -> Question suivante. Si non -> Stop.*

#### 3. Rédaction en "Langage Structuré"
Utilisez le modèle suivant pour rédiger votre algorithme final :

> **LIRE** [Information]
> **SI** [Condition] **ALORS**
>    **AFFICHER** [Message]
> **SINON SI** [Autre Condition] **ALORS**
>    **AFFICHER** [Autre Message]
> **SINON**
>    **AFFICHER** [Message final]
> **FIN SI**


### Corrigé Type  :

```text
LIRE Age_Client
LIRE Type_Chaussures

SI Age_Client < 18 ALORS
    AFFICHER "Accès refusé : mineur"
SINON SI Type_Chaussures == "Baskets" ALORS
    AFFICHER "Accès refusé : tenue incorrecte"
SINON
    AFFICHER "Bienvenue, la porte s'ouvre"
FIN SI
```
