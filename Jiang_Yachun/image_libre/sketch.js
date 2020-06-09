//Je veux exprimer un dessin pointillisme （Paul Signac） à travers un modèle 3D.
//Les points colorés de l'image d'origine sont comme des pixels.
//J'ai fait ces points en 3D et différentes formes peuvent apporter des sentiments différents à l'image: Marqueur, Crayon de couleur,Aquarelle, Peinture à l'huile
//En ajustant la taille et la position de la forme, l'image est dynamique.
//Il est recommandé d'observer à distance pour ressentir une forme entière




let img
let dataImage = []
let menu
let params = {
    'offset': 10,
    'formType': 0,
    'mode': 0
}


function preload() {
    img = loadImage("point.jpg", function () {//Charger une image
        console.log("image loaded")
        img.resize(30, 30)//taille de image
        for (let i = 0; i < img.width; i++) {//accéder à la couleur de chaque pixel 
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
    createCanvas(900, 900, WEBGL)// activate webgl mode 
    pixelDensity(1)

    menu = QuickSettings.create("option", 0, 0)
    menu.addRange("Décalage en profondeur", -20, 20, params.offset, 0.1,
        function (v) {
            params.offset = v
            console.log(v)
        }

    )
    menu.addDropDown("type de forme", ["Sphère", "Rect", "Torus", "Cone"], function (v) {
        params.formType = v.index
        //bouton forme de 3d
    })

    menu.addDropDown("type de tranformation", ["Teinte", "Saturation", "Luminosités"], function (v) {
        params.mode = v.index
        //bouton de transformation
    })

    menu.addButton("render to png", function(){
        save(timestamp() +JSON.stringify(params) + ".png") 
        //bouton png
    })
//
}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(0)
    noFill()
    noStroke()
    

    //mettre des lumière
    shininess(20);
    ambientLight(50);
    specularColor(255, 255, 255);
    pointLight(255, 255, 255, width*0.5, height*0.00, 500);
    specularMaterial(255);

    // Autoriser le déplacement
    orbitControl()


    lights()
    push()
    translate(-width * 0.5, -height * 0.5)

    for (let i = 0; i < dataImage.length; i++) {
        let px = dataImage[i]
        noStroke()
        fill(px.col)
        push()


        let offset
        if (params.mode == 0) {
            offset = px.hu
        } else if (params.mode == 1) {
            offset = px.sa
        } else if (params.mode == 2) {
            offset = px.br
        }


    translate(px.x * 30, px.y * 30, -1000 + offset * params.offset)

        //Paramètres de changement de forme 3D
        if (params.formType == 0) {
            sphere(20)
        } else if (params.formType == 1) {
            rotateX(PI/4.)
            rotateY(PI/4.)
            box(20)
        } else if (params.formType == 2) {
            torus(20, 5)
        } else if (params.formType == 3) {
            cone(20, 10)
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