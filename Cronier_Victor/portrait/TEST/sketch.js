let img
let img2
let img3
let img4
let img5



let dataImage = []

let typo

let menu
let params = {
  "layer1": true,
  "layer2": true,
  "layer3": true
}


let contourSat = []

let contourHu = []





class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

function preload() {
  //faReg = loadFont("../assets/Font Awesome 5 Free-Regular-400.otf")
  //faBold = loadFont("../assets/Font Awesome 5 Free-Solid-900.otf")
  typo = loadFont("pictogramaa.ttf")
  img = loadImage("teinte.jpg", function () {
      console.log("image loaded")
  img2 = loadImage("sat.jpg")
  img3 = loadImage("oeil.png")
  img4 = loadImage("glas.png")
  img5 = loadImage("fond.png")
      img.resize(50, 50)
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
      //console.log(dataImage, img.width, img.height)

      finContourPoints(1, 0, contourSat)
      finContourPoints(0, 0, contourSat)

      finContourPoints(1, 1, contourHu)
      finContourPoints(0, 1, contourHu)

     // console.log(contourCoord)
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

function setup() {
  createCanvas(1000, 1000)
  pixelDensity(1)

  menu = QuickSettings.create(0, 0, "options")
  menu.addBoolean("layer1", params.layer1, function (v) {
      params.layer1 = v
  })
  menu.addBoolean("layer2", params.layer2, function (v) {
      params.layer2 = v
  })
  menu.addBoolean("layer3", params.layer3, function (v) {
      params.layer3 = v
  })

  menu.addButton("render to svg", function () {
    createCanvas(width, height, SVG);
    myDrawing();
    save(timestamp()); // give file name
    window.location.reload(0)
})
}

function draw() {
  DrawViz1()  
}


function DrawViz1() {
background(255)




fill(0,0,255,50)
rect(0,0,1000,1000)

strokeWeight(3)
//imageMode(CENTER)
//tint(255,200)
// img5.resize(106*10, 120*10)
// image(img5,460,430)

  stroke(255, 0, 0)
  beginShape()
  for (let i = 0 ; i < contourSat.length ; i++){
    curveVertex(contourSat[i].x, contourSat[i].y)

  }
  endShape(CLOSE)

  stroke(0, 255, 0)
  beginShape()
  for (let i = 0 ; i < contourHu.length ; i++){
    curveVertex(contourHu[i].x, contourHu[i].y)

  }
  endShape(CLOSE)

  //////////////////////////////////////////
  translate(-20,-20)

  noFill()
  strokeWeight(3)

  stroke(255, 0, 0)
  beginShape()
  for (let i = 0 ; i < contourSat.length ; i++){
    curveVertex(contourSat[i].x, contourSat[i].y)

  }
  endShape(CLOSE)

  stroke(0, 255, 0)
  beginShape()
  for (let i = 0 ; i < contourHu.length ; i++){
    curveVertex(contourHu[i].x, contourHu[i].y)

  }
  endShape(CLOSE)

  //////////////////////////////////////////////

  translate(-20,-20)

  noFill()
  strokeWeight(3)

  stroke(0, 0, 255)
  beginShape()
  for (let i = 0 ; i < contourSat.length ; i++){
    curveVertex(contourSat[i].x, contourSat[i].y)

  }
  endShape(CLOSE)

  stroke(0, 255, 0)
  beginShape()
  for (let i = 0 ; i < contourHu.length ; i++){
    curveVertex(contourHu[i].x, contourHu[i].y)

  }
  endShape(CLOSE)
  


  //////////////////////////////////////////////
//background(255)
strokeWeight(0)

  for (let i = 0; i < img2.width; i++) {
    for (let j = 0; j < img2.height; j++) {

        let col = img2.get(i, j)

        let r = red(col)
        let sa = saturation(col)
        let br = brightness(col)


        let pictoSiz = map(sa, 0, 150, 0, 5)

      
        let xpos = map(i, 0, img2.width, 0, width)
        let ypos = map(j, 0, img2.height, 0, height)
      
       
        push()
        textSize(pictoSiz)
        translate(xpos, ypos)
        if (sa > 70){
            fill(255,0,0) 
            textFont(typo) 
            random(text(['A','B'], 0, 0)) 
        }


        pop()

      }

  }
  for (let i = 0; i < img2.width; i++) {
    for (let j = 0; j < img2.height; j++) {

        let col = img2.get(i, j)

        let r = red(col)
        let sa = saturation(col)
        let br = brightness(col)


        let pictoSiz = map(br, 0, 100, 0, 5)

      
        let xpos = map(i, 0, img2.width, 0, width)
        let ypos = map(j, 0, img2.height, 0, height)
      
       
        push()
        textSize(pictoSiz)
        translate(xpos, ypos)
        if (br > 90){
            fill(255,0,0) 
            textFont(typo) 
            random(text(['C','D'], 0, 0)) 
        }


        pop()

      }


       
  }

  for (let i = 0; i < img2.width; i++) {
    for (let j = 0; j < img2.height; j++) {

        let col = img2.get(i, j)

        let r = red(col)
        let sa = saturation(col)
        let br = brightness(col)
        let hu = hue(col)


        let pictoSiz = map(hu, 0, 300, 0, 5)

      
        let xpos = map(i, 0, img2.width, 0, width)
        let ypos = map(j, 0, img2.height, 0, height)
      
       
        push()
        textSize(pictoSiz)
        translate(xpos, ypos)
        if (hu > 200){
            fill(255,0,0) 
            textFont(typo) 
            random(text(['C','D'], 0, 0)) 
        }


        pop()

      }


       
  }




  //imageMode(CENTER)
 // tint(255,50)
  //img3.resize(2440/10, 420/10)
  //image(img3,500,430)

  imageMode(CENTER)
  // tint(255,50)
   img4.resize(4110/10, 1708/10)
   image(img4,500,430)
   


   strokeWeight(25)  
   stroke(0,0,255)
line(352,470,430,410)
line(352,410,430,470)

line(560,400,640,460)
line(560,460,640,400)  


print(mouseX)
print(mouseY)



}


  function render() {

}

function timestamp() {
  return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}

// param1 => 0 - min / 1 - max
// param2 => 0 - saturation / 1 - brigth
function finContourPoints(param1, param2, arr) {


  for (let i = 0; i < img.height; i++) {


    let minX = img.width
    let maxX = 0
    let minFound = false
    for (let j = 0; j < img.width; j++) {
      let c = img.get(j, i)
      let s = saturation(c)
      let h = hue(c)

      if  (param2 == 0 && s > 40) {
        if (minFound == false) {
          minX = j
          minFound = true
        }
        if (j > maxX) {
          maxX = j
        }
      }

      if  (param2 == 1 && h > 55) {
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
      arr.push(new Point(minX * 20, i*20))
    } else if (param1 == 1) {
      arr.push(new Point(maxX *20, i*20))
    }



   // console.log(minX, maxX, minXpos, maxXpos)

  }
}
