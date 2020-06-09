
// Image à inmprimer sur l'axidraw
// Image chargée
let img;
// Menu de configuration des parametres de dessin
let menu;
// Paramètres de dessin
let params = {
    'mult': 5,
    'opacity': 128,
    'strokeW': 0.5,
    'curves': true,
    'curveTightness': 1, 
    'nS' : 5364,
    // Couleur de fond (R)
    'backgroundcolorr': 200,
    // Couleur de fond (G)
    'backgroundcolorg': 200,
    // Couleur de fond (B)
    'backgroundcolorb': 250,
    // Première couleur de dégradé du dessin (R)
    'fillcolor1r': 200,
    // Première couleur de dégradé du dessin (G)
    'fillcolor1g': 100,
    // Première couleur de dégradé du dessin (B)
    'fillcolor1b': 200,
    // Deuxième couleur de dégradé du dessin (R)
    'fillcolor2r': 100,
    // Deuxième couleur de dégradé du dessin (G)
    'fillcolor2g': 200,
    // Deuxième couleur de dégradé du dessin (B)
    'fillcolor2b': 100
}
// Couleur de fond 
let backgroundcolor;
// Première couleur de dégradé du dessin
let fillcolor1;
// Deuxième couleur de dégradé du dessin
let fillcolor2;

function preload() {
    // Chargement de l'image
    img = loadImage('planche-ny.jpg');
    // Redimensionnement de la taille de l'image
    img.resize(100, 100) 
}

function setup() {
    // Création du menu des paramètres
    menu = QuickSettings.create(0, 0, "options");
    // Bouton pour exporter le dessin en PNG
    menu.addButton("export PNG", function () {
        // Création du dessin à exporter
        createCanvas(1000, 1000)
        myDrawing()
        // Export du dessin
        save(timestamp()+"png")
   })
    // Paramètre pour changer le taux de déformation de l'image
    menu.addRange("item multiplier", 1, 20, params.mult, .1, function (v) {
        params.mult = v
    })
    // Paramètre pour changer l'opacité des traits de dessin
    menu.addRange("opacity", 0, 255, params.opacity, 1, function (v) {
        params.opacity = v
    })
    // Paramètre pour changer l'épaisseur des traits de dessin
    menu.addRange("stroke weight", 0, 10, params.strokeW, 0.1, function (v) {
        params.strokeW = v
    })
    // Paramètre pour activer/désactiver le dessin de traits courbés
    menu.addBoolean("curves", params.curves, function (v) {
        params.curves = !params.curves
    });
    // Paramètre pour l'étanchéité de la courbe du trait
    menu.addRange("curves tightness", -10, 10, params.curveTightness, 0.1, function (v) {
        params.curveTightness = v
    })
    // Paramètre pour ajouter du bruit au dessin
    menu.addRange("noise seed", 0, 10000, params.nS, 1, function (v) {
        params.nS = v
        noiseSeed(params.nS)
    })
    // Paramètre pour sélectionner la couleur du fond du dessin (R)
    menu.addRange("background color (R)", 0, 255, params.backgroundcolorr, 1, function (v) {
        params.backgroundcolorr = v
    })
    // Paramètre pour sélectionner la couleur du fond du dessin (G)
    menu.addRange("background color (G)", 0, 255, params.backgroundcolorg, 1, function (v) {
        params.backgroundcolorg = v
    })
    // Paramètre pour sélectionner la couleur du fond du dessin (B)
    menu.addRange("background color (B)", 0, 255, params.backgroundcolorb, 1, function (v) {
        params.backgroundcolorb = v
    })
    // Paramètre pour sélectionner la première couleur de dégradé du dessin (R)
    menu.addRange("fill color 1 (R)", 0, 255, params.fillcolor1r, 1, function (v) {
        params.fillcolor1r = v
    })
    // Paramètre pour sélectionner la première couleur de dégradé du dessin (G)
    menu.addRange("fill color 1 (G)", 0, 255, params.fillcolor1g, 1, function (v) {
        params.fillcolor1g = v        
    })
    // Paramètre pour sélectionner la première couleur de dégradé du dessin (B)
    menu.addRange("fill color 1 (B)", 0, 255, params.fillcolor1b, 1, function (v) {
        params.fillcolor1b = v   
    })
    // Paramètre pour sélectionner la deuxième couleur de dégradé du dessin (R)
    menu.addRange("fill color 2 (R)", 0, 255, params.fillcolor2r, 1, function (v) {
        params.fillcolor2r = v
    })
    // Paramètre pour sélectionner la deuxième couleur de dégradé du dessin (G)
    menu.addRange("fill color 2 (G)", 0, 255, params.fillcolor2g, 1, function (v) {
        params.fillcolor2g = v        
    })
    // Paramètre pour sélectionner la deuxième couleur de dégradé du dessin (B)
    menu.addRange("fill color 2 (B)", 0, 255, params.fillcolor2b, 1, function (v) {
        params.fillcolor2b = v   
    })
    // Création du dessin
    createCanvas(1000, 1000)
    // Densité/Dureté des traits de dessin
    pixelDensity(1)
    // Ajout du bruit
    noiseSeed(params.nS)
}

