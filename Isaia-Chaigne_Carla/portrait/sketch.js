

let img
let menu



function preload() {
    img = loadImage("carla.isaia.jpg", function () { // télécharger mon image
        console.log("image loaded")
        img.resize(53, 60) // taille de mon image
    }, function () {
        console.log("error loading image")

    })
}

let params = {

    "layer1": true,
    "layer2": true,
    "layer3": true,
    'currentFont': "Cinzel", // typographie par défaut
    'message': " CARLACARLACARLACARLACARLACARLACARLACARLACARLACARLACARLACARLACARLA" // message à afficher


}

let fonts = ["Cinzel", "Homemade Apple"] // typographies proposées (choix de la police)

function setup() {
    createCanvas(1000, 1000) // taille de mon écran
    pixelDensity(1)


    menu = QuickSettings.create(0, 0, "options")


    menu.addDropDown("choix de la police", fonts, function (v) { // choix de la police
        params.currentFont = v.label

    })
    menu.addText("message à afficher", params.message, function (v) { // message à afficher
        params.message = v
    })

    menu.addBoolean("layer1", params.layer1, function (v) { // couleur 1
        params.layer1 = v
    })

    menu.addBoolean("layer2", params.layer2, function (v) { // couleur 2
        params.layer2 = v
    })

    menu.addBoolean("layer3", params.layer3, function (v) { // couleur 3
        params.layer3 = v
    })
    
    menu.addButton("render to svg", function () {
        createCanvas(width, height, SVG); // create an SVG drawing context
        draw(); // do the drawinf
        save(timestamp()); // give file name and save it
        window.location.reload(0) // reload the window to destroy the svg context
    })


    textFont('Cinzel') // typographie par défaut

}

function draw() {
    myDrawing()

}

function myDrawing() {
    background(255)



    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let col = img.get(i, j)

            let r = red(col)
            let g = green(col)
            let b = blue(col)

            let gray = (red(col) + blue(col) + green(col))*0.33

            let h = hue(col)
            let s = saturation(col)
            let br = brightness(col)

            textFont(params.currentFont, map(s, 0, 255, 0, 20)) // 0,255 valeur possible de la saturartion // taille des lettres = dernier chiffre ici 140

            let textS = map(s, 0, 100, 0, 140)
            let angle = map(s, 0, 100, 0, PI)
            let charactèreIndex = int(map(br, 0, 100, params.message.length, 0))




            textSize(textS)


            if (gray > 0 && gray < 200) { //  valeur que prend le gris de l'image (ici noir)
                if (params.layer1 == true) {
                    push()
                    noFill()
                    stroke(0)  // COULEUR NOIR
                    textAlign(CENTER, CENTER)
                    translate(i * 20, j * 20)
                    rotate(angle)
                    text(params.message.charAt(charactèreIndex), 0, 0)
        
                    pop()
                }
            }


            if (gray > 85 && gray < 190) { // valeur que prend le gris de l'image (ici rouge)
                if (params.layer2 == true) {
                    push()
                    noFill()
                    stroke(233, 56, 63) //  COULEUR ROUGE
                    textAlign(CENTER, CENTER)
                    translate(i * 20, j * 20)
                    rotate(angle)
                    text(params.message.charAt(charactèreIndex), 0, 0)
        
                    pop()
                }
            }

            if (gray > 140 && gray < 255) { // valeur que prend le gris de l'image (ici beige)
                if (params.layer3 == true) {
                    push()
                    noFill()
                    stroke(221, 152, 92) //  COULEUR BEIGE
                    textAlign(CENTER, CENTER)
                    translate(i * 20, j * 20)
                    rotate(angle)
                    text(params.message.charAt(charactèreIndex), 0, 0)
        
                    pop()
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