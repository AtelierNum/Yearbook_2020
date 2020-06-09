let img
let menu
let params = {   //tu viens créer ton menu pour aporter les modification sue tu souhaites avec ces parametres
    'treshold': 25,
    'strokeW': 1
}

function preload() {
    img = loadImage("mrojouan.jpg", function () { //permet de venir importer une image apres importation dans le folder
        console.log("image loaded")               //Il suffite ensuite de poser son nom - c'est amusant de la changer
    })
}

function setup() {
    createCanvas(500, 500)
    pixelDensity(1)
    background(255)

    menu = QuickSettings.create(0, 0, "options")                         // suite de la création de menu, on rentre dans les details tech,iqes plus précis
    menu.addRange("taille", 0, 50, params.taille, 0.1, function (v) {
        params.taille = v
    })
    menu.addRange("épaisseur du trait", 0, 20, params.strokeW, 0.1, function (v) {
        params.strokeW = v
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

function myDrawing() {    //ces parametres permettent de venir analyser mon image et de venir selectioner les caracterisqtiques qui m'interesse
    background(255)
    strokeWeight(params.strokeW)
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let col = img.get(i, j)

            let r = red(col)
            let g = green(col)
            let b = blue(col)
           
            
            let hu = hue(col)
            let sa = saturation(col)
            let br = brightness(col)
            let s = map(br, 0, 255, 0, 1)

            let textS = map(r, 0, 255, 15, 25)
            let angle = map(s, 0, 100, 0, PI)
            if (br < 110) {                           // en dessous ce trouves les caracteristiques de formes que je suis venu mettre à la place de mes pixel
                                                       // et des caractéristiques que j'ai choisi plus haut
                //for (let i = 0; i < img.width; i++) {
                //for (let j = 0; j < img.height; j++) {

                //let col = img.get(i, j)
                stroke(0, 0, b)
                //fill(0,0,b)
                let angle = map(saturation(col), 0, 100, 0, TWO_PI)
                let xpos = params.taille * cos(angle)
                let ypos = params.taille * sin(angle)
                if (br < 50) {
                    push()
                    translate(i * 5, j * 5)
                    noFill()
                    ellipse(0, 0, xpos, ypos)

                    pop()

                } else if (br > 50 && br < 100) {
                    push()
                    translate(i * 5, j * 5)
                    noFill()
                    rect(0, 0, xpos, ypos)

                    pop()

                } else if (br > 100 && br < 150) {
                    push()
                    translate(i * 5, j * 5)
                    noFill()
                    triangle(0, 0, xpos, ypos)

                    pop()

                } else if (br > 150 && br < 200) {
                    push()
                    translate(i * 5, j * 5)
                    noFill()
                    quad(0, 0, xpos, ypos)

                    pop()
                }
                else if (sa <20) {
                    push()
                    translate(i * 5, j * 5)
                    noFill()
                    arc(0, 0, xpos, ypos)

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