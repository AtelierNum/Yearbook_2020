// Le code récupère toutes les données de l'image avec une boucle for et garde ces données dans une classe. 
// Cela permet d'ensuite de charger le programme plus vite quand on fait des changements de règlages avec les params.
// Ensuite le code va regarder la luminosité pour chaque pixels et lui attribuer une forme et une couleur grâce à des conditions. 
// J'ai créer plusieurs formes géométriques (grand rond, petit rond de trame, rectangle, carré, triangle escalier dans différentes orientations...). 
// Pour pouvoir tester plus rapidement les possibilités, j'ai créer un params pour changer la luminosité des conditions pour créer des formes (cela fait le même effet que changer la luminosité de l'image). 
// enfin j'ai ajouté des boutons boolean pour faire apparaitre ou disparaitre les 3 layers, ce qui permete d'exporter séparément les 3 couches en svg. 


// stylo a utillisé : 

// layer1 = Stabilo Rouge 
// layer2 = Stabilo Jaune
// layer3 = Stabilo Rose

//Si pas de stabilo = les mêmes couleurs mais avec des feutres aquarelles




let img;
let menu

let params = {
    'settingBr': 0,
    'BG': 255,
    "layer1": true,
    "layer2": true,
    "layer3": true
}

class pixelData {
    constructor(x, y, col, gray, r, g, b, hu, sa, br) {
        this.x = x
        this.y = y
        this.col = col
        this.gray = gray
        this.r = r
        this.g = g
        this.b = b
        this.hu = hu
        this.sa = sa
        this.br = br
    }
}

let dataImage = [] // an array to store all our pixelData


function preload() {

    // we load the image in the preload function - be sure to use a server of some kind
    img = loadImage("ptellier.jpg",
        // success callback passed to load image
        function () {
            console.log("image loaded")
            img.resize(53, 60) // resize the image to 100px * 100px
            // go through all pixels
            for (let i = 0; i < img.width; i++) {
                for (let j = 0; j < img.height; j++) {
                    // extract all components
                    let col = img.get(i, j)
                    let r = red(col)
                    let g = green(col)
                    let b = blue(col)
                    let gray = (r + g + b) * 0.33
                    let hu = hue(col)
                    let sa = saturation(col)
                    let br = brightness(col)
                    // create a new pixel data object with all the values in the right order
                    let px = new pixelData(i, j, col, gray, r, g, b, hu, sa, br)
                    dataImage.push(px) // add this new pixel to our array
                }
            }
            console.log(dataImage)
        },
        // error callback passed to load image
        function () {
            console.log("failed to load image - try checking the path")
        }
    )
}

function setup() {
    createCanvas(530, 600)
    pixelDensity(1)
    background(255)

    menu = QuickSettings.create(0, 0, "options")
    menu.addRange("settingBr", -100, 100, params.settingBr, 1, function (v) {
        params.settingBr = v
    })
    menu.addRange("BG", 0, 255, params.BG, 1, function (v) {
        params.BG = v
    })
    menu.addBoolean("layer1", params.layer1, function (v) {
        params.layer1 = v
    })
    menu.addBoolean("layer2", params.layer2, function (v) {
        params.layer2 = v
    })
    menu.addBoolean("layer3", params.layer3, function (v) {
        params.layer3 = v
    })
    menu.addButton("render to svg", function () {
        createCanvas(530, 600, SVG); // create an SVG drawing context
        myDrawing(); // do the drawinf
        save(timestamp()); // give file name and save it
        window.location.reload(0) // reload the window to destroy the svg context
    });

}

function draw() {


    myDrawing()
}

