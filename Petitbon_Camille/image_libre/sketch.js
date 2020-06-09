let img
let menu

let params = {
    'Graisse': 0, // Paramètre du premier bouton
    "layer1": true, // Paramètre du premier bouton
    "layer2": true, // Paramètre du premier bouton
    "layer3": true, // Paramètre du premier bouton

}


function preload() {
    img = loadImage("GAUGUIN.jpg", // pour charger l'image de Gauguin
        function () {
            console.log("image loader")
            img.resize(100, 100) // on redimensionne l'image à 40 pour qu'il y ait moins de détails
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

    menu.addBoolean("layer1", params.layer1, function (v) { // bouton layer1 pour sélectionner le layer 1 pour avoir les carrés foncés
        params.layer1 = v
    })
    menu.addBoolean("layer2", params.layer2, function (v) { // bouton layer2 pour sélectionner le layer 2 pour avoir les carrés plus clairs      
        params.layer2 = v
    })
    menu.addBoolean("layer3", params.layer3, function (v) { // bouton layer3 pour sélectionner le layer 3 pour avoir ce qui reste (rien)       
        params.layer3 = v
    })


    menu.addButton("export SVG", function (v) { // bouton export svg
        save(timestamp() + ".png")
    })


}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(10, color, 100)

    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            // parcours tous les pixels de l immage. Si i = 0, on parcours j
            let col = img.get(i, j)
            // on met la couleur du pixel dans col
            let gray = (red(col) + green(col) + blue(col)) * 0.33


            // repositionne les pixels de la photo
            // remap the position of pixels to fill the whole canvas
            let xpos = map(i, 0, img.width, 50, width - 50)
            let ypos = map(j, 0, img.height, 50, height - 50)

            // calculate the size of a for accoring to the gray value
            let tileSize = map(gray, 0, 255, width / img.width, 0)

            rectMode(CENTER)


            // si c'est foncé ça dessine un carré noir
            if (gray > 0 && gray < 100) {
                
                if (params.layer1 == true) {
                    stroke(255, 0, 0)
                    rect(xpos, ypos, tileSize, tileSize)
                }
            }

            // si c'est clair ça dessine un carré noir
            if (gray > 50 && gray < 125) {
                if (params.layer2 == true) {
                    stroke(0, 0, 255)
                    ellipse(xpos, ypos, tileSize, tileSize)
                }
            }

            // si c'est très clair ça dessine un carré noir
            if (gray > 100 && gray < 175) {
                if (params.layer3 == true) {
                    stroke(0, 255, 0)
                    line(xpos - tileSize / 2, ypos - tileSize / 2, xpos + tileSize / 2, ypos + tileSize / 2)
                    line(xpos - tileSize / 2, ypos + tileSize / 2, xpos + tileSize / 2, ypos - tileSize / 2)
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