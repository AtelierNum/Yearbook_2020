
let img
let menu

let params = {
    'seuil' : 20,
    'eltSize' : 2

}


function preload() {
    img = loadImage("bdecrion.jpg" , 
    function() {
        console.log("image loaded")
        img.resize(90,100)
        console.log(img.width , img.height)
    } , function() {
        console.log("failure to load image")
    }
    )
}

function setup() {
    createCanvas(450, 500)
    pixelDensity(1)
   // background(255)
    //imageMode(CENTER)
    menu = QuickSettings.create(0,0, "options")
    //settings.addRange(title, min, max, value, step, callback)
    menu.addButton("render to SVG", function(){
        createCanvas(width,height, SVG)
        myDrawing()
        saveSVG(timestamp()+".svg")
    })
    
    
    menu.addRange("nombre de lignes", 1, 40, params.seuil, 0.1,function(v){
        params.seuil = v
    }) 
    menu.addRange("direction des lignes", 1, 5, params.eltSize, 0.01,function(v){
        params.eltSize = v
    }) 
    menu.addButton("render PNG", function(){
        save( timestamp()+".png")
    })

}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(255)
   // image(img,width*0.5,height*0.5)
   strokeWeight(1)
   for (let i = 0 ; i < img.width ; i++){
       for (let j = 0 ; j < img.height ; j++){
          let col = img.get(i,j)
          
          let r = red(col)
          let g = green(col)
          let b = blue(col)
          
          let hu = hue(col)
          let sa = saturation(col)
          let br = brightness(col)

          if (sa > params.seuil){
          //stroke(col)
          //point(i*5 , j*5)
          //fill((r+g+b)*0.33)
          stroke((r+g+b)*0.33)
          noFill()
          //ellipse(i * params.slotSize , j * params.slotSize, params.eltSize, params.eltSize)
          line(225, 250, i*params.eltSize, j*params.eltSize)
          
          }
        }
     }
}

function render() {

}

function timestamp() {
    return  year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}