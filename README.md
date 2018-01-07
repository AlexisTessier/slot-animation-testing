# 00.md
Projet disponible sur github
============================

[https://github.com/AlexisTessier/slot-animation-testing](https://github.com/AlexisTessier/slot-animation-testing)
# 01.md
Le but du slot
==============

+ Faire bouger un rond dans chrome
+ Tester qu'il bouge bien

Bref, le but va être de **tester une animation**

+ **Tache complexe** à automatiser
# 02.md
Pourquoi tester un animation ?
==============================

+ Tests de non régression uniquement (**Pas de TDD**).
---
+ Dans les faits, une validation humaine est peut être plus pertinente...
+ Envisager l'automatisation des tests d'animations :
	+ sur des **animations critiques** (UX)
	+ sur une **librairie de composants**
---
+ Pour le challenge et pour **repousser les limites de ce qui est testable...**

![Vers l'infini et l'au-delà](https://github.com/AlexisTessier/slot-animation-testing/blob/master/assets/buzz.gif?raw=true)
# 03.md
Comment on fait ça ?
====================

+ Spoiler: La **séparation des responsabilités** va nous aider
+ Mieux comprendre ce qu'est une animation
# 04.md
Quelques ressources
===================

#### [Les 12 principes d'animation de Disney](https://fr.wikipedia.org/wiki/12_principes_de_base_de_l%27animation)

+ [Une vidéo fort sympathique ma foi : https://vimeo.com/93206523](https://vimeo.com/93206523)
+ [Une autre vidéo rapide : https://vimeo.com/112435401](https://vimeo.com/112435401)
+ [Une vidéo qui **explique plus en détails** un peu plus chaque principe : https://www.youtube.com/watch?v=uDqjIdI4bF4](https://www.youtube.com/watch?v=uDqjIdI4bF4)

#### [Google material design](https://material.io/guidelines/)

+ [La partie sur le motion, pas piquée des hannetons : https://material.io/guidelines/motion/material-motion.html](https://material.io/guidelines/motion/material-motion.html)
# 05.md
Des animations à 60fps ?
========================

+ Les propriétés animées sont plus importantes que le fait d'utiliser du CSS ou du JS
+ Les propriétés **transform** et **opacity** peuvent être utilisées sans crainte.
+ Avec transform, on peut:

| **Scale** | **Rotate** | **Translate** |
| --------- | ---------- | ------------- |
| ![transform scale](https://raw.githubusercontent.com/AlexisTessier/slot-animation-testing/master/assets/transform-scale.png) | ![transform rotate](https://raw.githubusercontent.com/AlexisTessier/slot-animation-testing/master/assets/transform-rotate.png) | ![transform translate](https://raw.githubusercontent.com/AlexisTessier/slot-animation-testing/master/assets/transform-translate.png) |

# 06.md
Animer un rond pour ?
=====================

| Un switch button | Une progress bar |
| ---------------- | ---------------- |
| ![switch button type iOS](https://raw.githubusercontent.com/AlexisTessier/slot-animation-testing/master/assets/switch.gif) | ![progress bar type facebook](https://raw.githubusercontent.com/AlexisTessier/slot-animation-testing/master/assets/progress-bar.png) |
# 07.md
Plusieurs pistes
================

+ Dans tous les cas, on utilise un **snapshot**
+ [**Test de régression visuel** : https://www.youtube.com/watch?v=1wHr-O6gEfc](https://www.youtube.com/watch?v=1wHr-O6gEfc) (peut sembler un poil complexe mais en fait 👍)
+ Tester les computedStyles des éléments (peut sembler plus simple mais en fait 😢)
+ Dans les 2 cas, la **complexité provient du pilotage du navigateur** via le code, pas tant du système de diff utilisé (image vs computed styles)
# 08.md
Commençons par utiliser CSS
===========================

+ 👍 animation CSS accessibles et simple à utiliser
+ 😢 impossible de tester l'animation car les snapshots manquent de précision (délai irréductible entre le début de l'animation et le moment où on fait effectivement la mesure)

---

+ 😢 difficile à rendre dynamique (à lier au js)
+ 😢 courbes d’easing limitées

**Tester l'UI est moins compliqué que prévu dans ce cas, car il ne s'agit pas de tests End to end.**
# 09.md
Gérer les animations en JS
==========================

+ 😢 un peu plus complexe à mettre en place (mais pas tant que ça donc 👍 en fait)
+ 😢 Toujours impossible de tester l'animation pour les même raisons

---

+ 👍 dynamiques au besoin
+ 👍 courbes d’easing ultra libres

**On a besoin de pouvoir faire des screenshots de l'animation à des étapes régulières et précises.**
# 10.md
Séparation des responsabilités à la rescousse
=============================================

Basiquement, une animation, c'est :

|                | une **fonction d’interpolation (tween)** | une **fonction de rendu (renderer)** | une **fonction d'easing** |
| -------------- | :--------------------------------------: | :----------------------------------: | :-----------------------: |
| Responsabilité | fait varier une valeur au cours du temps | affiche la valeur interpolée sous une forme graphique | gère l’accélération de l'interpolation |
| Testabilité    | ✅ | ✅ | ✅ |
| Outils de test | mocks des méthodes de gestion du temps (setTimeout, setInterval, Date.now...) ou en directement d'une méthode de tween tierce | Headless browser, Screenshot & comparaison (diffing) visuel | Test classique ou à base de snapshot |
# 11.md
Entre autres choses...
======================

### 🤔 Mais du coup ...

...on ne pourrait pas juste mocker les méthodes de gestion du temps dés le début ?

+ Oui, on pourrait...
+ Mais ça ne fonctionne toujours que si l'animation est gérée en js...
+ Et puis la séparation des responsabilités, c'est important !

### Note sur React motion ?

[React motion](https://github.com/chenglou/react-motion) ne gère pas ses interpolations de manière classique.

+ Il n'utilise pas de notion d'easing.
+ On ne choisit pas la durée de l'interpolation.
+ À la place, on donne une rigidité et une élasticité à l'élément à animer.
+ React motion s'occupe ensuite, frame par frame d'interpoler la valeur jusqu'à sa valeur finale.
