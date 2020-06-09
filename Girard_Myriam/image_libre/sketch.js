//Ce programme à pour but de mettre en 3D une image, de pouvoir jouer sur la profondeur, les formes et les couleurs.

let img
let dataImage = []
let menu
let params = {
    'offset': 10,
    'formtype': 0,
    'mode': 0
}

function preload() {
    img = loadImage("fleurs.jpg", function () {
        console.log("image loaded")
        img.resize(50, 50)
        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                let col = img.get(i, j)
                let r = red(col)
                let g = green(col)
                let b = blue(col)
                let hu = hue(col)
                let br = brightness(col)
                let sa = saturation(col)
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
    createCanvas(1000, 1000, WEBGL)
    pixelDensity(1)

    menu = QuickSettings.create("options",0,0)
    menu.addRange("décalage en profondeur", -10, 10, params.offset, 0.1,
        function(v){
            params.offset = v
        }
    )
    menu.addDropDown("type de forme",["sphere","box","torus","cone"], 
        function(v){
            params.formType = v.index
        }
    )
    menu.addDropDown("type de transformation",["teinte","saturation","luminosité"],
        function(v){
            params.mode = v.index
        }
    )
    menu.addRange("lumière rouge", 0, 255, params.red, 1, function(v){
        params.red = v
    })
    menu.addRange("lumière verte", 0, 255, params.green, 1, function(v){
        params.green = v
    })
    menu.addRange("lumière bleue", 0, 255, params.blue, 1, function(v){
        params.blue= v
    })
    menu.addButton("export PNG", function(){
        save(timestamp()+".png")
        }
    )

}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(0)
    orbitControl()
    
    shininess (70)
    ambientLight(80)
    specularColor(255,255,255);
    pointLight(255, 0, 0, 0, -50, 50);
    specularColor(0,0, 0);
    pointLight(params.red, params.green, params.blue,0,0, 500);
    specularMaterial(225);
    
    
    push()
    translate(-width * 0.5, -height * 0.5)
    for (let i = 0; i < dataImage.length; i++) {
        let px = dataImage[i]
        let sphereS = map(px.br, 0, 100, 20, 0)
        noStroke()
        fill(px.col)


        push()

        let offset
        if(params.mode ==0){
            offset = px.hu
        }else if (params.mode ==1){
            offset = px.sa
        }else if (params.mode ==2){
            offset = px.br
        }


        translate(px.x * 20, px.y * 20, -1000 + offset * params.offset)
        //rotateX(millis()/1000)
        //rotatY(millis()/1500.)
        
        if (params.formType == 0){
            sphere(20)
        }
        else if (params.formType == 1){
            box(20)
        }
        else if (params.formType == 2){
            torus(20, 5)
        }
        else if (params.formType == 3){
            cone(20, 10)
        }
        
        sphere(sphereS)
        pop()
    }
    pop()
}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}