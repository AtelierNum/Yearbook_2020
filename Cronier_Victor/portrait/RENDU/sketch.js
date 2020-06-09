//////////////////////////////////////// PORTRAIT YEAR BOOK 2020 //////////////////////////////////////////////
////////////////////////////////////////// victor cronier G3B ////////////////////////////////////////////////

// L'objectif : proposer un portrait décalé (double sens), proposer une superpostion de couche à chaque fois décalé (sensation de mouvement / de flou) + un côté retouche humoristique
// Comment fonctionne le code : 
//1/ Le contour de l'image : l'image va être détourré à l'aide de la function finContourPoints, se qui permet d'obtenir un tracé qui réutilise les composantes de l'image (Saturation, Luminosité, Teinte)
// l'idée est de construire une ligne qui réutilise tout les points collectés entre le haut supérieur gauche et le bas inférieur droit de l'écran.
//2/ La trame typographique : création d'une typographie reprennant la forme de pixel, utilisation de cette trame pour remplir et donner des effets d'ombres sur certain détails de l'image. Toujours en utilisant les composantes de l'image pour les remplacer par de la tramep5.BandPass()
// La trame fonctionne de manière aléatoire, ce qui permet d'obtenir des compositions différentes lorsque l'on exporte chaque couche SVG, ce qui au final va permettre de superposer des motifs et des couleurs différentes pour l'impression.

// Détail IMPRESSION : impression sur une feuille noir + feutre posca de couleur / ou impression sur feuille de couleur + stylo mine de précision couleur (pointe fine)
// le rendu de l'impression risque d'être un peu particulière avec la superpostion des couches de trames typographiques, mais je pense que sa peut donner un côté aléatoire intéressant à mon portrait. 

// Conseil d'utilisation : Si les photos proviennent du campus, ne pas trop toucher aux valeurs [ > saturation / hue / brightness ] elles peuvent être directement utilisable comme elles sont relativement identique
// En revanche pour d'autre type de photo : paysage / photo avec beaucoup de détail : la partie contour de l'image risque de poser problème, à essayer en modifiant les valeurs des composantes de l'image.

// La retouche photo est aussi l'un des moyens pour facilité l'utilisation du contour et pour affiner le résultat.

// ATTENTION POUR LE RENDU SVG : DESACTIVER LE BACKGROUND

let img // charge l'image source
let characters = ['A', 'B', 'C','D','E','F'] // charge un ensemble de typo comprenant les lettres de A jusqu'à F
let index = 0 // charge un tableau pour mon ensemble de lettre
let dataImage = [] // charge l'image avec les paramètres (i, j, col, r, g, b, hu, sat, bri)
let typo // charge la typo utilisé pour faire le motif de fond
let menu // charge un menu pour l'export SVG
let params = { // charge 4 couches pour faire 4 export SVG
  "layer1": true,
  "layer2": true,
  "layer3": true,
  "layer4": true
}

let contourSat = [] // charge l'ensemble des pixels SAT, pour pouvoir associer chaque pixel entre eux et creer un contour
let contourHu = [] 

