let img

let characters = ['A', 'B', 'C','D','E','F']

let index = 0;

let dataImage = []

let typo

let menu
let params = {
  "layer1": true,
  "layer2": true,
  "layer3": true,
  "layer4": true
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

  typo = loadFont("pictogramaa.ttf")
  img = loadImage("brest.jpg", function () {
      console.log("image loaded")
      img2 = loadImage("brest.jpg")

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
  //frameRate(30);
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
  menu.addBoolean("layer4", params.layer4, function (v) {
    params.layer4 = v
  })

  menu.addButton("render to svg", function () {
    createCanvas(width, height, SVG);
    draw();
    save(timestamp()); // give file name
    window.location.reload(0)
  })
}

function draw() {
  background(0)
  if (params.layer1 == true) {
    push()
    DrawViz1(color(255))
    pop()
  } 
  if (params.layer2 == true) {
 
    push()
    translate(10, 0)
    DrawViz1(color(255))
    pop()
  } 
  if (params.layer3 == true) {
    push()
    translate(-10, 0)
    DrawViz1(color(255))
    pop()
  }
  if (params.layer4 == true) {
    push()
    translate(10, -10)
    DrawViz1(color(255))
    pop()
  }
}




function DrawViz1(col) {
  push()

  strokeWeight(2)

  noFill()
  stroke(col)
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

  //////////////////////////////////////////
  translate(-10, -10)




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

  //////////////////////////////////////////////

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



  //////////////////////////////////////////////
  //background(255)
  strokeWeight(0)
  
  for (let i = 0; i < img2.width; i++) {
    for (let j = 0; j < img2.height; j++) {

      let col = img2.get(i, j)

      
      let sa = saturation(col)
      let br = brightness(col)
      let hu = hue(col)


      let pictoSizBR = map(br, 0, 100, 0, 5)
      let pictoSizHU = map(hu, 0, 300, 0, 5)
      let pictoSizSA = map(sa, 0, 150, 0, 5)


      let xpos = map(i, 0, img2.width, 0, width)
      let ypos = map(j, 0, img2.height, 0, height)


      push()
      textSize(pictoSizBR)
      translate(xpos, ypos)
      if (br > 90) {
        fill(255)
        textFont(typo)
        let index = int(random(characters.length))
        text(characters[index], 0, 0)
      }
      pop()

      push()
      textSize(pictoSizHU)

      if (hu > 200) {

        let index = int(random(characters.length))
        text(characters[index], 0, 0)
      }


      pop()
      
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



  //print(mouseX)
  //print(mouseY)



}





function timestamp() {
  return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}


function finContourPoints(param1, param2, arr) {


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



    // console.log(minX, maxX, minXpos, maxXpos)

  }
} 