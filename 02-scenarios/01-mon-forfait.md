# Scénarisation

Traduire une interface visuelle en une suite logique d'actions, de conditions et d'événements utilisateur

Rédiger **une spécification fonctionnelle / un scénario logique** sous forme d'étapes textuelles ou d'un logigramme textuel.

<style>img { border: 1px solid black; }</style>

## Exercice 1 : Mon forfait Mobile

Vous recevez la maquette d'une page de sélection d'abonnement mobile Connect+ et devez rédiger le scénario nominal.

### Structure de la maquette : 

1. Un titre : **"Mon Forfait sur Mesure"**.
2. 3 blocs représentants les forfaits : **5 Go**, **50 Go**, **100 Go**.
3. Un affichage dynamique du prix : **X € / mois**.
4. Un bouton **"Souscrire"**.

#### Règles de gestion

* 5 Go = 5 € / mois
* 50 Go = 15 € / mois
* 100 Go = 20 € / mois

<div style="page-break-after:always;"></div>



![mon-forfait-1](./mon-forfait.jpg)



### La maquette v2

Vous recevez une mise à jour de la maquette de la page de sélection d'abonnement mobile. Mettez à jour le scénario nominal et rédigez le scénario alternatif.

**Ajouts :**

1. Une Checkbox (Case à cocher) : **"Option 5G"** (qui doit être grisée/désactivée si le curseur est sur 5 Go).

#### Règles de gestion supplémentaires

* L'option 5G n'est pas disponible pour le forfait 5 Go.

![mon-forfait-2](./mon-forfait2.jpg)



<div style="page-break-after:always;"></div>

## Exercice 1.2 : Mon numéro

L'utilisateur a sélectionné son forfait et cliqué sur "Souscrire". L'étape suivante demande à l'utilisateur de choisir s'il souhaite conserver son numéro actuel ou bénéficier d'un nouveau numéro.

![mon-forfait-3](./mon-forfait3.jpg)

Rédigez les scénarios : 

1. L'utilisateur souhaite conserver son numéro actuel.
2. L'utilisateur souhaite un nouveau numéro.

<div style="page-break-after:always;"></div>

# Corrections

```mermaid
graph TD
    A[Début : Utilisateur sur la page] --> B{Action Utilisateur}

    %% Sélection du Forfait
    B -->|Sélectionne un Forfait| C{Quel forfait ?}
    C -->|5 Go| D[Prix = 5€]
    C -->|50 Go| E[Prix = 15€]
    C -->|100 Go| F[Prix = 20€]

    %% Gestion de l'option 5G
    D --> G[Option 5G : Grisée / Désactivée]
    E --> H[Option 5G : Disponible]
    F --> H

    G --> J[Calcul du Total]
    H --> K{Option 5G cochée ?}

    K -->|Oui| L[Ajouter +3€ au Prix]
    K -->|Non| J

    L --> J

    %% Finalisation
    J --> M[Affichage dynamique du Prix X€ / mois]
    M --> N{Clic sur Souscrire ?}
    N -->|Non| B
    N -->|Oui| O[Fin : Validation de l'abonnement]
```

---

```mermaid
graph TD
    A[Événement : Clic sur 'Souscrire'] --> B{Conserver son numéro actuel ?}

    %% Chemin : Conservation du numéro
    B -->|Oui| C[Afficher champs : Numéro actuel + RIO]
    C --> D{Saisie des données}
    D -->|Incomplètes ou Format invalide| E[Echec]
    D -->|Valides| F[Bouton 'Valider' : Activé]

    %% Chemin : Nouveau numéro
    B -->|Non| G[Afficher liste de 5 numéros proposés]
    G --> H{Sélection d'un numéro}
    H -->|Numéro choisi| J[Bouton 'Valider' : Activé]

    %% Finalisation de l'étape
    F --> K{Clic sur Valider ?}
    J --> K
    K -->|Oui| L[Fin : Succès]
    K -->|Non| B

```
