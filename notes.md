00. Projet disponible sur github
--------------------------------
Pour ceux qui le souhaite, le projet est disponible sur github.

01. Le but du slot
------------------
+ Bonjour, le but du slot va être de faire bouger un rond, et de tester le fait qu'il bouge bien => Tester une animation

02. Pourquoi ?
--------------
+ (l'anim) La pertinence des animations n'est pas le sujet du slot. On va admettre qu'on a besoin de cette animation.
+ (le test) Le but des tests n'est pas de faire du TDD => Mise en place d'une animation = un peu de feeling. Le but est uniquement pour de la non-régression
+ Le slot s'intéressera plus à la mise en place technique d'une animation.
+ Tester de l'UI, c'est compliqué et ça demande beaucoup d'effort (même avec des outils comme sélénium)
+ Probablement à envisager sur des animations critiques (swipe de tinder) ou des librairies de composants
+ Dans les faits, une validation par l’œil humain est peut être plus pertinente...

03. Mais donc, pourquoi ?
-------------------------
+ Spoil, la séparation des responsabilités est une part importante de la solution
+ Cela va nous pousser à comprendre ce qu'est et ce qui compose une animation.
+ Pour le challenge et pour repousser les limites de ce qui est testable, vers l'infini et l'au-delà

04. Quelques ressources
-----------------------
+ Pas le sujet du slot et pas necessaire, mais comprendre quand et comment faire une animation est toujours un plus.
+ Peut aider à comprendre certaines notions abordées plus tard comme les courbes d'easing.
+ Les 12 principes d'animation de Disney
+ Google material design

05. Des animations à 60fps ?
----------------------------
+ Pas le sujet du slot mais 2 choses à retenir
	+ CSS ou JS à assez peu d'influence sur la perf', ce qui joue, ce sont les proprietés animés
	+ transform (scale, rotate, translate) et opacity sont peu couteux est peuvent être utilisés sans craintes. Tout le reste est à utiliser avec parcimonie, voir pas du tout.

06. Animer un rond pour ? (00:08)
-------------------------

Un switch button
Une progress bar

07. Commençons par utiliser CSS
-------------------------------