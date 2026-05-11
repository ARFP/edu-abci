# Cours : L'Art de la Scénarisation

La scénarisation est l'étape qui permet de s'assurer que l'on a compris un problème (un besoin client) avant de chercher la solution technique.

Un scénario est une description textuelle de la manière dont un utilisateur interagit avec un système pour atteindre un but.

## 1. Les piliers du scénario

* **Le Scénario Nominal (Le "Happy Path")** : 
    - Tout se passe bien. L'utilisateur fait les bons choix, le système est disponible, et le but est atteint sans encombre.
* **Le Cas d'Erreur** : 
    - Évènement imprévu (ex: plus de batterie, saisie incorrecte, perte de réseau).
* **Le Scénario d'Exception** : 
    - Réponse du système à un cas d'erreur. Dans ce cas, le scénario nominal se termine en échec.
* **Le Scénario alternatif** : 
    - Cheminement qui permet d'atteindre le même objectif final que le scénario nominal, mais en empruntant une voie différente. Il ne s'agit pas d'une erreur ou d'un échec, mais d'un choix ou d'une option disponible pour l'utilisateur ou le système. (ex: imprimer un ticket, ajouter une pièce jointe...).

### Différence entre *Exception* et *Alternatif*

C'est souvent là que les débutants s'emmêlent les pinceaux :
- **L'Exception** : C'est un substitut à une erreur. On traite un problème pour éviter le crash. C'est un chemin "subi".
- **L'Alternatif** : C'est un choix utilisateur ou une configuration différente. C'est un chemin "voulu".

Si le scénario nominal est l'autoroute, le scénario alternatif est la route nationale (on arrive au même endroit), tandis que le scénario d'exception est la déviation mise en place parce qu'un pont s'est écroulé.


### Préconditions et Postconditions

Pour sécuriser un algorithme, on définit les "murs" qui encadrent le scénario.

C'est la touche finale pour transformer un simple récit en une véritable **spécification technique**. Les préconditions et postconditions agissent comme un contrat : "Si ces conditions ne sont pas remplies, le scénario ne peut même pas démarrer ou est considéré comme en échec".

#### 1. La Précondition (Avant)
C'est ce qui doit **obligatoirement être vrai** pour que le scénario puisse démarrer. Si la précondition n'est pas remplie, le système ne réagit même pas.
*   *Exemple (Distributeur) :* La machine doit être sous tension (allumée).
*   *Exemple (SMS) :* L'utilisateur doit avoir une carte SIM active.

#### 2. La Postcondition (Après)
C'est l'**état final garanti** du système une fois que le scénario est terminé avec succès.
*   *Exemple (Distributeur) :* Le stock de la boisson a diminué de 1 ET le client a récupéré sa boisson.
*   *Exemple (SMS) :* Le message est marqué comme "Délivré" dans la base de données.

#### Pourquoi est-ce essentiel ?

1.  **Gestion de la mémoire :** La **postcondition** "Stock = Stock - 1" vous prépare à comprendre la mise à jour des variables.
2.  **Sécurité :** La **précondition** vous apprend à vérifier si une donnée existe avant de tenter de l'utiliser.
3.  **Tests :** C'est la base du test informatique : on compare le résultat obtenu avec la **postcondition** attendue pour savoir si le programme fonctionne.


### Structure type d'un scénario complet :


*   **Titre :** [Nom du scénario]
*   **Préconditions :** [Ce qu'il faut au départ]
*   **Postconditions :** [L'état final du système]
*   **Scénario Nominal :** [Étapes 1, 2, 3...]
*   **Scénarios Alternatifs :** [Les variantes et options]
*   **Scénarios d'Exceptions :** [Les cas d'erreur]

C'est avec cette structure que travaillent les **Business Analysts** et les **Architectes Logiciels**.

## 2. Exemple : Envoyer un message (SMS)

- **Titre :** Envoyer un SMS
- **Préconditions :**
    - Le téléphone est allumé et déverrouillé.
    - L'application "Messages" est ouverte.
- **Postconditions :**
    - Le message a été transmis au serveur de messagerie.
    - Le message apparaît dans le fil de discussion de l'utilisateur.

**Scénario Nominal :**
1. L'utilisateur sélectionne un contact.
2. L'utilisateur saisit le texte à envoyer.
3. L'utilisateur appuie sur "Envoyer".
4. Le système transmet les données au serveur
5. Le système affiche "Message envoyé".
6. Le scénario se termine avec succès.

**Scénario Alternatif A2 : *Joindre une image***

*Ce scénario débute après l'étape 1 du Scénario Nominal.*

1. L'utilisateur clique sur l'icône "+" ou "Image".
2. L'utilisateur sélectionne une image dans sa galerie.
3. Le système joint l'image au message.
4. Le scénario reprend à l'étape 2 du Scénario Nominal.

**Scénario d'Exception E5 : *Réseau indisponible***

*  Étape 4 : Le réseau est indisponible au moment de l'envoi.

1. Le système affiche "Réseau non disponible".
2. Le système enregistre le message dans les "Brouillons".
3. Le scénario se termine en échec.


## Pourquoi scénariser avant de coder ?

1.  **C'est visuel** : On peut montrer le scénario à un client pour vérifier qu'on a bien compris son besoin.
2.  **C'est sécurisé** : En listant les erreurs possibles, on évite que le futur programme ne s'arrête brutalement.
3.  **C'est structuré** : Chaque étape du scénario deviendra une insctruction dans votre futur **code**.


### Le test de la grand-mère

Pour savoir si votre scénario est bon, lisez-le à quelqu'un qui ne connaît rien à l'informatique. S'il y a un "trou" dans l'explication, c'est qu'il manque une étape dans votre logique !

> **À retenir :** Un développeur passe ~80% de son temps à réfléchir aux scénarios d'exception, et seulement ~20% au scénario nominal.
