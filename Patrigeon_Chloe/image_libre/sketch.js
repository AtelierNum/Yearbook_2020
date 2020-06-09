// Ce code  dessine une photo avec des formes et de la 3D, ce qui fait qu'on peut se déplacer à l'intérieur, 
//on peut également changer la couleur, la saturation, etc...

let menu //ce qui apparait dans le menu
let params={
     'offset': 10,
     'formType': 0,
     'mode': 0
    // 'sin' : 10
}


let img
let dataImage = []



function preload() {
    img = loadImage("cpatrigeon.jpg", function () {
            console.log("image loaded") //mon image
            img.resize(50, 50)
            for (let i=0; i<img.width; i++){
                for (let j=0; j< img.height; j++){
                    let col = img.get(i,j)
                    let r = red(col)
                    let b = blue(col)
                    let g = green(col)
                    let hu = hue(col)
                    let br = brightness(col)
                    let sa = saturation(col)
                    dataImage.push(new pixelData(i,j,col,r,g,b,hu,sa,br)) //les variables
                }
            }
            console.log(dataImage)
        })
}

class pixelData{
    constructor(x,y,col,r,g,b,hu,sa,br){
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
    pixelDensity(1) // mon menu et ses boutons
   
    menu = QuickSettings.create("options", 0,0)
    menu.addRange("décalage en profondeur", -20, 20, params.offset, 0.1,
        function(v){
            params.offset = v
        }
    )
    menu.addDropDown("type de forme", ["sphere", "box", "torus", "cone"], 
        function(v){
            params.formType = v.index
        })
    menu.addDropDown("type de transformation", ["teinte", "saturation", "luminosité"], 
        function(v){
            params.mode = v.index
        })

        menu.addButton('export PNG', function(){
            save(timestamp()+".png")
        } )
    
        menu.addButton('export SVG', function(){
            createCanvas(width,height,SVG)
            myDrawing()
            save(timestamp()+".svg")
        } )
    
}

function draw() {
    myDrawing()
}

function myDrawing() {
   background(0)
    orbitControl() // mes fonctions
    
    shininess(20)
    ambientLight(50)
    specularColor(255,0,0);
    pointLight(255,0,0,0,-50,50);
    specularColor(0,255,0);
    pointLight(0,255,0,0,50,50);
    specularMaterial(255);

    push()
    translate(-width * 0.5, -height *0.5)
    for(let i=0; i<dataImage.length; i++){
        let px = dataImage [i]
        let sphereS = map(px.br, 0, 100, 20, 0)
        noStroke()
        fill(px.col)
       
        push()

            let offset
            if (params.mode == 0){
                offset  = px.hu
            }else if (params.mode == 1){
                offset = px.sa
            }else if (params.mode == 2){
                offset = px.br
            }


            translate(px.x * 20, px.y * 20, -1000 + offset * params.offset)
            rotateX(millis()/1000.)
            rotateY(millis()/1000.) // provoque une légère sensation de mouvement
            
            if (params.formType == 0){
                sphere(20)
            }
            else if (params.formType == 1){
                box(20)
            }
            else if (params.formType == 2){
               torus(20,5) 
            }
            else if (params.formType == 3){
                cone(20,10)
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