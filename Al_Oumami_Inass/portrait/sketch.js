// J'ai essayé de modifier la photo en changeant les composants de l'image tel que la luminosité, la saturation, les teintes.. des pixels, par les couleurs rouge, vert et bleu. 
// J'ai tatônné sur les valeurs des composants en créant des intervalles pour trouver le graphisme idéal. Je suis finalement resté sur quelque chose d'assez simple, avec un layer rouge basé sur la luminosité de l'image.  



let img;
let menu

let params = {
    "layer1": true
}

function preload() {
    
    img = loadImage("INASS.jpg", // pour charger l'image
        
        function () {
            console.log("image loaded") // pour être sûr du chargement de l'image
            img.resize(100, 100) // pour redimensionner l'image
        },
        
        function () {
            console.log("failed to load image - try checking the path") // rappel d'erreur du chargement de l'image
        }
    )
}

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)
    background(255)
  

    menu = QuickSettings.create(0, 0, "options")
    menu.addBoolean("layer1", params.layer1, function (v) { 
        params.layer1 = v
    })

    menu.addButton("render to svg", function () { // Bouton qui permet d'exporter en svg
        createCanvas(width, height, SVG);
        myDrawing();
        save(timestamp()); 
        window.location.reload(0)
    });
}





function draw() {
    myDrawing()
}

function myDrawing() {
    background(255)
    noFill()
    stroke(0)


    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
          
            let col = img.get(i, j) // pour obtenir la couleur
            let br = brightness(col) // br correspond à la luminosité

            
            let xpos = map(i, 0, img.width, 55, width - 50) // pour replacer les pixels sur tout le canvas
            let ypos = map(j, 0, img.height, 50, height - 50)

            
            let tileSize = map(br, 0, 255, width / img.width, 0)

            rectMode(CENTER)
            
            if (br > 0 && br < 70) { // paramètre qui utilise le rouge en fonction de la luminosité
                if (params.layer1 == true) {
                    fill(255,0,0)
                    noStroke()
                    square(xpos, ypos, tileSize, tileSize)
                }
            }
            
            
        

    
            
        }
    }


}



function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}