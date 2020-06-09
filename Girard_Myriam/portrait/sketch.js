//Ce projet met en jeu 3 différents calques, en jouant notamment sur les formes (notamment des lignes) et leur superposition. 
//La saturation, l'épaisseur et l'orientation sont ainsi des éléments clés.
//Référence: pop art

let img
let menu

let params = {
    'tresholdEllipse': 25,
    'thresholdLines': 25,
    'eltSize': 5,
    'strokeW': 1,
    'nS': 5300,
    'cos': 25,
    'sin': 5,
    "layer1": false,
    "layer2": false,
    "layer3": true
}

function preload() {
    img = loadImage("mygirard.jpg",
        function () {
            console.log("image loaded")
            img.resize(100, 100)
        },
        function () {
            console.log("error loading image")
        }
    )
}

function setup() {
    createCanvas(500, 500)
    pixelDensity(1)

    menu = QuickSettings.create(0, 0, "options")

    //Boutons pour modifier le visuel
    menu.addRange("seuil ellipses", 0, 255, params.tresholdEllipse, 0.1, function (v) {
        params.tresholdEllipse = v
    })
    menu.addRange("seuil lignes", 0, 255, params.thresholdLines, 0.1, function (v) {
        params.thresholdLines = v
    })
    menu.addRange("taille des ellipses", 0, 300, params.eltSize, 0.1, function (v) {
        params.eltSize = v
    })
    menu.addRange("épaisseur des lignes", 0.01, 10, params.strokeW, 0.01, function (v) {
        params.strokeW = v
    })
    menu.addRange("lignes verticales", 0, 10000, params.nS, 1, function (v) {
        params.nS = v
        noiseSeed(params.nS)
    })
    menu.addRange("cos", 0, 500, params.cos, 0.1, function (v) {
        params.cos = v
    })
    menu.addRange("sin", 0, 255, params.sin, 0.1, function (v) {
        params.sin = v
    })

    //Boutons pour exxporter svg et les différents calques
    menu.addBoolean("layer1", params.layer1, function (v) {
        params.layer1 = v
    })
    menu.addBoolean("layer2", params.layer2, function (v) {
        params.layer2 = v
    })
    menu.addBoolean("layer3", params.layer3, function (v) {
        params.layer3 = v
    })
    menu.addButton("export SVG", function () {
        createCanvas(width, height, SVG)
        myDrawing()
        save(timestamp() + ".svg")
    
    })
}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(0)

    strokeWeight(params.strokeW)
    for (let i = 0; i < img.width; i++) {


        for (let j = 0; j < img.height; j++) {

            let col = img.get(i, j)

            let gray = (red(col) + green(col) + blue(col)) * 0.33
            let xpos = map(i, 0, img.width, 0, width)
            let ypos = map(j, 0, img.height, 0, height)
            let tileSize = width / img.width
            let n = noise(gray / 255)
           

            let r = red(col)
            let g = green(col)
            let b = blue(col)

            let hu = hue(col)
            let sa = saturation(col)
            let br = brightness(col)

            let s = map(br, 0, 255, 0, 1)
// Ellipses
            if (sa > params.tresholdEllipse) {

                if (params.layer1 == true) {
                    stroke(250, 150, 150)
                    fill(250, 150, 150)
                    ellipse(i * 5, j * 5, s * params.eltSize, s * params.eltSize)
                }
            }

// Lignes

            if (sa > params.thresholdLines) {
                if (params.layer2 == true) {
                    stroke(255,150,50)
                    let angle = map(saturation(col), 0, 100, 0, TWO_PI)
                    let xpos = params.cos * cos(angle)
                    let ypos = params.sin * sin(angle)

                    push()
                    translate(i * 5, j * 5)
                    line(0, 0, xpos, ypos)
                    pop()
                }
            }
        }

//lignes verticales

        //beginShape()
        for (let j = 0; j < img.height; j++) {

            let col = img.get(i, j)
           

            let gray = (red(col) + green(col) + blue(col)) * 0.33
            let xpos = map(i, 0, img.width, 0, width)
            let ypos = map(j, 0, img.height, 0, height)
            let tileSize = width / img.width
            let n = noise(gray / 255)
            let xOffset = map(n, 0, 1, -tileSize, tileSize)

            if (params.layer3 == true) {

                stroke(255,0,0)
                line(xpos + xOffset , ypos, xpos + xOffset , ypos + tileSize)
            }

        }
        //endShape(CLOSE)
    }


}

function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}