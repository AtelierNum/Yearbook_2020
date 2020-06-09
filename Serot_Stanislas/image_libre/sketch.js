// Au départ je voulais afficher des dessins en trait, ce qui après plusieurs essaies différents a été non concluent
// J'ai donc essayé une manière différente de le faire
// Je n'ai pas le résultat voulu, mais je trouve quand même ces représentations intéressantes car elles ne seront jamais pareil selon l'image
// Le problème est qu'on ne reconnait pas toujours les formes de l'image utilisée
// Je n'arrive pas à faire +, j'ai essayé pleins de combinaisons mais le programme plante (taille de l'image utilisée je pense)

let menu // Permettre la création d'un menu


numPoints = 1000; //nombre de points dans le caneva (au dessus ça devient compliqué d'afficher quelque chose)
linkDist = 50; // distances entre les différents points, longueur du lien
images = ["chap.png","bat.jpeg","rond2.png"]; //les images qu'on peut utiliser (je ne sais pas pourquoi ça ne marche pas bien avec toutes
points = [];

//paramètres pour le menu
let params = {
    'nmb': 500,
    'linkDist': 10,
}

function preload() {
	img = loadImage(images[2]); // charge l'image au choix 
	img.resize(100,100)
	img.loadPixels(); // permettre le changement en trait de l'image
}

function setup() {
	createCanvas(800,800); //réduire l'espace de travail pour les images trop grandes
	background(225); // fond blanc

	//création d'un bandeau menu
	menu = QuickSettings.create(0, 0, "options")

	        //enregistrer en png
	menu.addButton("export png", function () {
		save(timestamp() + canvas + ".png")
	})

	        // Mise à part l'export PNG, aucune des fonctions n'est fonctionnelle, je pense à cause du redraw
            // Nombre dde points sur le canvas
    menu.addRange("Nombre de points", 100, 2000, params.nmb, function (v) {
		params.nmb = v
	})

            // Longueur des liens
	menu.addRange("Longueur des liens", 5, 50, params.linkDist, function (v) {
		params.linkDist = v
	})	
	 
	        //J'ai tenté une fonction redraw mais elle ne fonctionne pas, mal configurée je pense
	menu.addButton("redraw", function () {
		//Canvas(800,800)
		calc()
        background(255)
        noFill()
        redraw()
	})


    
}

function calc(){
	background(255)
	// chargement des pixels 
	loadPixels();
	while (points.length < numPoints){ // relancer cette section du programme plusieurs fois pour rendre le visuel plus intense en noir (comme un copié/collé jusqu'au noir profond)
		px = random(width); // pixel aléatoire sur la largeur de l'image
		py = random(height); // pixel aléatoire sur la longueur de l'image
		c = img.get(px, py); // Les pixels crées par rapport aux pixels de l'image
		if (c[0] <= 100){ //changer la valeur[] par l'image voulue // concentration/ densité des pixels (100 étant la valeur la plus rapide à visualiser et la moins chargée)
			//point(px, py);
			points.push({
				x:px,
				y:py,
				c:c[1] // changer la valeur[] par l'image voulue
			});
		}
	}
}

// Pour relier les traits
function draw() {
	for (i = 0; i < points.length; i++){ // distance entre les pixels i
		for (j = i; j < points.length; j++){ // distances entre les pixels j 
			d = dist(points[i].x, points[i].y, points[j].x, points[j].y); // d = distance entre les pixels aléatoires x et y défini plus haut selon la longueur i et j du lien
			if ( d <= linkDist){ // si la longueur d  entre les points est égale ou inférieur stricte à 50
				h = points[i].c + points[j].c; // h (le trait) = la distance entre i et j par rapport aux pixels crées
				strokeWeight( h / (255 * d)); // opacité du tracé
				line(points[i].x, points[i].y, points[j].x, points[j].y); // création du lien
			}
		}
	}
}

//date en temps réel quand le programme est actif
function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}

//StanislasSEROT