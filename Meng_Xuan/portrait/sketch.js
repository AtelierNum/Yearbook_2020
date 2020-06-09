//utiliser les formes rectangles et circles pour représenter les pixels de l'image
//utiliser les différents couleurs pour le contour plus clair

let img;

let menu

// créer 3 couches pour séparer chaque couleur
let params = {
    

    "layer1": true,
    "layer2": true,
    "layer3": false
   
   
}

// enregistrer l'image
function preload() {
    img = loadImage("IMG_9165.JPG", function () {
        console.log("image loaded")
        img.resize(100,100)
    },function() {
        console.log("error loading image")

    })

}

function setup() {
    createCanvas(1000,1000)
    pixelDensity(1)
    background(255)
  
    menu = QuickSettings.create(0,0,"options")
    //(title,min,max)
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
    });
   

}


function draw() {
    myDrawing()
}

function myDrawing() {
    background(255)
    noFill()
    stroke(0)

        imageMode(CENTER)
    
      
            for (let i = 0; i < img.width; i++) {
                for (let j = 0; j < img.height; j++) {
                    // get image color
                    let col = img.get(i, j)
                    // get gray component by averaging red / green  and blue components
                    let gray = (red(col) + green(col) + blue(col)) * 0.33
        
                    // remap the position of pixels to fill the whole canvas
                    let xpos = map(i, 0, img.width, 50, width - 50)
                    let ypos = map(j, 0, img.height, 50, height - 50)
        
                    // calculate the size of a for accoring to the gray value
                    let tileSize = map(gray, 0, 255, width / img.width, 0)
        
                    rectMode(CENTER)
                    
        //utiliser les différents couleurs pour le contour plus clair

                    if (gray > 0 && gray < 55) { // if dark draw a rectangle
                        if (params.layer1 == true) {
                            stroke(217,83,131)
                            strokeWeight(2)
                            rect(xpos, ypos, tileSize, tileSize)
                        }
                    }
                    if (gray > 55 && gray < 500) { // if medium draw an ellipse
                        if (params.layer2 == true) {
                            stroke(248,166,166)
                            strokeWeight(2)
                            ellipse(xpos, ypos, tileSize, tileSize)
                        }
                    }
                    if (gray > 500 && gray < 700) { // if light draw a cross
                        if (params.layer3 == true) {
                            stroke(0,255,0)
                            line(xpos - tileSize / 2, ypos - tileSize / 2, xpos + tileSize / 2, ypos + tileSize / 2)
                            line(xpos - tileSize / 2, ypos + tileSize / 2, xpos + tileSize / 2, ypos - tileSize / 2)
                        }
                    }
                    // if lighter do nothing => keep white
                }
            }
        

      }

  



function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}