//Pour mon code j'ai voulu confronter deux type de transformation : la rotation en 2D en fonction de la saturation et le déplacement en 3D
// en fonction de la teinte , la saturation ou la luminosité.

let img;

let menu;

let params = {

   'taBlox' : 0,
   'taBox' : 6,
   'type' : 0,
   'formType' : 0,
   'color' : 0
}

let dataImage = []

function preload() {
    img = loadImage("ilu.jpg",function(){
        console.log("image loaded")
        img.resize(50, 50)
        for(let i = 0 ; i < img.width ; i++){
            for(let j = 0; j < img.height ; j++){
                let col = img.get(i,j)
                let r = red(col)
                let g = green(col)
                let b = blue(col)
                let hu = hue(col)
                let sa = saturation(col)
                let br = brightness(col)
                dataImage.push(new pixelData(i,j,col,r,g,b,hu,sa,br))


            }
        }
        console.log(dataImage)

    }, function (){
    console.log("error loading image")
})

img2 = loadImage("ilu.jpg",

function () {
    console.log("image loaded")
    img2.resize(50, 50) // redimensionne en 100px * 100px
},

function () {
    console.log("failed to load image - try checking the path")
}
)

}

class pixelData{


    constructor(x,y, col, r, g, b, hu, sa, br){
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
    createCanvas(1000, 1000, WEBGL) //WEBGL permet la 3D
    pixelDensity(1)
    background(255)
    menu = QuickSettings.create(0,0, "options") //crée le menu des options
    menu.addRange("3D+",0,10, params.taBlox,0.1, function(v){
        params.taBlox = v
    })
    menu.addRange("Taille box", 0, 20, params.taBox, 1, function (v) {
        params.taBox = v
      })
      
    menu.addDropDown('type de transformation', ["teinte", "saturation", "luminosité"], function(v){
        params.type = v.index
    })

    menu.addDropDown('type de transformation', ["sphere", "cube", "cone", "torus"], function(v){
        params.formType = v.index
    })

    menu.addDropDown('couleur', ["photo", "bleu", "vert", "rouge"], function(v){
        params.couleur = v.index
    })

    menu.addButton("render to png", function(){ //permet l'export
        save(timestamp() +JSON.stringify(params) + ".png")
    });

}

function draw() {
   myDrawing()
}

function myDrawing() {
    background(255)
    orbitControl() //permet de changer la vue en 3D
    push()
    translate(- width * 0.5, - height * 0.5)
    noStroke()
    
    

    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    //directionalLight(0, 0, 255, -dirX, -dirY, -1);
    noStroke();
    
    //sphere(20)

    for(let i = 0 ; i < dataImage.length ; i++){

        if(params.couleur == 0){
            directionalLight(255, 255, 255, -dirX, -dirY, -1);
   
        }

        else if (params.couleur == 1){
            directionalLight(0, 0, 150, -dirX, -dirY, -1);  //en changeant la lumière je peux changer la couleur des formes en 3D
   
        }

        else if (params.couleur == 2){
            directionalLight(0, 150, 0, -dirX, -dirY, -1);
   
        }

        else if (params.couleur == 3){
            directionalLight(150, 0, 0, -dirX, -dirY, -1);
   
        }

        push()
        let px = dataImage[i] //reprend les pixels de l'image
        fill(px.col)
        let offset
        if(params.type == 0){
            offset = px.hu
        }
        else if (params.type == 1){
            offset = px.sa
        }
        else if (params.type == 2){
            offset = px.br
            }

        translate(px.x * 20, px.y * 20, -500 + offset * params.taBlox)
        
        if (params.formType == 0){
            sphere(params.taBox)
        }
        else if (params.formType == 1){
            box(params.taBox)
        }
        else if (params.formType == 2){
            cone(params.taBox,20)
        }
        else if (params.formType == 3){
            torus(20,params.taBox)
        }


       

        pop()
    }
    

    pop()
   
    for (let i = 0 ; i < img2.width ; i++){
        for (let j = 0 ; j < img2.height ; j++){

            let col = img2.get(i,j) // reprend les couleur des pixels de l'image




            if (params.couleur == 0){
                stroke(col)
            }
            else if (params.couleur == 1){
                stroke('#7CFFFC')
            }
            else if (params.couleur == 2){
                stroke('#FFB11F')
            }
            else if (params.couleur == 3){
                stroke('#FF7CF7')
            }




            
           // stroke(col)
            strokeWeight(5)

            
            let xpos = map(i, 0, img2.width*1.2, -700, width) //redimensionne les pixels
            let ypos = map(j, 0, img2.height*1.2, -700, height)
            let len = map(mouseX, 0, width, 0, 100) //change la longueur des segments en fonction de la positionde la souris 
            let sat = saturation(col) // prend la saturation du pixel
            let angle = map(sat, 0, 100, 0, TWO_PI) // et la transforme en valeur qui changera l'angle du segment
            let x = len * cos(angle)
            let y = len * sin(angle)

            push()
            translate(xpos, ypos,-500)// "-500" permet de mettre la deuxieme image au même niveau de la premiere
            line(0, 0, x, y)
            pop()
        }
    }


        
}




function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}