function draw() {
    myDrawing()
}

function myDrawing() {
    // Initialisation de la couleur de fond en fonction des paramètres du menu correspondants
    backgroundcolor = color(params.backgroundcolorr, params.backgroundcolorg, params.backgroundcolorb)
    // Initialisation de la première couleur de dégradé du dessin en fonction des paramètres du menu correspondants
    fillcolor1 = color(params.fillcolor1r, params.fillcolor1g, params.fillcolor1b)
    // Initialisation de la deuxième couleur de dégradé du dessin en fonction des paramètres du menu correspondants
    fillcolor2 = color(params.fillcolor2r, params.fillcolor2g, params.fillcolor2b)

    // Dessin du fond 
    background(backgroundcolor)      
    // Epaisseur du trait en fonction du paramètre dans le menu correspondant
    strokeWeight(params.strokeW)
    // Couleur et opacité du trait en fonction du paramètre dans le menu correspondant
    stroke(0, params.opacity)
    // Etanchéité de la courbe du trait en fonction du paramètre dans le menu correspondant
    curveTightness(params.curveTightness)

    // Dessin de l'image avec des lignes verticales de 1 à la taille de l'image en pixel
    for (let i = 0; i < img.width; i++) {
        // for the vertical lining we will create a shape to link points togeteher vertically
        beginShape()
        // Couleur du trait (=dégradé horizontal de la première à le deuxième couleur définie dans les paramètres)
        fill(lerpColor(fillcolor1, fillcolor2, i/img.width))
        // Dessin de chaque pixel de la ligne verticale
        for (let j = 0; j < img.height; j++) {
            // get image color
            let col = img.get(i, j)
            let gray = (red(col) + green(col) + blue(col)) * 0.33

            // remap the position of pixels to fill the whole canvas
            let xpos = map(i, 0, img.width, 0, width)
            let ypos = map(j, 0, img.height, 0, height)

            // get the grasp of the space between to pixels in the real canvas
            let tileSize = width / img.width

            // calculate the horizontal displacement
            let xOffset = map(noise(gray / 255), 0, 1, -tileSize * params.mult, tileSize * params.mult)

            // draw a curve or a line according to a parameter
            if (params.curves) {
                curveVertex(xpos + xOffset, ypos)
            } else {
                vertex(xpos + xOffset, ypos)
            }
        }
        endShape(CLOSE) // close our shape to get a filling
        // notice this gets closed for each vertical line - there is one bracket below
        // that corresponds to our first for loop
    }

}

// Génération du nom du dessin sauvegardé
function timestamp() {
    return nf(year(),4,0) + "-" +nf(month(),2,0) + "-" + nf(day(),2,0) + "-" 
            + nf(hour(),2,0) + "h" + nf(minute(),2,0) + "m" + nf(second(),2,0) + "s"
}