class Point { // Class pour récupérer des points au coordonnée x et y de chaque pixel
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

function preload() {

  typo = loadFont("pictogramaa.ttf") // charge la typo pictogramaa.ttf
  img = loadImage("brest.jpg", function () {
      console.log("image loaded")
      img2 = loadImage("brest.jpg") // charge l'image brest.jpg

      img.resize(50, 50) // redéfinir la taille de l'image brest.jpg
      for (let i = 0; i < img.width; i++) {  // boucle pour récupérer les composantes de l'image col : couleur de l'image, r : rouge de l'image, g : ..., b:..., hue : teinte, ...
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
     

      finContourPoints(1, 0, contourSat) // définir les paramètre de la function finContourPoints(param1,param2,arr)
      finContourPoints(0, 0, contourSat)

      finContourPoints(1, 1, contourHu) // ...
      finContourPoints(0, 1, contourHu)


    

    }
  )
}
class pixelData { // Class pour récupérer les pixels selon les composants de l'image : col,r,g,b,hu,sat,bri

  constructor(col, r, g, b, hu, sat, bri) {

    this.col = col
    this.r = r
    this.g = g
    this.b = b
    this.hu = hu
    this.sat = sat
    this.bri = bri

  }
}

function setup() {
  createCanvas(1000, 1000) // espace de travail
  
/////////// Setting des différentes options du menu /////////////////
  menu = QuickSettings.create(0, 0, "options") // création menu
  menu.addBoolean("layer1", params.layer1, function (v) { // création layer
    params.layer1 = v
  })
  menu.addBoolean("layer2", params.layer2, function (v) { // création layer
    params.layer2 = v
  })
  menu.addBoolean("layer3", params.layer3, function (v) { // création layer
    params.layer3 = v
  })
  menu.addBoolean("layer4", params.layer4, function (v) { // création layer
    params.layer4 = v
  })

  menu.addButton("render to svg", function () { // function pour enregister le SVG
    createCanvas(width, height, SVG);
    draw();
    save(timestamp()); 
    window.location.reload(0)
  })
}

function draw() { /////// Permet de multiplier mon DrawViz et de le placer dans un layer. Permet aussi que de changer différent paramètres plus rapidement que de revenir dans la function (color,translate,..)
  background(0) // A DESACTIVER AVANT DE FAIRE LE RENDU SVG
  if (params.layer1 == true) { 
    push()
    DrawViz1(color(242,174,187))
    pop()
  } 
  if (params.layer2 == true) {
    push()
    translate(10, 0)
    DrawViz1(color(24,50,255))
    pop()
  } 
  if (params.layer3 == true) {
    push()
    translate(-10, 0)
    DrawViz1(color(4, 217, 178))
    pop()
  }
  if (params.layer4 == true) {
    push()
    translate(10, -10)
    DrawViz1(color(242, 92, 5))
    pop()
  }
}




function DrawViz1(col) {
 
  push()


/////////////////////////////////// TRACE 1 ET 2 /////////////////////////////////////////////////////

// construction de mon coutour Saturation à l'aide d'un curveVertex, qui reprend les pixels Saturation pour faire un coutour
// épaisseur 2, stroke(col) réutilise la couleur défini dans le Draw  

strokeWeight(2)
  noFill()
  stroke(col)
  beginShape()
  for (let i = 0; i < contourSat.length; i++) {
    curveVertex(contourSat[i].x, contourSat[i].y)

  }
  endShape(CLOSE)

// construction de mon coutour Teinte/Hue à l'aide d'un curveVertex, qui reprend les pixels de teinte pour faire un coutour
  
  beginShape()
  for (let i = 0; i < contourHu.length; i++) {
    curveVertex(contourHu[i].x, contourHu[i].y)

  }
  endShape(CLOSE)

/////////////////////////////////// TRACE 3 ET 4 /////////////////////////////////////////////////////
 
// multiplication des 2 tracés CONTOUR pour obtenir un décalage et un petit effet de profondeur

  translate(-10, -10)

// construction de mon coutour Saturation à l'aide d'un curveVertex, qui reprend les pixels Saturation pour faire un coutour

  beginShape()
  for (let i = 0; i < contourSat.length; i++) {
    curveVertex(contourSat[i].x, contourSat[i].y)

  }
  endShape(CLOSE)

// construction de mon coutour Teinte/Hue à l'aide d'un curveVertex, qui reprend les pixels de teinte pour faire un coutour

  beginShape()
  for (let i = 0; i < contourHu.length; i++) {
    curveVertex(contourHu[i].x, contourHu[i].y)

  }
  endShape(CLOSE)

/////////////////////////////////// TRACE 5 ET 6 /////////////////////////////////////////////////////

  translate(-20, -20)

  


  beginShape()
  for (let i = 0; i < contourSat.length; i++) {
    curveVertex(contourSat[i].x, contourSat[i].y)

  }
  endShape(CLOSE)


  beginShape()
  for (let i = 0; i < contourHu.length; i++) {
    curveVertex(contourHu[i].x, contourHu[i].y)

  }
  endShape(CLOSE)

/////////////////////////////////// TRAME TYPOGRAPHIQUE /////////////////////////////////////////////////////
 
// construction de la trame typographique en remplaçant certains pixels par un motif typographique aléatoire
  
strokeWeight(0)
  
  for (let i = 0; i < img2.width; i++) {
    for (let j = 0; j < img2.height; j++) {

      let col = img2.get(i, j)

      
      let sa = saturation(col)
      let br = brightness(col)
      let hu = hue(col)

      // map pour définir la taille que prend 1 lettre pour chaque composante de l'image (br,hu,sa)

      let pictoSizBR = map(br, 0, 100, 0, 5)
      let pictoSizHU = map(hu, 0, 300, 0, 5)
      let pictoSizSA = map(sa, 0, 150, 0, 5)


      let xpos = map(i, 0, img2.width, 0, width)
      let ypos = map(j, 0, img2.height, 0, height)


      // Boucle : si la brightness est supérieur à 90 alors les pixels se transforment en typographie 
      
      push()
      textSize(pictoSizBR) // Size de la lettre défini par le map : pictoSizBR
      translate(xpos, ypos)
      if (br > 90) { 
        fill(255)
        textFont(typo)
        let index = int(random(characters.length)) // on appel l'index qui est égal à un entier et cet entier correspond à une des lettres présent dans l'ensemble characters
        text(characters[index], 0, 0) // on place le characters qui est égal à l'index pour écrire notre texte. 
      }
      pop()

      // Boucle : si la teinte/HUE est supérieur à 200 alors les pixels se transforment en typographie 
      
      push()
      textSize(pictoSizHU)

      if (hu > 200) {

        let index = int(random(characters.length))
        text(characters[index], 0, 0)
      }


      pop()
      
      // Boucle : si la saturation est supérieur à 70 alors les pixels se transforment en typographie 

      push()
      textSize(pictoSizSA)

      if (sa > 70) {


        let index = int(random(characters.length))
        text(characters[index], 0, 0)
      }


      pop()



      }



    }
  pop()
}





function timestamp() {
  return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}


/////////////// FUNCTION pour construire le contour d'une image selon certains paramètres (Sa,Br,Hue,..) //////////////////////

function finContourPoints(param1, param2, arr) {

  // La function permet de récupérer le pixel qui utilise une saturation supérieur à 40 situé le + en haut à gauche de l'écran 
  // et de récupérer le pixel qui utilise une saturation supérieur à 40 situé en bas à droite de l'écran
  // l'idée est ensuite de construire une ligne qui réutilise tout les points collectés entre le haut supérieur gauche et le bas inférieur droit de l'écran.

  for (let i = 0; i < img.height; i++) {


    let minX = img.width
    let maxX = 0
    let minFound = false
    for (let j = 0; j < img.width; j++) {
      let c = img.get(j, i)
      let s = saturation(c)
      let h = hue(c)
      let br = brightness(c)

      if (param2 == 0 && s > 40) {
        if (minFound == false) {
          minX = j
          minFound = true
        }
        if (j > maxX) {
          maxX = j
        }
      }

      if (param2 == 1 && h > 55) {
        if (minFound == false) {
          minX = j
          minFound = true
        }
        if (j > maxX) {
          maxX = j
        }
      }



      if (param2 == 1 && br > 60) {
        if (minFound == false) {
          minX = j
          minFound = true
        }
        if (j > maxX) {
          maxX = j
        }
      }

    }

    let ypos = map(i, 0, img.height, 0, height)
    let minXpos = map(minX, 0, img.width, 0, width)
    let maxXpos = map(maxX, 0, img.width, 0, width)


    if (param1 == 0) {
      arr.push(new Point(minX * 20, i * 20))
    } else if (param1 == 1) {
      arr.push(new Point(maxX * 20, i * 20))
    }
  }
} 