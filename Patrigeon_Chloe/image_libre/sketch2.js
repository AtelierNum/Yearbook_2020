//Pour aller plus loin, ce code reprend les boules et la 3D pour reproduire une image
//mais il inclue des formes là où la couleur est trop foncée
let menu
let params={
     'offset': -1.6,
     'formType': 0,
     'mode': 0
    // 'sin' : 10
}


let img
let dataImage = []



function preload() {
    img = loadImage("Avatar.png", function () {
            console.log("image loaded")
            img.resize(50,50)
            for (let i=0; i<img.width; i++){
                for (let j=0; j< img.height; j++){
                    let col = img.get(i,j)
                    let r = red(col)
                    let b = blue(col)
                    let g = green(col)
                    let hu = hue(col)
                    let br = brightness(col)
                    let sa = saturation(col)
                    dataImage.push(new pixelData(i,j,col,r,g,b,hu,sa,br))
                }
            }
            console.log(dataImage)
        })

        faReg = loadFont("../../assets/Font Awesome 5 Free-Regular-400.otf",
        function(){
            console.log("font awesome reg loades")
        }
)

faBold = loadFont("../../assets/Font Awesome 5 Free-Solid-900.otf",
        function(){
            console.log("font awesome bold loaded")
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
    pixelDensity(1)
   
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

        textFont(faBold)
    
}

function draw() {
    myDrawing()
}

function myDrawing() {
   background(0)
    orbitControl()
    
    shininess(20)
    ambientLight(50)
    specularColor(255,0,0);
    pointLight(255,0,0,0,-50,50);
    specularColor(0,255,0);
    pointLight(0,255,0,0,50,50);
    specularMaterial(255);

    push()
    translate(-width*0.5 , -height*0.5 )
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
            rotateY(millis()/1000.)
            
            if (params.formType == 0){
                sphere(10)
            }
            else if (params.formType == 1){
                box(10)
            }
            else if (params.formType == 2){
               torus(10,5) 
            }
            else if (params.formType == 3){
                cone(10,5)
            }


            
        pop()
            push()
        if (offset < 50) {
            push()
            translate(px.x * 20, px.y * 20, -1000 + offset * params.offset)
            rotateX(millis() / 1000.)
            rotateY(millis() / 1000.)
    
            sphere(10)
            pop()
        } else {
    
            push()
            translate(px.x * 20, px.y * 20, -1000)
            textSize(25)
            textAlign(CENTER, CENTER)
            text('\uf644', 0, 0)
            pop()
        }
    
        pop()
    }

   
       
}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}