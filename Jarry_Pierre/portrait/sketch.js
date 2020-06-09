// Pour mon image finale, je souhaitais réaliser un visuel qui soit en totale opposition avec ma personnalité. 
// J'ai donc créé un visuel noir, sombre, déstabilisant à l'oeil et à la limite de l'oppression. 
// La photographie est transformée et propose un effet de télévision dont les images se brouillent et où un visage horrifique apparaît.  
// (Les traits noirs laissent distinguer un large sourire effrayant, comme si un démon ou une créature démoniaque prenait possession de l'écran)


// Pour afficher sur le Live Server mon visuel, il faut mettre le paramètre de la taille à 4.


let img
let menu
let params = {
    'taille' : 25
}


function preload() {
    img = loadImage("cv.jpg", function(){ 
        console.log("image loaded")
        img.resize(100,100)
        
    })
}

function setup() {
    createCanvas(500, 500)
    pixelDensity(1)
     

    menu = QuickSettings.create(0,0, "Paramètres")
    menu.addRange("Taille",0,200,params.taille,1,function (v){
        // J'ai fixé le paramètre de la taille à 1, pour qu'une fois que je lance le code, je puisse voir le changement 
        // et la variété de possibilité des traits. Chaque rendu exprime une sensation nouvelle.
        params.taille = v
    })

    menu.addButton("Sauvegarder en SVG", function(){
        createCanvas(width,height,SVG)
        myDrawing()
        save(timestamp()+ ".svg")
})

    menu.addButton("Sauvegarder en PNG", function(){
        save(timestamp()+ ".png")
})

}

function draw() {
    myDrawing()
}

function myDrawing() {
   background(255)
    for (let i = 0 ; i < img.width ; i ++){
     for (let j = 0 ; j < img.height ; j++){
    let col = img.get(i,j)
    
    let h = hue(col)
    let s = saturation(col)
    let br = brightness(col)
    // Sachant que je souhaitais une image en noir, je n'ai pas eu besoin d'intégrer les clé let r / Let g / Let b
    // Je voulais seulement jouer avec les différents contrastes que pouvait m'apporter la teinte, la saturation et luminosité. 

    stroke(col)
    let angle = map(saturation(col), 0, 100, 0, TWO_PI)
    let xpos = params.taille * cos(angle)
    let ypos = params.taille * sin(angle)

    push()
    translate(i*5, j*5) 
    // Le translate est à *5 car sinon ma photographie est mal cadrée et est coupée.
    stroke(0) 
    // J'utilise des lignes pour créer mon visuel c'est pour cela que j'ai besoin d'un stroke que j'ai donc mis de couleur noir"
    line(br,0, xpos, ypos) 
    // Sur les trois Let que j'ai chargé dans mon code, je n'utilise que la luminosité qui viendra donner un vrai contraste au visuel.
    pop()
}
}


}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}