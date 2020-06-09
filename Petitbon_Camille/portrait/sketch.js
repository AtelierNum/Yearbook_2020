let img
let menu

let params = {
    'graisse': 2, // Paramètre du premier bouton
    "layer1": true, // Paramètre du premier bouton
    "layer2": true, // Paramètre du premier bouton

}


function preload() {
    img = loadImage("PHOTO D IDENTITE.jpg", // pour charger l'image
        function () {
            console.log("image loader")
            img.resize(40, 40) // on redimensionne l'image à 40 pour qu'il y ait moins de détails
        })
}

function setup() {
    createCanvas(500, 500) // taille de l'image à l'écran
    pixelDensity(1)

    menu = QuickSettings.create(0, 0, "options")
    // settings.addRange(title,min,max,value,step,callback)

    menu.addRange("Graisse", 0, 20, params.graisse, 0.1, function (v) { // bouton graisse
        params.graisse = v

    })

    menu.addBoolean("layer1", params.layer1, function (v) { // bouton layer1
        params.layer1 = v
    })
    menu.addBoolean("layer2", params.layer2, function (v) { // bouton layer1          
        params.layer2 = v
    })


    menu.addButton("export SVG", function (v) { // bouton export svg
        createCanvas(500, 500, SVG) // taille de l'image à l'écran
        myDrawing() 
        save(timestamp() + ".svg")
        window.location.reload(0)
    })


}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(255, 255, 255)

    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) { // parcours tous les pixels de l immage. Si i = 0, on parcours j

            let col = img.get(i, j) // on met la couleur du pixel dans col

            let r = red(col)
            let g = green(col)
            let b = blue(col)

            let hu = hue(col) // valeur entre 0 et 255
            let sa = saturation(col) // valeur entre 0 et 255
            let br = brightness(col) // valeur entre 0 et 255


            let xpos = map(i, 0, img.width, 0, width)
            let ypos = map(j, 0, img.height, 0, height)

            let len = width / img.width; // calcule la longueur de la ligne

            let sw = map(hu, 0, 100, 10, 0.1)

            strokeWeight(params.graisse) // épaisseur des lignes réglable avec le bouton


            if (params.layer1 == true) { // affiche les lignes obliques (0,1) bas gauche > haut droit
                if (g > 150) { // seuil des pixels g 

                    stroke(30, 150, 200)
                    line(xpos, ypos, xpos + len, ypos + len)
                }
            }


            if (params.layer2 == true) { // affiche les lignes obliques (1,0) bas droite > haut gauche
                if (g < 150) { // seuil des pixels g

                    stroke(30, 10, 200)
                    line(xpos, ypos + len, xpos + len, ypos)
                }
            }
        }
    }
}


function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}