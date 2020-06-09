let img;




let points = []
let threshold = .75;


function preload() {

  // we load the image in the preload function - be sure to use a server of some kind
  img = loadImage("99.png",
    // success callback passed to load image
    function () {
      console.log("image loaded")
      img.resize(200, 200)
      for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
          
          let r = red(img.get(i,j));
          let g = green(img.get(i,j));
          let b = blue(img.get(i,j));
          if (r > 250 & g > 250 & b > 250) {} else {
            let val = random(0, 100);
            if (val < threshold) {
              points.push(new Point(i, j, r, g, b));
            }
          }
          //pixels[loc] = color(250, 250, 250);
        }
      }
    },
    // error callback passed to load image
    function () {
      console.log("failed to load image - try checking the path")
    }
  )
}




class Point {



  constructor(i, j, r, g, b) {
    this.x = i;
    this.y = j;
    this.red = r;
    this.blue = b;
    this.green = g;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getColor() {
    return color(this.red, this.green, this.blue);
  }

  show() {
    fill(color(red, green, blue));
    noStroke();
    circle(this.x, this.y, 5);
  }
}


function setup(){
  createCanvas(1000, 1000)

  background(255)

}


function draw(){
  background(255)
  for (let i = 0; i < points.length; i++) {
    for (let z = 0; z < i; z++) {
      if (dist(points[i].getX(), points[i].getY(), points[z].getX(), points[z].getY()) < 70) {
        let a = points[z].getColor();
        let b = points[i].getColor();
        stroke(a);
        strokeWeight(.65);
        let xpos1 = map(points[i].getX(), 0 , img.width, 0, width)
        let ypos1 = map(points[i].getY(), 0 , img.height, 0, height)
        let xpos2= map(points[z].getX(), 0 , img.width, 0, width)
        let ypos2 = map(points[z].getY(), 0 , img.height, 0, height)


        line(xpos1, ypos1, xpos2, ypos2);
      }

    
    }
  }


}



function timestamp() {

  return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
    nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s";

}