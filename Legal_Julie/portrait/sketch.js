//l'idée est de dessiné un portrait avec des lignes, ici sous forme de cercle et en une seule couleur afin de pouvoir imprimé le rendu svg avec l'axidraw.

// Tableau qui contient les valeurs de calcul des lignes

var circles = []
// Nombre de lignes dessinés en même temps
// J'ai souhaité que celui-ci ne soit pas trop élévé afin que le dessin ne soit pas trop réaliste
var total = 70 
// Image à reproduire
var img;
// Menu d'export SVG
let menu;

function preload() {
        // Chargement de l'image à reproduire
    img = loadImage('ju1.jpg');
}

function setup() { 
     // Taille du dessin
    createCanvas(1000, 1000);
    // Couleur de fond du dessin
    fill(200);
    // Couleur de fond du dessin
    background(255);
    // Initialisation des données de calcul pour le parcours des différentes lignes de dessin

    //données de calcul du parcours des différents traits
    for (var i = 0; i < total; i++) {
        circles[i] = {};
        // Position de départ du début la ligne

        circles[i].prevPos = {
            x: width / 2,
            y: height / 2
        }
        circles[i].pos = {
            x: width / 2,
            y: height / 2
        }
      // Direction de dessin du cercle calculée de façon aléatoire (soit 1 dans le sens horaire pour ou -1 pour l'inverse)
        circles[i].dir = random() > 0.5 ? 1 : -1
     // Rayon du cercle dessiné calculé de façon aléatoire (entre 3 et 10)
        circles[i].radius = random(3, 10)
      // Angle qui indique la position actuelle de la fin de la ligne sur le cercle
        circles[i].angle = 0
    }
    
    //création menu pour exporter en SVG
    menu = QuickSettings.create(0, 0, "options")
    menu.addButton("export SVG", function () {
           // Création du dessin
        createCanvas(width, height, SVG);
        for (let i = 0; i < 1000; i++) {
            draw();
        }
      // Sauvegarde du dessin
        save(timestamp()); // give file name
        window.location.reload(0)
    })
}

function draw() {
     // Mise à jour de chaque ligne
    for (var i = 0; i < total; i++) { 
        var circle = circles[i]
        circle.angle += 1 / circle.radius * circle.dir
     // Mise à jour de la position de la fin de la ligne
        circle.pos.x += cos(circle.angle) * circle.radius
        circle.pos.y += sin(circle.angle) * circle.radius
           // Si la couleur de fond correspondant à la position de la ligne est claire ou que la ligne dépasse du dessin :
        if (brightness(img.get(round(circle.pos.x), round(circle.pos.y))) > 65 || circle.pos.x < 0 || circle.pos.x > width || circle.pos.y < 0 || circle.pos.y > height) {
           //chiffre assez élevé pour qu'il dessine les sourcils, mais pas de trop pour éviter qu'il y est trop de traits
          // Mise à jour de la direction de la ligne
            circle.dir *= -1
          // Mise à jour du rayon du cercle tracé
            circle.radius = random(0, 10)//nombre de trait
          // Mise à jour de la position du trait sur le cercle tracé
            circle.angle += PI*1//angle du cercle
        }

        // Si la couleur de fond correspondante à la position de la ligne est foncée, alors on dessine :
        if (brightness(img.get(round(circle.pos.x), round(circle.pos.y))) < 45) {//Chiffre pour dessiner bien les deux youx
             // Epaisseur de la ligne
            strokeWeight(1);
            // Couleur de la ligne (noir)
            stroke(0)
            // Dessin de la ligne
            line(circle.prevPos.x, circle.prevPos.y, circle.pos.x, circle.pos.y) //dessine les traits
        }

        // Mise à jour des données du début la ligne
        circle.prevPos.x = circle.pos.x //mise à jour des données du calcul
        circle.prevPos.y = circle.pos.y
    }
}

// Génération du nom du dessin sauvegardé
function timestamp() {
    return "photo-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}