# Jeu de Pong

Un jeu de Pong classique développé avec HTML, CSS et JavaScript. Ce projet propose un design responsive, permettant d'y jouer sur différents appareils, y compris les ordinateurs, tablettes et mobiles. Le jeu inclut deux raquettes contrôlées par des touches du clavier, une balle qui rebondit sur les raquettes et les murs, ainsi qu'un système de score.

## Fonctionnalités
- **Design Responsive** : S'adapte à différentes tailles d'écran grâce à des unités relatives et des requêtes média.
- **Contrôles au Clavier** :
  - Joueur 1 (Raquette Gauche) : `W` (haut), `S` (bas)
  - Joueur 2 (Raquette Droite) : `Flèche Haut` (haut), `Flèche Bas` (bas)
- **Système de Score** : Compte les points pour chaque joueur lorsque la balle passe la raquette adverse.
- **Animations Fluides** : Utilise `requestAnimationFrame` pour un mouvement fluide de la balle et des raquettes.


## Prérequis
- Un navigateur web moderne (par exemple, Chrome, Firefox, Safari, Edge).
- Aucune dépendance externe ou configuration de serveur requise ; fonctionne directement dans le navigateur.

## Installation
1. Clonez ou téléchargez le dépôt :
   ```bash
   git clone https://github.com/votre-nom-utilisateur/jeu-pong.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd jeu-pong
   ```
3. Ouvrez `index.html` dans un navigateur :
   - Double-cliquez sur `index.html`, ou
   - Utilisez un serveur local (par exemple, `npx serve` ou `python -m http.server`) pour de meilleures performances.

## Utilisation
1. Ouvrez le jeu dans un navigateur.
2. Appuyez sur une touche de contrôle (`Z`, `S`, `Flèche Haut` ou `Flèche Bas`) pour démarrer le jeu.
3. Utilisez le clavier pour déplacer les raquettes :
   - Raquette gauche : `Z` (haut), `S` (bas)
   - Raquette droite : `Flèche Haut` (haut), `Flèche Bas` (bas)
4. Le jeu continue jusqu'à ce qu'un joueur atteigne 5 points, puis affiche le vainqueur.
5. Rafraîchissez la page pour redémarrer le jeu.

## Structure des Fichiers
```
jeu-pong/
├── index.html    # Fichier HTML principal
├── styles.css    # CSS responsive pour le style du jeu
├── script.js     # JavaScript pour la logique du jeu
└── README.md     # Ce fichier
```

## Aperçu du Code
- **HTML (`index.html`)** : Contient un élément `<canvas>` pour le rendu du jeu, avec un message de secours pour les navigateurs non compatibles.
- **CSS (`styles.css`)** :
  - Centre le canvas à l'écran.
  - Utilise des unités `vw`, `vh` et `%` pour la responsivité.
  - Inclut des requêtes média pour ajuster la taille du canvas et des polices sur les petits écrans.
- **JavaScript (`script.js`)** :
  - Gère la logique du jeu, y compris le mouvement des raquettes, la physique de la balle, la détection de collisions et le score.
  - Utilise l'API Canvas pour le rendu.
  - Écoute les événements clavier pour contrôler les raquettes.
  - Implémente une boucle de jeu avec `requestAnimationFrame` pour des mises à jour fluides.

## Design Responsive
- Le canvas s'adapte à la taille de la fenêtre, avec une largeur maximale de 800px et une hauteur de 600px sur les grands écrans.
- Sur les petits écrans (<768px), la largeur du canvas est ajustée à 90% de la largeur de la fenêtre.
- Les tailles des raquettes et de la balle sont proportionnelles aux dimensions du canvas, garantissant une jouabilité cohérente sur tous les appareils.
- Le texte (par exemple, l'affichage du score) utilise `clamp()` pour une taille de police responsive.

## Personnalisation
Pour modifier le jeu, éditez les éléments suivants dans `script.js` :
- **Vitesse du Jeu** : Ajustez `ballSpeed` ou la vitesse des raquettes.
- **Score Gagnant** : Modifiez `maxScore` pour définir une autre condition de victoire.
- **Couleurs** : Changez les appels de dessin du canvas (par exemple, `fillStyle`) pour modifier les couleurs des raquettes, de la balle ou de l'arrière-plan.
- **Taille du Canvas** : Mettez à jour `canvas.width` et `canvas.height` dans `script.js` et les règles CSS correspondantes.

## Limitations Connues
- Pas de contrôles tactiles pour les appareils mobiles (uniquement clavier).
- Pas de fonctionnalité de pause/reprise.
- Mode solo (adversaire IA) non implémenté.

## Améliorations Futures
- Ajouter des contrôles tactiles pour jouer sur mobile.
- Implémenter un mode solo avec un adversaire IA.
- Inclure des effets sonores pour les rebonds de la balle et les points marqués.
- Ajouter un menu de démarrage/pause.


## Remerciements
- Inspiré du jeu Pong classique d'Atari.
- Développé avec JavaScript, HTML et CSS natifs à des fins éducatives.
