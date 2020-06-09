let img;
let menu

let params = {
    "red" : 255, 
    "green" : 255,
    "blue" : 255,
    "lightX" : 0,
    "lightY": 0,
    "maxOffset" : 400,
    "displacementMode" : 0,
}

function preload() {
//charger l'image
    img = loadImage("pain.png",
        function () {
            console.log("image loaded")
            img.resize(50, 50)
        },
        function () {
            console.log("failed to load image - try checking the path")
        }
    )
}

function setup() {
    createCanvas(1000, 1000, WEBGL)
    pixelDensity(1)
    background(255)

    //réglage de la forme
    detailX = createSlider(3, 24, 3);
    detailX.position(10, height + 5);
    detailX.style('width', '80px');

    menu = QuickSettings.create(0,0,"options")

   //pour retirer ou ajouter du vert et faire varier la couleur de l'image 
    menu.addRange("lighgreen component", 0, 255, params.green, 1, function(v){
        params.green = v
    })
   
   //change la couleur des formes et l'espacement 
    menu.addRange("maximum z offset", -1000, 1000, params.maxOffset, 1, function(v){
        params.maxOffset= v
    })
   
    //brightness fait gonfler les formes
    menu.addDropDown("displacement mode", ["hue", "brightness"], function(v){
        params.displacementMode= v.index
    })

   //boutons d'exports
    menu.addButton("export PNG", function(){
        save(timestamp()+".png")
    })  
    menu.addButton("export SVG",function(){
        createCanvas(width, height, SVG)
        myDrawing()
        save(timestamp()+".svg")
    })
}



function draw() {
    myDrawing()
}

function myDrawing() {
    background(0)
    noFill()
    noStroke()

//paramètres lumières
    shininess(30);
    ambientLight(80);
    pointLight(params.red, params.green, params.blue, params.lightX,params.lightY, 100); // using params !
    specularMaterial(255);

    // move around
    orbitControl()
//centrer
    translate(-width * 0.5, -height * 0.5, -400)


  
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            push()
            // get image color
            let col = img.get(i, j)
            // calculate other components
            colorMode(HSB, 200, 100, 50)
            let h = hue(col)
            let s = saturation(col)
            let b = brightness(col)
          

            // remap the position of pixels to fill the whole canvas
            let xpos = map(i, 0, img.width, 50, width - 50)
            let ypos = map(j, 0, img.height, 50, height - 50)

        

            // we want to calculate those two variable in several displacement modes
            let zoffset // z-position
            let sphereSize //size

         if (params.displacementMode == 1){ //teinte
                zoffset = map(h, 0, 360, 0, params.maxOffset)
                sphereSize = map(h , 0, 360, 0,  width / img.width )
            }
            else if (params.displacementMode == 2){ //saturation
                zoffset = map(s, 0, 100, 0, params.maxOffset)
                sphereSize = map(s , 0, 100, 0,  width / img.width )
            }
            else if (params.displacementMode == 3){ // lumière
                zoffset = map(b, 0, 100, 0, params.maxOffset)
                sphereSize = map(b , 0, 100, 0,  width / img.width )
            }

         //   colorMode(RGB)
            fill(col)
           

            // formes triangulaires qui composent l'image, crée des effets visuels (différents formes/effets selon la position des formes)
            translate(xpos, ypos, zoffset)
            rotateY(millis() / 1000);
            //taille forme
  torus(40, 20, detailX.value(), 12);
            pop()
        }
    }



}



function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}