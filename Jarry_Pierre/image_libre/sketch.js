//Par rapport à l'image originel, je voulais créer comme une sorte de vitrail comme ce que l'on peut trouver dans les cathédrales.

let img
let menu
let params = {
    'taille' : 25
}

function preload() {
    img = loadImage("chateau_1_png.png", function(){
        console.log("image loaded")
        img.resize(100,100)
        
    })
}

function setup() {
    createCanvas(360, 500)
    pixelDensity(1)


    menu = QuickSettings.create(0,0, "Paramètres")
    menu.addRange("Taille",0,200,params.taille,1,function (v){
        params.taille = v
    })

    menu.addButton("Sauvegarder en SVG", function(){
        //createCanvas(width,height,SVG)
        myDrawing()
        save(timestamp()+ ".png")
})



}

function draw() {
    myDrawing()
}

function myDrawing() {
   background(0)
    for (let i = 0 ; i < img.width ; i ++){
     for (let j = 0 ; j < img.height ; j++){
    let col = img.get(i,j)
    let r = red(col)
    let g = green(col)
    let b = blue(col)
    stroke(col)
    let angle = map(saturation(col), 0, 100, 0, TWO_PI)
    let xpos = params.taille * cos(angle)
    let ypos = params.taille * sin(angle)

    push()
    translate(i*5, j*5)
    fill(0,0,b)
    stroke(0,0,0)
    ellipse(0,0, xpos, ypos)
    pop()
}
}

}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}