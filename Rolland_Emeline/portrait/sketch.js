let img
let menu 

let params = {
    'slotSize' : 10,
    'seuil' : 120,
    'eltSize' : 30 
}


function preload() {
    img = loadImage("erolland.jpg",
        function () {
            console.log("image loaded")
            img.resize(45, 50)
            console.log(img.width, img.height)
        },
        function () {
            console.log("failure to load image")
        })
}

function setup() {
    createCanvas(450, 500)
    pixelDensity(1)
    background(255)
    imageMode(CENTER)

    menu = QuickSettings.create(0, 0, "options")
    

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

    for (let i = 0; i < img.width; i++) { // go through each pixel horizontally
        for (let j = 0; j < img.height; j++) { // for each horizontal pixel go through each row of pixel
            // get the color of the pixel located at the coordinate (i,j)
            let col = img.get(i, j)
            // get the rgb components of the color (for each pixel)
            let r = red(col) // value between 0-255
            let g = green(col) // value between 0-255
            let b = blue(col) // value between 0-255
            // get the hue, saturation and brightness of the color
            let hu = hue(col) // value between 0-360
            let sa = saturation(col) // value between 0-100
            let br = brightness(col) // value between 0-100

            // remap the position of pixels to fill the whole canvas
            let xpos = map(i, 0, img.width, 0, width)
            let ypos = map(j, 0, img.height, 0, height)
            // calculate the length of a segment : this will the size of a tile
            let len = width / img.width;
            // calculate a value depending on the brightness that we will use as the strokeweight
            let sw = map(br, 0, 100, 10, 0.1)
            strokeWeight(sw)
            stroke(0)
            noFill()

            if (g > 60) { // if the green component of the pixel is above 60
                // draw a line from top left corner of a tile to the bottom right corner
                line(xpos, ypos, xpos + len, ypos + len)
            } else {
                // draw a line from the bottom left corner of a tile to the top right corner
                line(xpos, ypos + len, xpos + len, ypos)
            }

        }
    }
}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}