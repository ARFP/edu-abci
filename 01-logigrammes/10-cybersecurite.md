## Exercice : Incident de Cybersécurité

**Objectif :** Lors d'une cyber-attaque, quatre serveurs ont été compromis. Vous devez retrouver l'**ordre** des attaques, le **type de malware** utilisé et le **point d'entrée** (vulnérabilité).

*   **Serveurs :** Alpha, Beta, Gamma, Delta.
*   **Malwares :** Ransomware, Spyware, Rootkit, Trojan.
*   **Points d'entrée :** Phishing, SQL Injection, Port 22 ouvert, Bruteforce.

**Indices :**
1. Le serveur **Beta** a été compromis en 3ème position, immédiatement après celui victime d'une **SQL Injection**.
2. Le malware **Rootkit** n'a pas été trouvé sur le serveur **Gamma**, qui a été le tout premier à subir l'attaque.
3. L'attaque par **Phishing** s'est déroulée avant celle par **Bruteforce**.
4. Le **Ransomware** a été détecté sur le serveur **Delta**.
5. Le serveur **Alpha** a été le dernier attaqué (4ème).
6. Le malware **Spyware** est lié à l'ouverture du **Port 22**.
7. L'attaque par **injection SQL** n'a pas touché le serveur **Alpha**.

---

### La Grille (À compléter)

| | 1er | 2ème | 3ème | 4ème | Alpha | Beta | Gamma | Delta |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Ransomware**| | | | | | | | |
| **Spyware** | | | | | | | | |
| **Rootkit** | | | | | | | | |
| **Trojan** | | | | | | | | |
| **---** | **---** | **---** | **---** | **---** | **---** | **---** | **---** | **---** |
| **Phishing** | | | | | | | | |
| **SQL Inj.** | | | | | | | | |
| **Port 22** | | | | | | | | |
| **Bruteforce**| | | | | | | | |

<div style="page-break-after:always;"></div>

## Correction : Incident de Cybersécurité

1. **Ancrage temporel :** L'indice 2 fixe **Gamma** en 1ère position. L'indice 5 fixe **Alpha** en 4ème position.
2. **La séquence Beta :** L'indice 1 nous dit que **Beta** est 3ème et qu'il suit immédiatement l'injection SQL. Donc l'**injection SQL** a eu lieu en 2ème position.
3. **Identification du 2ème serveur :** Par élimination des positions et des serveurs, le 2ème serveur est **Delta**. L'indice 4 nous apprend que Delta est infecté par un **Ransomware**.
4. **Points d'entrée restants :** Il reste Phishing et Bruteforce pour les positions 1 et 4. L'indice 3 (Phishing avant Bruteforce) place le **Phishing** en 1er (Gamma) et le **Bruteforce** en 4ème (Alpha).
5. **Vecteurs techniques :** L'indice 6 lie le **Port 22** au **Spyware**. Ce duo ne peut aller qu'en 3ème position (Beta), car les autres positions ont déjà leurs points d'entrée ou malwares.
6. **Malwares finaux :** Il reste Trojan et Rootkit. L'indice 2 exclut le Rootkit de Gamma (1er). Le **Rootkit** est donc sur Alpha (4ème), et le **Trojan** sur Gamma (1er).

**Résultat final :**

| Ordre | Serveur | Point d'entrée | Malware |
| :--- | :--- | :--- | :--- |
| **1er** | **Gamma** | Phishing | Trojan |
| **2ème** | **Delta** | SQL Injection | Ransomware |
| **3ème** | **Beta** | Port 22 ouvert | Spyware |
| **4ème** | **Alpha** | Bruteforce | Rootkit |
