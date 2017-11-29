principes d’animations
	ressources motion (disney animations principles, material design)
	la base, l’interpolation (tween)
	classique: easing
	react-motion: framer

animation CSS accessibles mais
	courbes d’easing limitées
	difficile à rendre dynamique (à lier au js)
	Tester :  possible de checker les computedStyles des éléments (initial, final, transitions) mais peut nécessiter un changement des tests si les sélecteurs changent et en plus, on vérifie l'implémentation plus que le comportement (peut avoir du sens pour éviter un conflit avec d’autres règles CSS)
Test de régression visuel : Impossible à tester via un snapchot (delay manque de précision)

animation en JS :
	courbes d’easing ultra libre et dynamiques au besoin
	problèmes de performance ? seulement si mal fait et surtout c’est vrai aussi en CSS (lien vers un article sur les repaint and redraw)
	tester: toujours possible de checker les computedStyles
Mais encore mieux, c’est aussi testable en snapchot en séparant la function de rendu des function d’interpolations (duration et easing)

Avec React :
	Une animation c’est :
un render component
un tween component (qui prend une function d’easing en paramètres)
On a plus qu’à tester le renderComponent avec des steps plus ou moins fréquents	
Et du coup ReactMotion :
	C’est pareil mais ce qui change c’est le type d’interpolation (tween)

	présenter le principe du stepper + implementation

Composition et animation ?
