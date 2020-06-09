

// on va utiliser la triangulation modifier notre image

let img
let menu

let params = { // tous les params nécessaire pour les sliders, la triangulation et l'export svg avec layer
    'tresholdR': 60,
    'tresholdV': 140,
    'tresholdB': 255,
    'coeffStrokeR' : 1,
    'coeffStrokeV' : 0.1,
    'coeffStrokeB' : 0.005,
    'weight' : 0.5,
    'numPoints' : 6000, // Le nombre de triangle dans la triangulation
    "layer1": true,
    "layer2": true,
    "layer3": false,
}

let points = [] // store the random points to create triangles coordinates
let coordinates = [] // store triangles coordinates

function preload() {
    img = loadImage("tib4.jpg",
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

    menu = QuickSettings.create(0, 0, "options") // on crée un menu
    // on va y mettre des sliders pour modifier les options comme on veut, notemment pour les seuil de couleur et les stroke weight
    menu.addRange("seuil Gray 1", 0, 255, params.tresholdR, 0.01, function (v) {
        params.tresholdR = v
        
    })
    menu.addRange("seuil Gray 2", 0, 255, params.tresholdV, 0.01, function (v) {
        params.tresholdV = v
        
    })
    menu.addRange("seuil Gray 3", 0, 255, params.tresholdB, 0.01, function (v) {
        params.tresholdB = v
        
    })
    menu.addRange("coeffStrokeR", 0, 1.5, params.coeffStrokeR, 0.01, function (v) {
        params.coeffStrokeR = v
        
    })
    menu.addRange("coeffStrokeV", 0, 0.5, params.coeffStrokeV, 0.01, function (v) {
        params.coeffStrokeV = v
        
    })
    menu.addRange("coeffStrokeB", 0, 0.1, params.coeffStrokeB, 0.001, function (v) {
        params.coeffStrokeB = v
        
    })
    menu.addBoolean("layer1", params.layer1, function (v) {
        params.layer1 = v
    })
    menu.addBoolean("layer2", params.layer2, function (v) {
        params.layer2 = v
    })
    menu.addBoolean("layer3", params.layer3, function (v) {
        params.layer3 = v
    })

    menu.addButton("export to SVG", function(){ // export en svg, on crée un bouton qui s'ajoutera dans le menu
        createCanvas(width,height,SVG)
        myDrawing()
        save(timestamp()+".svg")
        window.location.reload(0)
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
    noFill()
    noStroke()
    //strokeWeight(params.weight)

    // go through all the coordinates we calculated
    for (let i = 0; i < coordinates.length; i++) {

        // fin de the center of the current triangle
        let centerX = (coordinates[i][0][0] + coordinates[i][1][0] + coordinates[i][2][0]) * 0.333
        let centerY = (coordinates[i][0][1] + coordinates[i][1][1] + coordinates[i][2][1]) * 0.333

        // get the pixel color of the center
        let col = img.get(centerX, centerY)

        let gray = (red(col) + green(col) + blue(col)) * 0.33

        // reposition des coordonnées de l'image pour mettre en fullscreen
        let x1 = map(coordinates[i][0][0], 0, img.width, 0, width)
        let y1 = map(coordinates[i][0][1], 0, img.height, 0, height)

        let x2 = map(coordinates[i][1][0], 0, img.width, 0, width)
        let y2 = map(coordinates[i][1][1], 0, img.height, 0, height)

        let x3 = map(coordinates[i][2][0], 0, img.width, 0, width)
        let y3 = map(coordinates[i][2][1], 0, img.height, 0, height)


        if (gray < params.tresholdR) { // on utilise le params.treshold pour modier le seuil de la couleur
            if (params.layer1 == true){
            // draw the triangle with the right colors and the right positions
            stroke(255, 0, 0)
            strokeWeight(params.tresholdR*params.coeffStrokeR) // on utilise le params.coeffStrokR pour modifier l'épaisseur du contour
            //stroke(0)
            noFill()
            triangle(x1, y1, x2, y2, x3, y3)
        }
        }

        if (green(col) > params.tresholdR && gray < params.tresholdV) {
            if (params.layer2 == true){
            // draw the triangle with the right colors and the right positions
            stroke(0, 255, 0)
            strokeWeight(params.tresholdV*params.coeffStrokeV)
          //  stroke(0)
          noFill()
            triangle(x1, y1, x2, y2, x3, y3)

            }
        }
        if (blue(col) > params.tresholdV && gray < params.tresholdB) {
            if (params.layer3 == true){
            // draw the triangle with the right colors and the right positions
            //fill(0, 0, 0)
            noFill()
            stroke(0, 0, 255)
            strokeWeight(params.tresholdB*params.coeffStrokeB  )
            triangle(x1, y1, x2, y2, x3, y3)

            }
        }
    }

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}