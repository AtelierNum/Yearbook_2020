// le but est d'avoir des traits/des lignes qui forment le visage selon la saturation, et d'avoir des points rouges là où sur l'image c'est le plus clair
// on devrait pouvoir modifier la longueur et la largeur des traits, la grosseur des points et la saturation (donc la composition)

let img
let menu
let params={
    'treshold': 25,
    'eltSize' : 5,
    'strokeW' : 1,
    'largeur': 10,
    'hauteur' : 10
    
}

function preload() {
    img = loadImage("cpatrigeon.jpg",
        function () {
            console.log("image loaded")
            img.resize(100, 100)
        },
        function () {
            console.log("error loading image")
        }
    )
}

function setup() {
    createCanvas(500, 500)
    pixelDensity(1)
    background(255)

    menu = QuickSettings.create(0,0, "options")
    //settings.addRange(title, min,max,value,step,callback)
    menu.addRange("seuil",0,255,params.treshold,0.1,function(v){ //v pour value
        params.treshold = v // équivaut à la saturation/ la luminausité 
    } )
    menu.addRange("taille des éléments",0,300,params.eltSize,0.1,function(v){
        params.eltSize = v
    } )
    menu.addRange("épaisseur du trait",0.01,10,params.strokeW,0.1,function(v){
        params.strokeW = v
    } )
    menu.addRange("largeur",0,255,params.cos,0.1,function(v){ //v pour value
        params.largeur = v
    } )
    menu.addRange("hauteur",0,300,params.sin,0.1,function(v){
        params.hauteur = v
    } )

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
    background(255)
    //image(img,0,0)  
    strokeWeight(params.strokeW) // épaisseur des traits
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let col = img.get(i, j)
            let r = red(col) //si choix juste une couleur (et noté r dans le stoke), la même avec g green et b blue
            let b = blue(col)
            let g = green(col)

            let hu = hue(col) 
            let sa = saturation(col)
            let br = brightness(col) //VALEUR ENTRE 0 ET 255

            let s = map(br, 0, 255, 0, 1) // s =

            if (r > params.treshold){
            stroke(r,0,0) //(col) = couleur
            //fill(0,0,b)
            noFill()

            //point(i*5, j*5)
            ellipse(i*5, j*5, s*params.eltSize, s*params.eltSize)


            stroke(col)
    
            let angle = map(saturation(col), 0, 100, 0, TWO_PI)
            let xpos = params.largeur * cos(angle)
            let ypos = params.hauteur * sin(angle)
    
            push()
            translate(i*5,j*5)
            line(5,0,xpos,ypos)
            pop()
            }
        }
    }

}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}