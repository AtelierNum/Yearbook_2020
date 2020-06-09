let img // pour pouvoir charger l'image
let menu // pour pouvoir exporter en svg

let dataImage = []

function preload() {
    img = loadImage("rlombard.jpg", function () { // chargement de l'image "rlombard.jpg"
        console.log("image loaded") // vérification du bon chargement dans la console
        img.resize(100, 100) // mise au format carré 100x100 px

      
        console.log(dataImage)
    })

}
class pixelData {
    constructor(x, y, col, r, g, b, hu, sa, br) { // pour chaque couleur, je fixe la variable
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
    createCanvas(1000, 1000) // création d'un carré de 1000x1000 px
    pixelDensity(1)

    menu = QuickSettings.create(0,0,"option") // code pour exportation SVG

    menu.addButton ("Render to SVG", function(){ //
        createCanvas(width, height, SVG); //
        myDrawing(); //
        save(timestamp()); //
        window.location.reload(0) //

    });

  
}

function draw() {
    myDrawing()

}

function myDrawing() {
    background(255) // je veux un bg blanc
      
    for(let i = 0 ; i < img.width ; i++){
        for (let j = 0 ; j < img.height ; j++){
            let col = img.get(i,j) // je récupère les données de tous les px
    
            let r = red(col) // pour chaque px, je calcule la valeur de chaque couleur (rouge, vert, bleu), entre 0 et 255
            let g = green(col) //
            let b = blue(col) //
    
            let h = hue(col) // idem pour la teinte, la saturation et la luminosité (de 0 à 100)
            let s = saturation(col) //
            let br = brightness(col) //
    
            
            push() // pour contenir les paramètres au dessin des ellipses
            noFill() // uniquement du contour
           
            strokeWeight(1) // la graisse correpond à 1 px

            translate(i*10,j*10) // pour augmenter la taille du dessin au sein du canvas et le centrer

            if (r < 38 && g < 17 && b < 10){ // il faut que plusieurs conditions soient réunies (luminosité en fonction des 3 couleurs calculée pour chaque pixel). calcul précis pour ne parvenir à avoir qu'un cercle pour chaque oeil et la bouche
            stroke(0,0,0) // je veux que mon dessin soit noir
            ellipse(i,j,100,100) // je dessine un cercle de 100x100 px pour chaque px dont les propriétés répondent à ma condition
            }

    
            pop() // pour arrêter le push
            //}


}
    }
}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}
    






