Faire bouger un rond dans chrome, et tester qu'il bouge bien
============================================================

Pertinence des animations
-------------------------
+ Aider l'utilisateur à comprendre ce qui se passe ?
+ Esthétique ?
+ Éviter les animations gratuites ...
+ Le pourquoi n'est pas le sujet du slot.
+ Travail d'UX de savoir quand mettre une animation.
+ Le slot s'intéressera plus à la mise en place technique d'une animation.

Pourquoi faire bouger un rond ?
-------------------------------
+ Reproduire une progress bar o------ 0% -> ---o--- 50% -> ------o 100%
+ Reproduire un switch button (o  ) -> ( o ) -> (  o)

Pourquoi tester un rond qui bouge ?
----------------------------------
+ TDD sur des animations, on oublie
+ Uniquement pour de la non régression
+ Éviter un glitch perturbant pour l'utilisateur (TROUVER UN EXEMPLE ?)
+ Un composant qui va être distribué à grande échelle (librairie de composants)
+ Beaucoup d'effort comme évoqué plus tard
+ Une validation par l’œil humain est peut être plus pertinente...
+ Pour le challenge et pour repousser les limites de ce qui est testable, vers l'infini et l'au-delà

Principes d’animations
----------------------
+ Avoir une idée globale de l'animation qu'on va produire, de sa signification, du ressenti qu'elle va transmettre aux utilisateurs.
+ Ressources motion (disney animations principles, material design)

Les notions techniques
----------------------
+ la base, l’interpolation (tween)
+ classique: courbe d'easing
+ autre approche (notamment dans react-motion): utilisation d'un framer (plus de détails si on a le temps)

Mise en place concrète
----------------------

### Commencer avec les animations CSS

**Implémentation**

+ animation CSS accessibles et simple à utiliser
- difficile à rendre dynamique (à lier au js)
- courbes d’easing limitées

**Test**

*Interlude sur les tests de régression visuelle*
+ lourd à mettre en place et potentiellement très lourd à maintenir
+ monde idéal
+ possibilité d'avoir un diff
+ prez' de je sais plus qui
+ jamais vu à l'oeuvre

- Test de régression visuel
	+ Changement d'état
	- Impossible à tester via un snapchot (delay manque de précision)

+ Tester les computedStyles des éléments (initial, final, transitions)
	- peut nécessiter un changement des tests si les sélecteurs changent
	- pas de visualisation des tests efficaces
	- on vérifie l'implémentation plus que le comportement
	+ peut avoir du sens pour éviter un conflit avec d’autres règles CSS

### Gérer les animations en JS

*Interlude sur les performance des animations en JS*
+ Le mythe provient historiquement d'un utilisation abusive de jQuery
+ Les problèmes sont presque les même qu'en CSS (lien vers un article sur les repaint and redraw)
+ Avec WebGl/shader on peut taper du 60 images/sec (montrer des exemples sur shadertoy) mais on s'écarte un peu du js
+ Bref, les animations en JS peuvent être tout aussi performantes voir plus qu'en CSS

**Implémentation**

- un peu plus complexe à mettre en place
- on doit toucher à l'api du DOM
+ courbes d’easing ultra libre
+ dynamiques au besoin

**Test**

+ Au lieu d'ajouter une classe, on appelle directement la fonction animate
+ Toujours possible de tester les computedStyles
- Toujours le même souci avec les tests de régressions visuelles

### Séparation des responsabilités appliquée aux animations

+ On peut séparer la function animate en:
	+ une function de rendu (cursor entre 0 et 1) testable en screenshot juste en appelant la function animate avec des steps réguliers
	+ une function d'easing (cursor entre 0 et 1) testable
	+ une function d’interpolation (duration + easing) testable

### Et tout ça appliqué dans React

Un animation en react, c'est donc :
+ un renderer component
+ un tween component (qui prend une function d’easing en paramètres)

On a plus qu’à tester le rendererComponent avec des steps plus ou moins fréquents

- style inline, mais...

#### Styled Component

Permet de refaire du CSS tout en gardant les avantages de JS

#### React Motion

C’est pareil mais ce qui change c’est le type d’interpolation (tween)

Présenter le principe du stepper + implémentation + testabilité
