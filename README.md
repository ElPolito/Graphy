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
Dans tout les cas votre fichier texte doit commencer par spécifier le titre (title).

Voici des exemples pour chacun des types de graphiques ( veillez à bien respecter les retour à la ligne ):
### Histogramme
```
Title : Graphique 6
Annee : 2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010
: 2
Nombre de friteries belges : 1200,1300,1500,1700,1600,1400,1500,1600,1700,1750,1800
Nombre de manchots en Antarctique : 200,400,600,800,1000,1200,1400,1600,1800,2000,1600
From : 200
To : 2000
Step : 200
```
### Courbe
```
Title : Graphique 6
Annee : 2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010
: 2
Nombre de friteries belges : 1200,1300,1500,1700,1600,1400,1500,1600,1700,1750,1800
Nombre de manchots en Antarctique : 700,900,1000,1300,1200,1000,1100,1300,1400,1500,1600
From : 200
To : 2000
Step : 200
```
### Camembert
```
Title : Parts du CA en 2010
Detaillants specialise,Utilisateurs finaux,Entreprises,Administrations,Grande Distribution
45,21,19,9,6 
Highlights : Utilisateurs finaux
```
### Anneau
```
Title : Parts du CA en 2010
Detaillants specialise,Utilisateurs finaux,Entreprises,Administrations,Grande Distribution
45,21,19,9,6 
Highlights : Utilisateurs finaux
```
### Araigné
```
Title : Schema d'orientation
Enjeux internes,Enjeux externes,Facilite d'acces aux connaissances,Criticite des connaissances,Interet du resultat,Integration a l'environnement
: 3
Projet 1 : 80,40,60,20,70,40
Projet 2 : 90,60,20,80,30,60
Projet 3 : 50,20,20,40,40,70
From : 0
To : 100
Step : 20
```

## Les options disponibles
Il existe différentes options que vous pouvez ajouter :
* gr-grid
* gr-grid-ver
* gr-grid-hor
* gr-colors
* gr-points
* gr-area-colors
* gr-curve
* gr-area
* gr-spider
* gr-curve-weight
* gr-shape-size
* gr-pie-radius
* gr-ring-radius
* gr-ring-weight
* gr-border-weight
* gr-border-colors
* gr-margin-left
* gr-margin-right
* gr-margin-top
* gr-margin-bottom
* gr-padding-left
* gr-padding-right
* gr-padding-top
* gr-padding-bottom
* gr-spider-radius
