//Ce code est un code de tissage de portrait. On charge l'image du code en modifiant à la ligne 18 pour charger l'image souhaiter.
//Dès que nous exécutons le programme grâce à la ligne 49-69 nous avons ajouter des bouttons pour gérer 3 différentes couches de couleurs 
//pour ensuite exporter en SVG. Les couleurs sont gérer dans l'image avec les lignes 120-136 se sont des conditions qui permette de définir le choix du bleu, du rouge , ou du blanc.
//Si la luminosité dépasse 70 alors notre couleur sera rouge, si la saturation est supérieur à 10 alors elle sera bleue sinon elle sera blanche.
//L'utilisateur peut aussi  varier les formes avec les randoms situé aux lignes 98 et 112 et aussi en modifiant les valeurs situé à la 91 en modifiant le "20" qui modifie la forme de départ avec un angle
//et la ligne 98 modifie la direction des tracés (on peut jouer avec des valeurs entre 0 et 2).



var circles = []
var total = 300   // vitesse d'éxécution  
var img;
var svgExport = false
let menu

let params = {         // déclaration des  variables pour les différentes couches
	"layer1": true,
	"layer2": true,
	"layer3": false
}

function preload() {
	img = loadImage('c.jpg');
}

function setup() {
	createCanvas(1000, 1000);
	//img.resize=(100,100);

	background(255);

	for (var i = 0; i < total; i++) {
		circles[i] = {};

		var xpos = random(width)
		var ypos = random(height)
		circles[i].prevPos = {
			x: xpos,
			y: ypos
		}
		circles[i].pos = {
			x: xpos,
			y: ypos
		}
		circles[i].dir = random() > 1 ? 1 : -1
		circles[i].radius = random(3, 1)
		circles[i].angle = 64
	}
	menu = QuickSettings.create(0, 0, "options")

	menu.addBoolean("layer1", params.layer1, function (v) {  //création et gestion des couches de couleurs 
		params.layer1 = v
	})
	menu.addBoolean("layer2", params.layer2, function (v) {
		params.layer2 = v
	})
	menu.addBoolean("layer3", params.layer3, function (v) {
		params.layer3 = v
	})

	menu.addButton("render to svg", function () {
		
		createCanvas(width, height, SVG); // create an SVG drawing context
		for (let i = 0; i < 600; i++) {  // la valeur 600 est le temps à partir le svg va se télécharger
			render(); // do the drawing
		}
		save(timestamp()); // give file name and save it
		
		window.location.reload(0) // reload the window to destroy the svg context

	});
}


function draw() {
	if (frameCount > 600) return
	if (!svgExport) {
		render()
	}



}




function render() {

	for (var i = 0; i < total; i++) {
		var circle = circles[i]
		circle.angle += 20 / circle.radius * circle.dir  //gère la forme des tracés 
		 
		
		circle.pos.x += cos(circle.angle) * circle.radius
		circle.pos.y += sin(circle.angle) * circle.radius

		circle.dir *= -2
		circle.radius = random(7,15)
		circle.angle += PI*1.5  //gère la direction des tracés
		if (circle.pos.x < 0 || circle.pos.x > width || circle.pos.y < 0 || circle.pos.y > height) {
			var xpos = random(width)
			var ypos = random(height)
			circles[i].prevPos = {
				x: xpos,
				y: ypos
			}
			circles[i].pos = {
				x: xpos,
				y: ypos
			}
			circle.dir *= -0.3
			circle.radius = random(7,15)
			circle.angle += PI
		}

		//stroke(img.get(circle.pos.x, circle.pos.y))



		if (brightness(img.get(round(circle.pos.x), round(circle.pos.y))) > 70  || circle.pos.x < 70 ||circle.pos.x > width ||circle.pos.y < 70 || circle.pos.y > height ) { // si la luminosité supérieur à 70
			if (params.layer1 == true) { //si la luminosité est supérieur à 70
				strokeWeight(0.5) // épaisseur du trait
				stroke(255, 0, 0) // c'est rouge 
                line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y)
			}
		} else if (saturation(img.get(round(circle.pos.x), round(circle.pos.y))) > 10) { // si saturation supérieur à 10 alors la couleur va dans le bleu
			if (params.layer2 == true) {
				strokeWeight(0.5)	
							
				stroke(0, 0, 255)
				line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y)
			}
		} else { // sinon c'est blanc 
			if (params.layer3 == true) { 
				strokeWeight(0.5)
                line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y)
				
				stroke(255, 255, 255)
			}
		}


		

		circle.prevPos.x = circle.pos.x
		circle.prevPos.y = circle.pos.y

	}


	//line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y)

}

function timestamp() {
	return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
		nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}