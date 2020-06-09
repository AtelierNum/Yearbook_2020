/*

Pour cette image libre, j'ai voulu imiter un ordinateur qui subit un bug avec une mutitude de fenètre pop up qui s'ouvrent et qui décomposent l'imageen arrière plan.
L'image source 'img' est d'abord chargée, elle est vierge sans aucun effet. Avec la fonction img.get(), je récupère des échantillons de cette image.
L'image de fenetre pop up est ensuite créer en boucle et l'échantillon vient se placer dedans.

Pour pouvoir donner plus de possibilités à l'utillisateur, j'ai ensuite ajouté des menu.addRange notamment pour changer la taille ou encore le taux d'aléatoire dans l'apparition des fenetres...
L'utillisateur peut choisir que les onglets suivent la souris ou qu'ils soient disposés totalement aléatoirement. 
J'ai ensuite exploité les filters de P5js, parmi ceux qui me plaisaient le plus. Leurs probabilités d'apparition peuvent être choisi par l'utillisateur.
J'ai également ajouté une fonction drag et drop pour changer d'image plus facilement.

En voulant prendre mes captures, j'ai réalisé que mon outil n'était pas très pratique : pour enregistrer une capture ou changer un réglage ou devait bouger la sourie vers la gauche,
et il fallait être très rapide pour pouvoir sauvegardé l'instant que l'on voulait
Cela peut fortement gener l'utilisateur, c'est pourquoi j'ai ajouté 2 keyPressed :
 - s = permet d'enregistrer un png (en plus du addButton) sans avoir a bougé la souris et qui permet de capturer rapidement un moment qui nous semble intéressant.
 - SPACE = permet de mettre en pause ou de relancer l'apparition de fenetre grâce a un variabble boolean (stop)

*/

let img
let onglet
let imgSet
let value = 0

let menu

let stop = false

let params = {
    'size': 1,
    'frameRate': 30,
    'randm': 10,
    "mouse": true,
}

// a boolean to test that an image is effectively loaded 
let imageLoaded = false

function preload() {
    onglet = loadImage('retro.jpg');
    img = loadImage('3.jpg',
        // success callback passed to load image
        function () {
            console.log("image loaded")
            imageLoaded = true // pass the boolean at true to display the image
        }

    )
}

function setup() {
    let c = createCanvas(1500, 1200)
    image(img, 0, 0);

    menu = QuickSettings.create(0, 0, "options")
    menu.addRange("size", 0.1, 1, params.size, 0.1, function (v) {
        params.size = v
    })
    menu.addRange("frameRate", 1, 150, params.frameRate, 1, function (v) {
        params.frameRate = v
    })
    menu.addRange("contenu des fenetres aléatoires", 1, 600, params.randm, 1, function (v) {
        params.randm = v
    })
    menu.addRange("probabilité BLUR", 0, 10, params.aleaBLUR, 0, function (v) {
        params.aleaBLUR = v
    })
    menu.addRange("probabilité THRESHOLD", 0, 10, params.aleaTHRESHOLD, 0, function (v) {
        params.aleaTHRESHOLD = v
    })
    menu.addRange("probabilité INVERT", 0, 10, params.aleaINVERT, 0, function (v) {
        params.aleaINVERT = v
    })
    menu.addRange("probabilité POSTERIZE", 0, 10, params.aleaPOSTERIZE, 0, function (v) {
        params.aleaPOSTERIZE = v
    })
    menu.addRange("probabilité GRAY", 0, 10, params.aleaGRAY, 0, function (v) {
        params.aleaGRAY = v
    })

    menu.addBoolean("mouse", params.mouse, function (v) {
        params.mouse = v
    })
    menu.addButton("render to png", function () {
        save(timestamp() + JSON.stringify(params) + ".png")
    })

    // register a drop event  ie when a user drop an image on the canvas
    // when a drop event is registered => execute the function gotImage
    c.drop(gotImage)

}


// code to run when an image is dropped
function gotImage(file) {
    imageLoaded = false // pass the boolean to false to avoid crashing the program

    // load the new image and pass a succss callback function
    img = loadImage(file.data, function () {
        console.log("new image dropped loeded")
        imageLoaded = true // pass the boolean to true as the image IS loaded
        initPoints() // re-init points
    })
}

function draw() {

    frameRate(params.frameRate)

    if (imageLoaded) {

        if (params.mouse == true) { //positions pour le mode souris activé
            var x1 = mouseX
            var y1 = mouseY
        }

        if (params.mouse == false) { //positions pour le mode souris désactivé
            var x1 = random(width);
            var y1 = random(height);
        }

        if (stop === false) { //fonction boolean pour stopper ou relancer l'apparition des fenetres



            var x2 = x1 + random(-params.randm, params.randm) //positions de la fenetre selon une valeur plus ou moins grande aléatoire choisie
            var y2 = y1 + random(-params.randm, params.randm)

            var x3 = x2 + 7 * params.size  //positions de l'échantillon de l'image dans la fenetre par rapport a la size choisie
            var y3 = y2 + 58 * params.size

            let w = 341 * params.size  //largeur de la fenetre selon la size chosie
            let h = 300 * params.size  //hauteur de la fenetre selon la size chosie

            let psx = img.get(x1, y1, w, h) //créer une variable avec les 4 donnés de la fonction get()



            image(onglet, x2, y2, 368 * params.size, 368 * params.size)

///FILTERS

            let aleaBLUR = random(10)   
            if (aleaBLUR < params.aleaBLUR) { 
                psx.filter(BLUR, 5)
            }
            let aleaTHRESHOLD = random(10)
            if (aleaTHRESHOLD < params.aleaTHRESHOLD) {
                psx.filter(THRESHOLD)
            }

            let aleaINVERT = random(10)
            if (aleaINVERT < params.aleaINVERT) {
                psx.filter(INVERT, 10)
            }
            let aleaPOSTERIZE = random(10)
            if (aleaPOSTERIZE < params.aleaPOSTERIZE) {
                psx.filter(POSTERIZE, 10)
            }
            let aleaGRAY = random(10)
            if (aleaGRAY < params.aleaGRAY) {
                psx.filter(GRAY)
            }

            image(psx, x3, y3) //créer l'échantillon d'image dans la fenetre

        }
    }

}

function keyReleased() {
    if (keyCode === 83) {   // touche 's' = capture png
        save(timestamp() + JSON.stringify(params) + ".png")
    }

    if (keyCode === 32) { // touche 'SPACE' = stop/play
        stop = !stop
    }
    
}


function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}
