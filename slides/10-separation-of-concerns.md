Séparation des responsabilités à la rescousse
=============================================

Basiquement, une animation, c'est :

|                | une **function d’interpolation (tween)** | une **function de rendu (renderer)** | une **function d'easing** |
| -------------- | :--------------------------------------: | :----------------------------------: | :-----------------------: |
| Responsabilité | fait varier une valeur au cours du temps | affiche la valeur interpolée sous une forme graphique | gere l'accéleration de l'interpolation |
| Testabilité    | ✅ | ✅ | ✅ |
| Outils de test | mocks des methodes de gestion du temps (setTimeout, setInterval, Date.now...) | Headless browser, Screenshot & diffing visuel | Test classique ou à base de snapshot |