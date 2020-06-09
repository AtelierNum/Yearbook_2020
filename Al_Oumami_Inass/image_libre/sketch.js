// J'ai voulu représenter l'image comme de la peinture qui explose. J'ai donc utilisé plusieurs paramètres, j'ai tâtonné avec ces différents paramètres pour obtenir ce rendu.

let img;

let menu;

let params = { // crée un objet param pour stocker chaque paramètre de notre dessin

   'troisD' : 5,
   'taille' : 5,
   'type' : 0,
   'forme' : 0
}

let dataImage = []

function preload() {
    img = loadImage("TOTORO.jpg",function(){ // pour charger l'image
        console.log("image loaded") // pour être certain du chargement de l'image
        img.resize(70, 100) // pour redimensionner l'image

        for(let i = 0 ; i < img.width ; i++){  // parcourir chaque pixel horizontalement
            for(let j = 0; j < img.height ; j++){ // pour passer par chaque rangée de pixels
                
                let col = img.get(i,j) // pour obtenir la couleur
                
                // récupère les composants rgb de la couleur (pour chaque pixel)

                let r = red(col) // composantes rouges (0-255)
                let g = green(col) // composantes vertes (0-255)
                let b = blue(col) // composantes bleues (0-255)

                // get the hue, saturation and brightness of the color

                let hu = hue(col) // teinte (0-360)
                let sa = saturation(col) // saturation (0-100)
                let br = brightness(col) // luminosité (0-100)
                dataImage.push(new pixelData(i,j,col,r,g,b,hu,sa,br))


            }
        }
        console.log(dataImage)

    }, function (){
    console.log("error loading image") // rappel d'erreur du chargement de l'image
})
}

class pixelData{ // pour créer une classe pour stocker toutes les valeurs dont on a besoin


    constructor(x,y, col, r, g, b, hu, sa, br){ 
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
    createCanvas(1000, 1000, WEBGL) // pour dessiner en 3D
    pixelDensity(1)
    background(255)
    menu = QuickSettings.create(0,0, "OPTIONS") // pour créer le menu
    
    menu.addRange("3D",0,25, params.troisD,0.1, function(v){ // paramètre pour obtenir de la 3D
        params.troisD = v
    })
    menu.addRange("TAILLE DES ÉLÉMENTS", 0, 15, params.taille, 1, function (v) { // paramètre pour changer la taille des formes
        params.taille = v
      })
      
    menu.addDropDown('PARAMÈTRES', ["TEINTE", "SATURATION", "LUMINOSITÉ"], function(v){ // paramètre pour changer l'image en fonction de la teinte, saturation et luminosité 
        params.type = v.index
    })

    menu.addDropDown('FORMES', ["SPHÈRE", "CUBE", "CÔNE", "TORE"], function(v){ // paramètre pour changer les formes
        params.forme = v.index
    })

    menu.addButton("EXPORTER EN PNG", function(){ // paramètre pour exporter en png
        save(timestamp()+ ".png")
});

}

function draw() {
   myDrawing()
}

function myDrawing() {
    background(0)
    orbitControl() 
    push()
    translate(- width * 0.8, - height * 1)
    noStroke()

    for(let i = 0 ; i < dataImage.length ; i++){

        push()
        let px = dataImage[i]
        fill(px.col)
        let offset
        if(params.type == 0){ // utilise les pixels de teinte
            offset = px.hu
        }
        else if (params.type == 1){ // utilise les pixels de saturation
            offset = px.sa
        }
        else if (params.type == 2){ // utilise les pixels de luminosité
            offset = px.br
            }

        translate(px.x * 20, px.y * 20, -1000 + offset * params.troisD) // recentrer toute l'image
        
        if (params.forme == 0){ // dessine des sphères
            sphere(params.taille)
        }
        else if (params.forme == 1){ // dessine des cubes
            box(params.taille)
        }
        else if (params.forme == 2){ // dessine des cônes
            cone(params.taille,20)
        }
        else if (params.forme == 3){ // dessine des tores
            torus(20,params.taille)
        }
       

        pop()
    }
    

    pop()
        
}


function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}