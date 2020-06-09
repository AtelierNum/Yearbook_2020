let img
let menu

let params = {
    'treshold': 1,
    'width' : 2,
    'weigth' : 0.9,
    'height' : 5,
    numPoints : 3500,
}

let points = [] // store the random points to create triangles coordinates
let coordinates = [] // store triangles coordinates

function preload() {
    img = loadImage("caca.jpeg",
        function () {
            console.log("image loaded")
            img.resize(100, 100)
        },
        function () {
            console.log("error loading image")
        }

    )

}

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)
    background(0)
    initPoints()

    menu = QuickSettings.create(0, 0, "options")
    menu.addRange("seuil R", -2, 4, params.treshold, 0.01, function (v) {
        params.tresholdR = v
        
    })
    menu.addRange("seuil V", -2, 4, params.treshold, 0.01, function (v) {
        params.tresholdV = v
        
    })
    menu.addRange("seuil B", -2, 4, params.treshold, 0.01, function (v) {
        params.tresholdB = v
        
    })
    menu.addRange("width", -500, 500, params.width, 0.1, function (v) {
        params.width = v
        
    })
    menu.addRange("strokeweight", 0, 3, params.weight, 0.1, function (v) {
        params.weight = v
        
    })
    menu.addRange("height", -500, 500, params.height, 0.1, function (v) {
        params.height = v
        
    })
    menu.addButton("export PNG", function(){
        save(timestamp()+".png")
    })

    menu.addButton("export SVG", function(){
        createCanvas(width,height,SVG)
        myDrawing()
        save(timestamp()+".svg")
    })

    
}

function initPoints() {

    // reset array of points and coordinates
    points = []
    coordinates = []

    // add a certain number of random points to the points array
    for (let i = 0; i < params.numPoints; i++) {
        let px = random(img.width)
        let py = random(img.height)
        points.push([px, py])
    }
    // do calculate the triangles
    const delaunay = Delaunator.from(points);
    // get the triangles from the library and add them to our coordinates array
    for (let i = 0; i < delaunay.triangles.length; i += 3) {
        coordinates.push([
            points[delaunay.triangles[i]],
            points[delaunay.triangles[i + 1]],
            points[delaunay.triangles[i + 2]]
        ]);
    }
    //console.log(coordinates);
}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(0)
    //image(img,0,0)
    strokeWeight(params.weight)
    for (let i = 0; i < coordinates.length; i++) {
        

        // fin de the center of the current triangle
        let centerX = (coordinates[i][0][0] + coordinates[i][1][0] + coordinates[i][2][0]) * 0.333
        let centerY = (coordinates[i][0][1] + coordinates[i][1][1] + coordinates[i][2][1]) * 0.333
    
        // get the pixel color of the center
        let col = img.get(centerX, centerY)
    
        // remap the position from images coordinates to fullscreen
        let x1 = map(coordinates[i][0][0], 0, img.width, 0, width)
        let y1 = map(coordinates[i][0][1], 0, img.height, 0, height)
    
        let x2 = map(coordinates[i][1][0], 0, img.width, 0, width)
        let y2 = map(coordinates[i][1][1], 0, img.height, 0, height)
    
        let x3 = map(coordinates[i][2][0], 0, img.width, 0, width)
        let y3 = map(coordinates[i][2][1], 0, img.height, 0, height)
    
        // draw the triangle with the right colors and the right positions
        //noFill()
        fill(y3*params.tresholdR,x2*params.tresholdV,x3*params.tresholdB)
        //stroke(y3,x2,x3)
        stroke(col)
        triangle(x1, y1, x2, y2, x3, y3)
       
       
    }
}

function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}