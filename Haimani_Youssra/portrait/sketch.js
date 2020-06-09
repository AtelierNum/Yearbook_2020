let img;

let params = {
    "layer1": true,
    "layer2": true,
    'mult': 5,
    'strokeW': 2.5,
    'fill': true,
    'curves': true,
    'curveTightness': 1, 
    'nS' : 5364
}



function preload() {
    img = loadImage("youss.png",
        function () {
            console.log("image loaded")
            img.resize(100, 100)
        },
        function () {
            console.log("failed to load image - try checking the path")
        }
    )
}

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)
    background(255)

    menu = QuickSettings.create(0, 0, "options");

    menu.addBoolean("layer1", params.layer1, function (v) {
    params.layer1 = v
})

menu.addBoolean("layer2", params.layer1, function (v) {
    params.layer2 = v
})

    noiseSeed(params.nS)
    
    menu.addButton("export SVG",function(){
        createCanvas(width, height, SVG)
        myDrawing()
        save(timestamp()+".svg")
    })
}

function draw() {
    myDrawing()
}

function myDrawing() {

    background(255)

    // layer 1 rouge
    if (params.layer1 == true) {
        fill(170, 0, 50) // apply the opacity parameter
        noStroke()
    } else {
        noFill()
    }


    // apply a few more paramaters
     if (params.layer2 == true){
        stroke(0, 0, 100) 
    } else {
        noStroke()
    }
    strokeWeight(params.strokeW)
    curveTightness(params.curveTightness)

    // we want to draw vertical lines, so we start by going through a horizontal line
    for (let i = 0; i < img.width; i++) {
        // relie les points verticalement
        beginShape()
        for (let j = 0; j < img.height; j++) {
            // générer couleur
            let col = img.get(i, j)
            let gray = (red(col) + green(col) + blue(col)) * 0.3

            // remap the position of pixels to fill the whole canvas
            let xpos = map(i, 0, img.width, 0, width)
            let ypos = map(j, 0, img.height, 0, height)

            // get the grasp of the space between to pixels in the real canvas
            let tileSize = width / img.width

            // calculate the horizontal displacement
            let xOffset = map(noise(gray / 255), 0, 1, -tileSize * params.mult, tileSize * params.mult)

            // paramètre courbe/ligne
            if (params.curves) {
                curveVertex(xpos + xOffset, ypos)
            } else {
                vertex(xpos + xOffset, ypos)
            }
        }
        endShape(CLOSE) // ferme la forme
    }

}

function timestamp() {
    return nf(year(),4,0) + "-" +nf(month(),2,0) + "-" + nf(day(),2,0) + "-" 
            + nf(hour(),2,0) + "h" + nf(minute(),2,0) + "m" + nf(second(),2,0) + "s"
}
