# 00-dispo-sur-github.md
Projet disponible sur github
============================

[lien vers le repo](dsf)
# 01-quoi.md
Le but du slot
==============

+ Faire bouger un rond dans chrome
+ Tester qu'il bouge bien

Bref, le but va être de **tester une animation**

+ **Tache complexe** à automatiser.
# 02-pourquoi.md
Pourquoi tester un animation ?
==============================

+ Tests de non régression uniquement (**Pas de TDD**).
+ Dans les faits, une validation humaine est peut être plus pertinente...
---
+ À envisager sur des animations critiques (UX) ou sur une **librairie de composants**
---
+ Pour le challenge et pour **repousser les limites de ce qui est testable...**

![Vers l'infini et l'au-dela](../assets/buzz.gif)
# 03-comment.md
Comment on fait ça ?
====================

+ Spoil: La **séparation des responsabilités** peut nous aider
+ Mieux comprendre ce qu'est une animation
# 04-ressources.md
Quelques ressources
===================

#### [Les 12 principes d'animation de Disney](https://fr.wikipedia.org/wiki/12_principes_de_base_de_l%27animation)

+ [Une video fort sympathique ma foi : https://vimeo.com/93206523](https://vimeo.com/93206523)
+ [Une autre video rapide : https://vimeo.com/112435401](https://vimeo.com/112435401)
+ [Une video qui **explique plus en détails** un peu plus chaque principe : https://www.youtube.com/watch?v=uDqjIdI4bF4](https://www.youtube.com/watch?v=uDqjIdI4bF4)

#### [Google material design](https://material.io/guidelines/)

+ [La partie sur le motion, pas piquée des hannetons : https://material.io/guidelines/motion/material-motion.html](https://material.io/guidelines/motion/material-motion.html)
# 05-perf.md
Des animations à 60fps ?
========================

+ Les propriétés animées sont plus importantes que le fait d'utiliser du CSS ou du JS
+ Les propriétés **transform** et **opacity** peuvent être utilisés sans craintes.
+ Avec transform, on peut:

| **Scale** | **Rotate** | **Translate** |
| --------- | ---------- | ------------- |
| ![transform scale](../assets/transform-scale.png) | ![transform rotate](../assets/transform-rotate.png) | ![transform translate](../assets/transform-translate.png) |

# 06-animer-un-rond.md
Animer un rond pour ?
=====================

| Un switch button | Une progress bar |
| ---------------- | ---------------- |
| ![switch button type iOS](../assets/switch.gif) | ![progress bar type facebook](../assets/progress-bar.png) |
# 07-plusieurs-pistes.md
Plusieurs pistes
================

+ Dans tous les 2 cas, on utilise un **snapshot**
+ Tester les computedStyles des éléments (peut sembler plus simple mais en fait 😢)
+ [**Test de régression visuel** : https://www.youtube.com/watch?v=1wHr-O6gEfc](https://www.youtube.com/watch?v=1wHr-O6gEfc) (peut sembler un poil complexe mais en fait 👍)
+ Dans les 2 cas, la **complexité provient du pilotage du navigateur** via le code, pas tant du systeme de diff utilisé (image vs computed styles)
# 08-just-css-conclusion.md
Commençons par utiliser CSS
===========================

+ 👍 animation CSS accessibles et simple à utiliser
+ 😢 impossible de tester l'animation car les snapchots manquent de precision
+ 😢 difficile à rendre dynamique (à lier au js)
+ 😢 courbes d’easing limitées
# 09-en-js.md
Gérer les animations en JS
==========================

+ 😢 un peu plus complexe à mettre en place (mais pas tant que ça donc 👍 en fait)
+ 😢 Toujours impossible de tester l'animation pour les même raisons
+ 👍 dynamiques au besoin
+ 👍 courbes d’easing ultra libres

**On a besoin de pouvoir faire des screenshot de l'animation à des étapes régulieres et précises.**
# 10-separation-of-concerns.md
Séparation des responsabilités à la rescousse
=============================================

Basiquement, une animation, c'est :

|                | une **function d’interpolation (tween)** | une **function de rendu (renderer)** | une **function d'easing** |
| -------------- | :--------------------------------------: | :----------------------------------: | :-----------------------: |
| Responsabilité | fait varier une valeur au cours du temps | affiche la valeur interpolée sous une forme graphique | gere l'accéleration de l'interpolation |
| Testabilité    | ✅ | ✅ | ✅ |
| Outils de test | mocks des methodes de gestion du temps (setTimeout, setInterval, Date.now...) | Headless browser, Screenshot & diffing visuel | Test classique ou à base de snapshot |
# 11-more.md
Entre autres choses...
======================

### 🤔 Mais du coup ...

...on pourrait pas juste mocker les methodes de gestion du temps dés le début ?

+ Oui, on pourrait...
+ Mais ça ne fonctionne toujours que si l'animation est gérée en js...
+ Et puis la séparation des responsabilités, c'est important !

### Note sur React motion ?

[React motion](https://github.com/chenglou/react-motion) ne gère pas ses interpolations de maniere classique.

+ Il n'utilise pas de notion d'easing.
+ On ne choisit pas la durée de l'interpolation.
+ À la place, on donne une rigidité et une élasticité à l'élément à animer.
+ React motion s'occupe ensuite, frame par frame d'interpoler la valeur jusqu'à sa valeur finale.
