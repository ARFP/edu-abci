## Exercice : L'Automate à Boissons

Avant d'écrire la moindre ligne de code, un développeur doit comprendre le **processus métier**. Votre mission est de décomposer l'action banale d'acheter une boisson pour identifier toutes les décisions logiques qu'une machine doit prendre.

### Votre Mission

**Contexte :** 
« En tant que client, je souhaite acheter une boisson dans un distributeur automatique afin de me désaltérer. »


### 1. Le Scénario de base

**Objectif :** Définir les étapes d'une procédure de commande.

**Consigne :** *Imaginez que vous expliquez à un enfant comment utiliser un distributeur de boissons*. Écrivez les étapes successives permettant d'acheter un chocolat chaud.

1. ---
2. ---
3. ---
4. ---
5. ---
6. ---
7. ---
8. ---
9. ---

<div style="page-break-after:always;"></div>

### 2. Les cas d'erreurs (introduction aux conditions)

**Objectif :** Identifier les **principaux** cas d'erreurs.

**Consigne :** Un programmeur doit tout prévoir. Listez 3 situations où le scénario ci-dessus pourrait "échouer" :

* *Exemple : L'utilisateur n'a pas assez d'argent.*
* Erreur A : __________________________________________________
* Erreur B : __________________________________________________
* Erreur C : __________________________________________________

<div style="page-break-after:always;"></div>

### 3. Appel à un ami

**Objectif :** Identifier **tous** les cas d'erreurs.

**Consigne :** Vous avez identifié 3 cas d'erreurs dans l'exercice précédent. Utilisez l'IA pour lui demander quelles autres situations pourraient faire *planter* le scénario de l'exercice 1.

Pour chaque situation remontée par l'IA :

1. Ignorez celles que vous avez déjà identifié.
2. Expliquez pourquoi cette erreur est probable et quel impact elle aurait sur l'utilisateur final.
3. Si l'IA propose une situation qui vous semble impossible ou hors-sujet, expliquez pourquoi."

* Erreur D : __________________________________________________
* Erreur E : __________________________________________________
* Erreur F : __________________________________________________
* Erreur G : __________________________________________________
* Erreur H : __________________________________________________
* Erreur I : __________________________________________________
* Erreur J : __________________________________________________

<div style="page-break-after:always;"></div>

### 4. Le scénario nominal (Jusqu'ici, tout va bien)

**Objectif :** Apprendre à décomposer une action fluide en étapes atomiques et logiques.

**Contexte :** L'utilisateur s'approche du distributeur. Il a soif, il a de la monnaie, et la machine est bien remplie. Votre mission est de décrire le déroulement idéal de l'achat d'un **café long à 1,20 €**.

**Consigne :** Complétez les étapes du scénario en adoptant le point de vue du **système**. Chaque étape doit décrire une action de l'utilisateur ou une réaction de la machine. Vous pouvez également ajouter les étapes supplémentaires que vous estimez pertinentes.

> **Contrainte :** Ne listez aucune erreur. Concentrez-vous sur le chemin "parfait".

**Nom du scénario :** Achat réussi d'une boisson chaude.  
**Acteur principal :** Client.  
**Pré-conditions :** La machine est sous tension et les stocks sont OK.
**Post-condition :** La vente est enregistrée et le stock est mis à jour.

1. **L'utilisateur** consulte l'affichage des boissons.
2. **L'utilisateur** sélectionne... 
3. **Le système** affiche... 
4. **L'utilisateur** insère...
5. **Le système** vérifie... 
6. **Le système** lance la préparation... 
7. **Le système** délivre... 
8. **Le système** rend... 
9. **L'utilisateur** récupère sa boisson.


<div style="page-break-after:always;"></div>

### 5. Les scénarios d'exception (la perfection n'existe pas)

Une fois que vous avez compris le chemin "parfait", vous devez apprendre à devenir un **débugueur** en anticipant tout ce qui peut dérailler. C'est ici que naissent les futurs `if/else` et les `try/catch`.

**Contexte :** Le monde n'est pas parfait. Un utilisateur peut être distrait, la machine peut être vide ou un capteur peut faillir. Votre rôle est de prévoir la réaction du système pour éviter qu'il ne "plante" ou ne "vole" l'utilisateur.

**Consigne :** Pour chaque situation critique ci-dessous, rédigez la **réponse du système**. Comment la machine doit-elle réagir pour rester "propre" ?


#### Cas A : La Rupture de Stock

* **Événement :** L'utilisateur appuie sur "Café long", mais le réservoir correspondant est vide.
* **Réponse du Système :** _______________________________________________________
* **Action finale :** (Ex: Est-ce qu'on rend la monnaie ? Est-ce qu'on propose autre chose ?)

#### Cas B : Le Solde Insuffisant
* **Événement :** La boisson coûte 1,20 €. L'utilisateur n'a inséré que 1,00 € et attend devant la machine.
* **Réponse du Système :** _______________________________________________________
* **Action finale :** (Ex: Combien de temps attend-on avant d'annuler ?)

#### Cas C : Le Gobelet Bloqué
* **Événement :** Le paiement est validé, mais le bras mécanique n'a pas réussi à faire tomber le gobelet.
* **Réponse du Système :** _______________________________________________________
* **Action finale :** (Point crucial : Doit-on encaisser l'argent ou créditer à nouveau l'utilisateur ?)

### 6. Les scénarios alternatifs 

Considérons le cas où l'utilisateur souhaite imprimer un reçu après avoir récupéré sa boison.

- A quelle étape le système lui proposerait de faire ce choix ?

<div style="page-break-after:always;"></div>

> #### Informations :
>
> 1.  **L'Atomicité :** Une erreur doit interrompre le flux immédiatement. On ne prépare pas le café si le gobelet n'est pas tombé.
> 2.  **L'Information Utilisateur :** Un système qui ne dit rien est un système qui semble en panne. Il faut toujours un `Afficher un "Message d'erreur"` en cas de problème.
> 3.  **L'Intégrité des données :** Si le service n'est pas rendu, la transaction doit être annulée (Rollback).



### 6. Synthèse Logique (Le "Si... Alors...")

Choisissez une étape critique du processus et reformulez-la sous forme de règle logique simple : 
> **SI** [Condition] **ALORS** [Action A] **SINON** [Action B].
