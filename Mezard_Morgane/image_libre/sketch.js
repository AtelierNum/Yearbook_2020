// Pour ce second livrable déstiné au web, j'ai choisi d'utiliser une image d'une pizza et un traitement
// trés peu commun à ce type de visuel, une pizza poilu. Aussi l'utilisateur peut jourer avec la longeur
// des poils de la pizza. 


let img

let menu
let params= {
    'tresholgd' : 25,
    
}

// image 

function preload() {
    img = loadImage("pizza.jpg", function(){
    console.log("image loaded")
    img.resize(300,300)
    })
}

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)


    menu= QuickSettings.create(0,0,"option")
    menu.addRange("taille", 0 , 255, params.tresholgd, 0.1,function(v){
            params.tresholgd= v
    })
    menu.addButton("render to svg", function () {
        //createCanvas(width, height, SVG); // créer un svg
        myDrawing();
        save(timestamp()); // donner le nom du ficher svg
       // window.location.reload(0)
    })
}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(255)

    for( let i = 0; i < img.width; i++){

    for ( let j =0; j < img.height ; j++){
        let col = img.get( i,j)
        stroke(col)
        let angle = map(saturation(col),0 , 100, 0, TWO_PI)
        let xpos=  params.tresholgd * cos(angle)
        let ypos=  params.tresholgd * sin(angle)

        // forme voulu = des poils
        push()
        translate(i*5,j*5)
        line(10,10,xpos,ypos)
        pop()
    }
    }
   
}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}