function myDrawing() {

    background(params.BG) //pour changer la valeur de gris du fond



    for (let i = 0; i < dataImage.length; i++) {
        let px = dataImage[i]

        let xpos = map(px.x, 0, img.width, 50, width - 50)
        let ypos = map(px.y, 0, img.height, 50, height - 50)

        let rectSiz = map(px.r, 0, 255, 10, 0)
        let angle = map(px.r, 0, 100, 0, PI / 4);

        rectMode(CENTER)
        imageMode(CENTER)
        textAlign(CENTER)

        let size = 10

        //test 1    /// des tests couleurs que j'ai essayé mais que je n'ai pas gardé pour le rendu

        //let color1R = 50
        //let color1V = 40
        //let color1B = 30

        //let color2R = 229
        //let color2V = 231
        //let color2B = 67

        //let color3R = 45
        //let color3V = 72
        //let color3B = 170

        //test 2

        //color3R = 102
        //color3V = 0
        //color3B = 255

        //color2R = 240
        //color2V = 230
        //color2B = 56

        //color1R = 34
        //color1V = 150
        //color1B = 82

        //test 3

        let color1R = 206
        let color1V = 75
        let color1B = 29

        let color3R = 214
        let color3V = 67
        let color3B = 183


        let color2R = 255
        let color2V = 205
        let color2B = 0



        push()
        noStroke()
        if (px.br < 0 + params.settingBr) {     //carré 1  ///j'ai attribué des formes à chaque niveaux de luminosité 
                translate(px.x * size, px.y * size)        /// le settingBr permet de changer le niveau de luminosité et d'ouvir d'autres possibilités de combinaisons de formes
                if (params.layer1 == true) {
                fill(color1R, color1V, color1B)
                rect(1, 1, 8, 8)
            }
        } else if (px.br < 20 + params.settingBr) { //cercle 1
            if (params.layer1 == true) {
                translate(px.x * size, px.y * size)
                fill(color1R, color1V, color1B)
                ellipse(0, 0, 10, 10)
            }
        } else if (px.br < 40 + params.settingBr) { //rect vertical 1
            if (params.layer1 == true) {
                translate(px.x * size, px.y * size)
                fill(color1R, color1V, color1B)
                rect(0, 0, 5, 10)
            }
        }
        else if (px.br < 50 + params.settingBr) { //triangle 1
            if (params.layer1 == true) {
                translate(px.x * size, px.y * size)
                fill(color1R, color1V, color1B)
                rect(0, 0, 10, 2)                //j'ai préféré utilliser la commande rect pour faire cette forme plutot que la commande traingle, je trouvais le graphisme plus intéressant
                rect(-1, 2, 8, 2)
                rect(-2, 4, 6, 2)
                rect(-3, 6, 4, 2)
                rect(-4, 8, 2, 2)
            }
        } else if (px.br < 60 + params.settingBr) {  //rect vertical 3
            if (params.layer3 == true) {
                translate(px.x * size, px.y * size)
                fill(color3R, color3V, color3B)
                rect(0, 0, 5, 10)
            }
        } else if (px.br < 70 + params.settingBr) { //carré 2
            if (params.layer2 == true) {
                translate(px.x * size, px.y * size)
                fill(color2R, color2V, color2B)
                rect(1, 1, 8, 8)
            }
        } else if (px.br < 80 + params.settingBr) { //triangle 1
            if (params.layer3 == true) {
                translate(px.x * size, px.y * size)
                fill(color3R, color3V, color3B)
                ellipse(0, 0, 10, 10)
            }
        } else if (px.br < 85 + params.settingBr) { //triangle 3
            if (params.layer3 == true) {
                translate(px.x * size, px.y * size)
                fill(color3R, color3V, color3B)
                rect(0, 0, 10, 2)
                rect(1, 2, 8, 2)
                rect(2, 4, 6, 2)
                rect(3, 6, 4, 2)
                rect(4, 8, 2, 2)
            }
        } else if (px.br < 90 + params.settingBr) {
            if (params.layer2 == true) {
                translate(px.x * size, px.y * size) // triangle 2
                fill(color2R, color2V, color2B)
                rect(0, 8, 10, 2)
                rect(1, 6, 8, 2)
                rect(2, 4, 6, 2)
                rect(3, 2, 4, 2)
                rect(4, 0, 2, 2)
            }
        } else if (px.br < 95 + params.settingBr) { //mini ellipse 2
            if (params.layer2 == true) {
                translate(px.x * size, px.y * size)
                fill(color2R, color2V, color2B)
                ellipse(2, 2, 6, 6)
            }
        } else if (px.br < 100 + params.settingBr) {   //rect 2
            if (params.layer2 == true) {
                translate(px.x * size, px.y * size)
                fill(color2R, color2V, color2B)
                rect(0, 6, 10, 4)
            }
        }

        pop()
    }
}

function render() {

}

function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}