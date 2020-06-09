/// Le visuel rend compte de la chaleur que procure un feu de cheminée 
//et la forme carrée qui compose l'image évoque l'amas de braise, comme une mosaïque d'un brasier

let img
let dataImage = []
let menu // créée le menu pour modofier les paramètres
let params = { // déclare les paramètres
"treshold" : 25,
"eltSize" : 5, // taille
"strokeW": 1 // épaisseur du trait
}
let faReg
let faBold


function preload() {
    img = loadImage("feu-cheminee.jpg", function () {
        console.log("image loaded")
        img.resize(50, 50)
        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                let col = img.get(i, j)
                let r = red(col)
                let g = green(col)
                let b = blue(col)
                let hu = hue(col)
                let sa = saturation(col)
                let br = brightness(col)
                dataImage.push(new pixelData(i, j, col, r, g, b, hu, sa, br))


            }
        }
        console.log(dataImage)
    })
    faReg = loadFont("../../assets/Font Awesome 5 Free-Regular-400.otf",
        function () {
            console.log("font awsome reg loaded")
        })

    faBold = loadFont("../../assets/Font Awesome 5 Free-Solid-900.otf",
        function () {
            console.log("font awsome bold loaded")
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
    createCanvas(500, 500, WEBGL)
    pixelDensity(4) //permet une taille bien visible des carrés
    noStroke()
    
    menu = QuickSettings.create(0, 0, "option")
    menu.addRange("taille", 0, 500, params.eltSize, 0.1, function (v) {
        params.eltSize = v // permet de varier la taille des pixels
    })
    menu.addButton("export SVG", function () {
        createCanvas(500, 500, SVG) // poir qu'il prenne la taille de l'écran
        myDrawing()
        save(timestamp() + ".svg") // pemret de faire un export SVG du visuel
    })
}

function draw() {
    myDrawing()

}

function myDrawing() {

    background(0)
    shininess(20);
    ambientLight(90);
    specularColor(255, 0, 0);
    pointLight(255, 0, 0, 0, -50, 50); // pour que les tons soient rouges
    specularColor(0, 255, 0);
    pointLight(0, 0, 0, 0, 0, 0);
    specularMaterial(255);
    
   // translate(-width*0.5, -height*0.5)
   push()
   translate(-width * 0.5, -height * 0.5)
   for (let i = 0; i < dataImage.length; i++) {
       let px = dataImage[i]
       let sphereS = map(px.br, 0, 120, 20, 0)
       push()
       noStroke()
       fill(px.col)
       
   
       translate(px.x * 10, px.y * 10)

        if (px.br < 50){ // si la luminosité est inférieur à 50%
   
            box(6)
        }
        else {
         
            box(6)
        }
        pop()
    }
    pop()
}
   

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}