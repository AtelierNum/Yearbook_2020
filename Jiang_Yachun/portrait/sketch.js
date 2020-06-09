let img
let menu


function preload() {
    img = loadImage("cv.jpg", function(){
        console.log("image loaded")
        img.resize(100,100)

    }, function (){
        console.log("error loading image")
    })
}


let params = {
    'tailleElt' : 16,
    'currentFont' : "Abril Fatface",
    'message' : " .;:/-=+*%€@"
}

let fonts = ["Abril Fatface", "Merienda One", "Anton", "Lobster", "Monoton","Nosifer"]

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)
    textFont("Abril Fatface")

    menu = QuickSettings.create(0,0, "options")
    menu.addRange("Taille des éléments",0,100,params.tailleElt,0.5,function (v){
        params.tailleElt = v
    })    
    menu.addDropDown("Choix de la police", fonts, function(v){
        params.currentFont = v.label
})

    menu.addText("Message à afficher", params.message, function(v){
    params.message = v
})
    
    menu.addButton("export SVG", function () {
    createCanvas(width, height, SVG)
    myDrawing()
    save(timestamp() + ".svg")
})

}

function draw() {
    myDrawing()
}

function myDrawing() {
   background (255)
    textFont(params.currentFont)
   for (let i = 0; i < img.width ; i++){
    for (let j = 0 ; j < img.height ; j++){
        let col = img.get(i,j)

        let r = red(col)
        let g = green(col)
        let b = blue(col)

        let h = hue(col)
        let s = saturation(col)
        let br = brightness(col)

        let textS = map(r,0,255,0,params.tailleElt)
        let rectSiz = map(r,0,255,0,10)
        let angle = map(s,0,100,0, PI)
        let characterIndex = int(map(br, 0 , 100, params.message.length, 0))
        //if (br < 60 ){

        textSize(textS)
        colorMode(HSB,100,100,100)
        push()
        fill(b, 100, 100)
        stroke(col)
        strokeWeight(0.2)
        
        textAlign(CENTER, CENTER)
        translate(i*10,j*10)
        //rotate(angle)
        //textSize(textS* params.tailleElt)
        text(params.message.charAt(characterIndex),0,0)
        pop()
    //}
    }
}






}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}