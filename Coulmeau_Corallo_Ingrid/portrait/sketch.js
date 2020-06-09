let img;

let params = {
    'mult': 5,
    'opacity': 255,
    'strokeW': 0.5,
    'fill': true,
    'curves': true,
    'curveTightness': 1,
    'nS': 5364,

    'layer1': true,
    'layer2': true,
    'layer3': true,
    'uncovered': true,
}



function preload() {
    img = loadImage("icoulmeau.jpg",

        function () {
            console.log("image loaded")
            img.resize(106, 120)
        },

        function () {
            console.log("erreur de chargement de l'image")
        }
    )
}

function setup() {
    createCanvas(1060, 1200)
    pixelDensity(1)
    background(255)

    // CRÉER UN MENU
    menu = QuickSettings.create(0, 0, "options");

    // CRÉER DES BOUTONS POUR CHAQUE COUCHE DE COULEURS 
    menu.addBoolean("layer1", params.layer1, function (v) {
        params.layer1 = v
    })
    menu.addBoolean("layer2", params.layer2, function (v) {
        params.layer2 = v
    })
    menu.addBoolean("layer3", params.layer3, function (v) {
        params.layer3 = v
    })
    menu.addBoolean("uncovered", params.uncovered, function (v) {
        params.uncovered = v
    })

    // CRÉER UN BOUTON D'EXPORT SVG
    menu.addButton("render SVG", function () {
        createCanvas(width, height, SVG)
        myDrawing()
        save(timestamp() + ".svg")
        window.location.reload(0)

    })
    noiseSeed(params.nS)
}

function draw() {
    myDrawing()

}

function myDrawing() {


    background(255)


    // PARAMÈTRES DES LIGNES
    strokeWeight(1)
    noStroke()
    curveTightness(1)


    for (let i = 0; i < img.width; i++) {
        // CRÉER UNE LIGNE POUR RELIER LES POINTS
        beginShape()
        for (let j = 0; j < img.height; j++) {

            // RÉCUPÉRER LA COULEUR DE L'IMAGE
            let col = img.get(i, j)

            // RÉCUPÉRER LA LUMINOSITÉ DE L'IMAGE
            let br = brightness(col)

            let gray = (red(col) + green(col) + blue(col)) * 0.33

            // REMPLIR LE CANVAS ENTIER
            let xpos = map(i, 0, img.width, 0, width)
            let ypos = map(j, 0, img.height, 0, height)

            // get the grasp of the space between to pixels in the real canvas
            let tileSize = width / img.width

            // DÉPLACEMENT HORIZONTAL
            let xOffset = map(noise(gray / 255), 0, 1, -tileSize * params.mult, tileSize * params.mult)

            // DONNER DES COULEURS DIFFÉRENTES EN FONCTION DE LA LUMINOSITÉ
            // COURBES JAUNES
            if (br < 70 && params.layer1 == true) {
                fill(255, 222, 117)
                if (params.curves) {
                    curveVertex(xpos + xOffset, ypos)
                } else {
                    vertex(xpos + xOffset, ypos)
                }

                
            }

            // COURBES ORANGES
            else if (br < 90  && params.layer2 == true) {
                fill(248, 142, 85)
                if (params.curves) {
                    curveVertex(xpos + xOffset, ypos)
                } else {
                    vertex(xpos + xOffset, ypos)
                }
                
                

            }
            // COURBES VERTES
            else if (90 < br  && params.layer3 == true) {
                fill(151, 223, 198)
                if (params.curves) {
                    curveVertex(xpos + xOffset, ypos)
                } else {
                    vertex(xpos + xOffset, ypos)
                }
                
            }

            //VOIR QUELLE PARTIE DES LIGNES N'ÉTAIENT PAS PRISE EN COMPTE DANS LES IF PRÉCÉDENT
            else if (params.uncovered) {
                fill(0)
                if (params.curves) {
                    curveVertex(xpos + xOffset, ypos)
                } else {
                    vertex(xpos + xOffset, ypos)
                }
            }

            



        }
        // FIN
        endShape(CLOSE)
    }



}

//ENREGISTREMENT DES SVG SELON LA DATE ET L'HEURE
function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}