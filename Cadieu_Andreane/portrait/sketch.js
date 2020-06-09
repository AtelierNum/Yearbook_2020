let img
let dataImage = []


function preload() {
  
  img = loadImage("acadieu.jpg", function () { //téléchargement de l'image
      console.log("image loaded")
      img.resize(50, 50) // taille de l'image
      for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
          let col = img.get(i, j)
          let r = red(col)
          let g = green(col)
          let b = blue(col)
          let hu = hue(col)
          let sat = saturation(col)
          let bri = brightness(col)
          dataImage.push(new pixelData(i, j, col, r, g, b, hu, sat, bri))
        }
      }
      console.log(dataImage)
    },
    function () {
      console.log("failure to load image")
    }
  )
}
class pixelData {

  constructor(x, y, col, r, g, b, hu, sat, bri) {
    this.x = x
    this.y = y
    this.col = col
    this.r = r
    this.g = g
    this.b = b
    this.hu = hu
    this.sat = sat
    this.bri = bri

  }
}

let params = {
  layer1 : true, layer2 : true, layer3 : true // layer pour les trois différentes couches pour le SVG
}


function setup() {
  createCanvas(500, 500)
  imageMode(CENTER)
  pixelDensity(1)

  menu = QuickSettings.create(0, 0, "options") // création d'un bouton pour les options
  menu.addBoolean("layer1", params.layer1, function(v){ // création de l'option layer1 dans le menu
    params.layer1 = v;
  })

  menu.addBoolean("layer2", params.layer2, function(v){ // création de l'option layer2 dans le menu
    params.layer2 = v;
  })

  menu.addBoolean("layer3", params.layer3, function(v){ // création de l'option layer3 dans le menu
    params.layer3 = v;
  })

  menu.addButton("render SVG", function () { // création du bouton SVG
    createCanvas(width, height, SVG)
    myDrawing()
    save(timestamp() + ".svg")
  })

}




function draw() {
  myDrawing()
}

function myDrawing() {
  background(255)



  for (let i = 0; i < dataImage.length; i++) {
     let px = dataImage[i]

    let tailleMax = width / img.width // variable de la taille des ellipses
    let ellipsesize 
    
    push()
    noStroke()
    
    let xpos = map(px.x, 0, img.width, 0, width) //
    let ypos = map(px.y, 0, img.height, 0, height) //
    

    if (px.b < 125 && params.layer1 == true) { // choix des différentes couche en fonction des couleurs de pixels ( couche 1 )
      ellipsesize = map(px.b, 0, 125, 0, tailleMax) // ellipse qui s'adapte à la couleur du pixel 
      fill(255, 0, 0) // couleur des ellipses
      translate(xpos, ypos) //
    ellipse(ellipsesize / 2, ellipsesize / 2, ellipsesize, ellipsesize) // création des ellipses, qui s'adapte à la variable ellipsesize

    } 
    else if (px.b >= 125 && px.b < 200 && params.layer2 == true) { // choix des différentes couche en fonction des couleurs de pixels ( couche 1 )
      ellipsesize = map(px.b, 125, 200, 0, tailleMax) // ellipse qui s'adapte à la couleur du pixel 
      fill(0, 255, 0)
      translate(xpos, ypos) //
    ellipse(ellipsesize / 2, ellipsesize / 2, ellipsesize, ellipsesize) // création des ellipses, qui s'adapte à la variable ellipsesize

    } 
    else if (px.b >= 200 && px.b <= 255 && params.layer3 == true) { //choix des différentes couche en fonction des couleurs de pixels ( couche 1 )
      ellipsesize = map(px.b, 200, 255, 0, tailleMax) // ellipse qui s'adapte à la couleur du pixel 
      fill(0, 0, 255)
      translate(xpos, ypos) //
    ellipse(ellipsesize / 2, ellipsesize / 2, ellipsesize, ellipsesize) // création des ellipses, qui s'adapte à la variable ellipsesize

    }


    pop()
  }


}

function render() {

}

function timestamp() {
  return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
    nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}