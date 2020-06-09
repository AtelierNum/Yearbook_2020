// Ce code permet de créer toute sorte de déclinaison de mon logo, que se soit la couleur ou la taille.
// Je peux l'adapter à n'importe quelle situation, en motif, sur différentes couleurs en fond... 




let img 
let dataImage = []


function preload() {
  
  img = loadImage("logos.png", function () { //téléchargement de l'image
      console.log("image loaded")
      img.resize(500, 500) // taille de l'image
    
    }
  
  )
}

let params = { // paramètres pour les futurs options de réglages
  tailleX : 100,
  tailleY : 100,
  opacity : 100,
  red : 255,
  green : 255,
  bleu : 255
}


function setup() {
  createCanvas(500, 500) 
  imageMode(CENTER)
  pixelDensity(1)


  
  menu = QuickSettings.create(0, 0, "options") // création d'un menu pour les options
  menu.addRange("tailleX",1,500, params.tailleX, 10, function (v) { // réglage qui permet de modifié la taille horizontalement
    params.tailleX = v
  })
  menu.addRange("tailleY",1,500, params.tailleY, 10, function (v) { // réglage qui permet de modifié la taille verticalement
    params.tailleY = v
  })
  menu.addRange("opacity",1,300, params.opacity, 5, function (v) { // réglage qui permet de modifié l'opacité de l'image
    params.opacity = v
  })

  menu.addRange("red",1,255, params.red, 5, function (v) { // réglage qui permet de modifié la couleur (rouge pour cette ligne)
    params.red = v
  })

  menu.addRange("green",1,255, params.green, 5, function (v) { // réglage qui permet de modifié la couleur (vert pour cette ligne)
    params.green = v
  })

  menu.addRange("bleu",1,255, params.bleu, 5, function (v) { // réglage qui permet de modifié la couleur (bleu pour cette ligne)
    params.bleu = v
  })

  menu.addButton("render to png", function(){ // bouton permettant de générer un png
    save(timestamp()+ ".png")
});

}


function draw() {
  myDrawing()
}

function myDrawing() {
  background(255)
  
imageMode(CENTER)

strokeWeight(20)
image(img,250,250,params.tailleX,params.tailleY) // création d'un image modifiable en X et en Y
tint(params.red, params.green, params.bleu, params.opacity)//permet de modifié la couleur

    
    push()
    noStroke()
    
    



    pop()
  }

 
   
    


function render() {

}

function timestamp() {
  return nf(year(),4,0) + "-" +nf(month(),2,0) + "-" + nf(day(),2,0) + "-" 
          + nf(hour(),2,0) + "h" + nf(minute(),2,0) + "m" + nf(second(),2,0) + "s"
}