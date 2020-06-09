// Je voulais créer une image typographique dans laquelle on pourrait changer pixel en fonction de la saturation, la teinte
// ou encore la luminosité et changer les différentes typo pour créer des contrastes de graisses et de formes


let img;

let menu;

let dataImage = []

let params = {
    'Font': 5,
    'Opacity': 255,
    'Fill': true,
    'color': true,
    'size': 1
    
}



function preload() {

    //CHARGER LES DIFFÉRENTES FONTS PAR CATÉGORIES DE GRAISSES
    // LIGHT FONTS
    Panamera = loadFont("assets/Panamera-Light.otf") // écrire le chemin où se trouve la font
    Brandon = loadFont("assets/Brandon_thin.otf")
    Hurme = loadFont("assets/Hurme Design - HurmeGeometricSans4 Light.otf")
    HappyTimes = loadFont("assets/happy-times-NG_italic_master.otf")
    Noto = loadFont("assets/NotoSansKR-Thin.otf")

    //MEDIUM FONTS
    Linéal = loadFont("assets/Lineal.otf")
    LeMurmure = loadFont("assets/le-murmure.otf")
    BackOut = loadFont("assets/BackOut.otf")
    Bagnard = loadFont("assets/Bagnard.otf")
    Novecento = loadFont("assets/Novecentosanswide-Medium.otf")

    //BOLD FONTS
    Trickster = loadFont("assets/Trickster-Reg.otf")
    PilowLava = loadFont("assets/Pilowlava-Regular.otf")
    Fringant = loadFont("assets/fringant-grotesk-bold.otf")
    F37Bella = loadFont("assets/F37BellaHeavy.otf")
    Gulax = loadFont("assets/Gulax.otf")

    
    img = loadImage("Ryokan.jpg", function () {
        console.log("image loaded")
        img.resize(50, 50)
        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                let col = img.get(i,j)
                let r = red(col) 
                let g = green(col)
                let b = blue(col)
                let hu = hue(col)
                let sa = saturation(col)
                let br = brightness(col)
                // console.log(i,j)
                dataImage.push(new pixelData(i, j, col, r, g, b, hu, sa, br))


            }
        }
        console.log(dataImage)

    }, function () {
        console.log("error loading image")
    })
}

class pixelData {

    constructor(x, y, col, r, g, b, hu, sa, br) {
        this.x = x
        this.y = y
        this.col = col
        this.r = r
        this.g = g
        this.b = b
        this.hu = hu
        this.sa = sa
        this.br = br


    }

}

function setup() {
    createCanvas(1600, 1200)
    pixelDensity(1)
    background(255)

    // CRÉER UN MENU
    menu = QuickSettings.create(0, 0, "MENU")
    menu.addDropDown("CHANGER EN FONCTION DE :", ["Teinte", "Saturation", "Luminosité"], function (v) {
        params.taBlox = v.index
    })

    menu.addDropDown('LIGHT FONTS', ["Panamera", "Brandon", "Hurme", "HappyTimes", "Noto"], function (v) {
        params.type = v.index
    })

    menu.addDropDown('MEDIUM FONTS', ["Linéal", "LeMurmure", "BackOut", "Bagnard", "Novecento"], function (v) {
        params.type = v.index
    })

    menu.addDropDown('BOLD FONTS', ["Trickster", "PilowLava", "Fringant", "F37Bella", "Gulax"], function (v) {
        params.type = v.index
    })

    menu.addRange("Taille lettre", 0, 80, params.taBox, 1, function (v) {
        params.size = v
    })

    menu.addRange("Couleur", 0, 255, params.taBox, 5, function (v) {
        params.taBox = v
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

        for (let i = 0; i < dataImage.length; i++) {
            let px = dataImage[i]
            push()
            fill(px.col)
            noStroke()
            strokeWeight(1)
            translate(px.x * 20, px.y * 20)
            if (px.col > 50){
                textFont(Fringant)
                textSize(params.size)
                text('G', 0, 0)
            }
            else {
                textFont(Noto)
                textSize(params.size)
                text('b', 0, 0)
            }
            //ellipse(0, 0, 15, 15)
            pop()
        }

}

//ENREGISTREMENT DES SVG SELON LA DATE ET L'HEURE
function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}