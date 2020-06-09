// mon image finale est une version géométrique, sobre et clair d'un visuel qui pourrait me représanter
// pour un year book.

let menu;

let img;

function preload() {
    img = loadImage("mmezard.jpg", function () {
            console.log("imageloaded")
            img.resize(100, 100)
        },

        function () {
            console.log("failed to load image - try checking the path")
        }
    )
}

// possibilité d'enregistrer l'image en SVG avec le menu quicksttings add a button

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)
    background(255)    
    
    menu = QuickSettings.create(0,0,"option")
    menu.addButton("render to svg", function () {
        createCanvas(width, height, SVG); 
        myDrawing(); 
        save(timestamp()); 
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
    strokeWeight(1)
   
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            let col = img.get(i, j)
            let gray = (red(col) + green(col) + blue(col)) * 0.33

            
            let xpos = map(i, 0, img.width, 100, width - 100)
            let ypos = map(j, 0, img.height, 100, height - 100)

            
            let tileSize = map(gray, -50, 255, width/img.width, -5) // let tileSize = map(gray, à modifier (0), 255, width/img.width, -30 à modifier (0))

            rectMode(CENTER)

            if (gray > 0 && gray < 600){ 
                rect(xpos,ypos,tileSize,tileSize)
            }

        }
    }

}

function timestamp() {
    return nf(year(),4,0) + "-" +nf(month(),2,0) + "-" + nf(day(),2,0) + "-" 
            + nf(hour(),2,0) + "h" + nf(minute(),2,0) + "m" + nf(second(),2,0) + "s"
}