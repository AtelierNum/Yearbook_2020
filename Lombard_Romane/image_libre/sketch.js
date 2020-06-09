let img // pour pouvoir charger l'image
let menu // pour pouvoir exporter en svg
let menu2

let dataImage = []

function preload() {
    img = loadImage("mon-paysage-1.jpg", function () { // chargement de l'image "mon-paysage-1.jpg"
        console.log("image loaded") // vérification du bon chargement dans la console
        img.resize(100, 100) // mise au format carré 100x100 px

      
        console.log(dataImage)
    })

}

let params = {
    'soleil' : 0, // je crée le paramètre "soleil" et sa valeur de départ
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

    menu = QuickSettings.create(10,10,"options") // je crée la zone options

    menu.addRange("Rayons de soleil",0,20,params.soleil,0.1,function(v){ // je crée le slider et détermine les valeurs min et max : 0 et 20
        params.soleil = v // la fonction créée au-dessus sera utilisée comme paramètre soleil

    })
    

    menu = QuickSettings.create(10,100,"option") // code pour exportation SVG

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
    
            
            push() // pour contenir les paramètres au dessin des lignes
            noFill() // uniquement du contour
           
            strokeWeight(3) // la graisse correpond à 3 px

            translate(i*10,j*10) // pour augmenter la taille du dessin au sein du canvas et le centrer

           
            stroke(col) // je veux que mon dessin reprenne les mêmes couleurs que la photo originale
            line(-10,-10,i+params.soleil,j+params.soleil) // je dessine une ligne pour chaque px, qui part d'en haut à gauche pour se terminer à chaque point de l'image + la valeur choisie par l'utilisateur (utilisée en i et en j)
           

         
    
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
    






