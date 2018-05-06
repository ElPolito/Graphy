# Graphy
Graphy est une bibliothèque Javascript permettant d'afficher des graphiques sur vos pages HTML à partir d'un simple fichier texte !

## Intégration
Pour intégrer Graphy dans vos pages HTML ajoutez les deux lignes suivantes dans la balise Head :
```
<script type="text/javascript" src="Graphy.js"></script>
<link rel="stylesheet" href="Graphy.css"/>
```
C'est tout vous pouvez maintenant commencer !

## Les différents graphiques
Graphy permet de créer différents types de graphiques :
* Histogramme ( graphy-histo )
* Courbe ( graphy-curve )
* Camembert ( graphy-pie )
* Anneau ( graphy-ring )
* Araigné ( graphy-spider )

Dans tout les cas la mise en place est la même :
```
<div graphy-histo graphy-link="text.txt"></div>
```
Vous ajoutez l'attribut correspondant sur l'élément receveur et l'attribut **graphy-link** pour spécifier le fichier texte sur le serveur associé ( le fichier qui contient les données ).

## Les fichiers de données (fichier texte)

