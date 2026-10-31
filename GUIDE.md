# Passeport — Guide de mise en ligne (gratuit) et installation iPhone

Ton app est un site statique : elle marche gratuitement sur **GitHub Pages**, sans serveur, et s'installe sur iPhone comme une vraie app.

> **Juste tester vite ?** Ouvre le fichier **`passeport-standalone.html`** (tout est dedans : rien à installer, double-clic et ça marche). Pour la vraie app installable sur iPhone, suis la Partie 1 ci-dessous avec les fichiers séparés.

---

## Partie 1 — Publier sur GitHub Pages (gratuit)

### Ce qu'il te faut
- Un compte GitHub (gratuit) : https://github.com/signup
- Les fichiers du dossier `passeport/` (ce dossier)

### Étapes

**1. Crée un dépôt (repository)**
- Va sur https://github.com/new
- Nom du dépôt : `passeport` (ou ce que tu veux)
- Coche **Public** (obligatoire pour Pages gratuit)
- Clique **Create repository**

**2. Envoie tes fichiers**

Le plus simple, sans ligne de commande :
- Sur la page du dépôt, clique **« uploading an existing file »** (ou Add file → Upload files)
- Glisse-dépose **tous** les fichiers du dossier `passeport/` :
  - `index.html`, `styles.css`, `app.js`, `data.js`, `vocab.js`
  - `manifest.json`, `sw.js`
  - `icon-180.png`, `icon-192.png`, `icon-512.png`
- ⚠️ Envoie les **fichiers eux-mêmes**, pas le dossier qui les contient (à la racine du dépôt on doit voir `index.html` directement).
- Clique **Commit changes**

**3. Active GitHub Pages**
- Dans le dépôt : **Settings** (⚙️) → menu de gauche **Pages**
- Sous **Source**, choisis **Deploy from a branch**
- Branch : **main**, dossier : **/ (root)** → **Save**
- Attends 1-2 minutes. La page affichera :
  *« Your site is live at https://TON-PSEUDO.github.io/passeport/ »*

**4. Ouvre ce lien** — ton app est en ligne. 🎉

> Chaque fois que tu modifies un fichier et fais *Commit*, le site se met à jour tout seul en ~1 min.

---

## Partie 2 — Installer sur iPhone / iPad

L'app est une **PWA** : elle s'ajoute à l'écran d'accueil avec une icône, s'ouvre en plein écran et marche hors ligne.

### Sur iPhone (Safari — important : Safari, pas Chrome)
1. Ouvre ton lien `https://TON-PSEUDO.github.io/passeport/` dans **Safari**
2. Touche le bouton **Partager** (le carré avec la flèche vers le haut, en bas de l'écran)
3. Fais défiler et touche **« Sur l'écran d'accueil »**
4. Touche **Ajouter** en haut à droite
5. L'icône Passeport apparaît sur ton écran d'accueil — ouvre-la comme n'importe quelle app

### Ce que tu gagnes
- Plein écran (pas de barre Safari)
- Icône dédiée
- Fonctionne **hors connexion** une fois ouverte une première fois
- Tes données restent sur ton téléphone

> Note : sur iPhone, l'installation passe **obligatoirement par Safari**. Une fois installée, tu l'ouvres depuis l'écran d'accueil.

---

## Partie 3 — Comment ça marche au quotidien

- **Aujourd'hui** : ta langue du jour (selon ton programme) et tes 3 tâches.
- **Vocab** : révision espacée sur une banque de ~365 mots en anglais et ~380 en espagnol (B1 → C1), classés par thème. Chaque jour : tes révisions + 10 nouveaux mots (réglable), choisis selon ton niveau testé et tes centres d'intérêt.
  - **Trier (rapide)** : écarte en un tap les prochains mots que tu connais déjà.
  - **Ajouter des mots** : fais générer des mots par ChatGPT/Claude sur n'importe quel thème, ou colle ceux de ta dernière conversation. Ils passent en priorité.
  - **Voir et gérer mes mots** : recherche, et suppression des mots qui ne te servent pas.
- **Prompts** : génère un prompt adapté à ton niveau testé + tes passions + tes erreurs, à **copier dans ChatGPT ou Claude** (c'est là que tu fais l'oral fluide, surtout sur iPhone).
- **Progrès** : heures, streak, points faibles.
- **Réglages** : change de programme (anglais seul / bilingue), refais le test, active l'espagnol.

### La boucle vertueuse
1. Tu génères un prompt et tu discutes dans ChatGPT/Claude (oral ou écrit).
2. Tu demandes à l'IA tes 3 erreurs récurrentes (le prompt le fait déjà).
3. Tu les reportes dans **Prompts → Correction → Reporter mes erreurs**.
4. Elles sont réinjectées dans tes prochains prompts : l'IA te pousse dessus jusqu'à ce que ça rentre.
5. L'IA te donne aussi **5 mots à apprendre** issus de la conversation, au format `mot | traduction | exemple`. Copie-les, puis **Vocab → Ajouter des mots → Colle la réponse → Analyser → Ajouter**. Ils arrivent dans tes prochaines sessions de révision.

---

## Partie 4 — Passer à l'espagnol plus tard

Quand tu veux l'activer (sans casser ton élan anglais) :
- **Réglages → Mode** : passe de « Anglais seul » à « Anglais fort + Espagnol 1j » (ou plus).
- Ou touche le **sélecteur de langue** en haut à gauche → Espagnol : un test de niveau espagnol se lance, puis tu as un deck et des prompts en espagnol.

Ton anglais n'est jamais effacé : chaque langue garde sa progression, son niveau et ses erreurs séparément.

---

## Partie 5 — Mettre à jour l'app (ex. passage en v5)

Tes données sont sur ton téléphone, pas dans les fichiers : **mettre à jour ne fait rien perdre** (progression, niveau, erreurs, mots déjà révisés).

1. Sur GitHub, dans ton dépôt : **Add file → Upload files**, glisse **tous** les fichiers du dossier (y compris le nouveau `vocab.js`) → **Commit changes**. GitHub remplace les anciens.
2. Attends 1-2 minutes.
3. Sur l'iPhone : ferme complètement l'app (balaye-la vers le haut dans le sélecteur d'apps), puis rouvre-la. Si l'ancienne version s'affiche encore, refais-le une ou deux fois : la nouvelle version se télécharge en arrière-plan.
4. Vérifie en bas de **Réglages** : tu dois voir « v5 ».

---

## Questions fréquentes

**L'app peut-elle corriger mon anglais toute seule, sans ChatGPT ?**
Non : héberger une IA gratuitement sur GitHub Pages n'est pas possible (pas de serveur). C'est pour ça que l'app **génère des prompts** que tu colles dans ChatGPT/Claude, que tu as déjà. Tu gardes le meilleur des deux : la structure et la mémoire dans l'app, l'IA dans une vraie app vocale.

**Mes données sont-elles en sécurité ?**
Tout est stocké **localement sur ton téléphone** (localStorage). Rien n'est envoyé nulle part. Revers : si tu changes de téléphone ou vides les données Safari, tu repars de zéro.

**Ça marche sur Android aussi ?**
Oui, encore mieux : dans Chrome Android, un bandeau « Installer l'application » apparaît directement.
