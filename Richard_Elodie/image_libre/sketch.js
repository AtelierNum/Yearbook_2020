let img
let menu
let params ={
    'layer1' : true, // will be buttons
    'layer2' : true,
    'layer3' : true 
}
let dataImage = [] // a tabler to stock the data


function preload() {

    img = loadImage("portrait.jpg", function(){
        console.log ("image loaded")
        img.resize(50,55)
        console.log (img.width,  img.height)
        for (let i = 0; i < img.width; i++) { // reed the image
            for (let j = 0; j < img.height; j++) {

                let col = img.get(i,j) // collect data
                let r = red(col)
                let v = green(col)
                let b = blue(col)
                let hu = hue(col)
                let sat = saturation(col)
                let bri = brightness(col)
                dataImage.push(new pixelData (i,j,r,v,b,bri,hu,sat,col)) // no use for all of them but keped them anyway

            }
        }
        console.log(dataImage)
        }, function(){
        console.log ("failiure to load image")
    })  

    class pixelData{

    constructor(x,y,r,v,b,bri,hu,sat,col){ // no use for all of them but keped them anyway
        this.x = x // position
        this.y = y // position
        this.r = r
        this.v =v
        this.b = b
        this.bri = bri // the one I used as it's a contrasted B&W picture
        this.hu = hu
        this.sat = sat
        this.col = col
    }}
}

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)

    menu = QuickSettings.create(0,0, "options")

    menu.addBoolean("layer1", params.layer1, function(v) { // buttons creating layers to separate svg files by color
        params.layer1 = v
    })
    menu.addBoolean("layer2", params.layer2, function(v) {
        params.layer2 = v
    })
    menu.addBoolean("layer3", params.layer3, function(v) {
        params.layer3 = v
    })

    menu.addButton("export SVG", function () { // to export
        createCanvas(width, height, SVG);
        for (let i = 0; i < 1000; i++) {
            draw();
        }

        save(timestamp()); // names the file
        window.location.reload(0)
    })

}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(0) // made on a black screen but works on white paper
    noStroke()
    
    for (let i = 0; i < dataImage.length; i++) { // reeds the data as it reeds the image / pixel after pixel
        push()
        let px = dataImage[i] 

        let lum = map(px.bri, 0, 100, 10, 1) // mapping for the number of lines based on the brightness
        translate (px.x * 20 + 10, px.y * 20 + 10) // interval
        for (let j = 0; j < 10; j+= lum) { // centered / lines * 2
            
            
            if (px.bri < 9) { // 1st conditions to create colors with the B&W picture
                fill(170, 60, 200)

                if (params.layer1 == true){ // button to write or not the red lines
                    rect (j+10, 5, 10, 10)
                    rect (-j+10, 5, 10, 10)
                }
            }
            else {

                if (px.bri < 40) { // 2nd conditions to avoid writing the same lines in 2 colors
                    fill(0,230,250)

                    if (params.layer2 == true){ // button to write or not the blue lines
                        rect (j, 10, 10, 10)
                        rect (-j, 10, 10, 10)
                    }   
                }

                else {
                    fill(100, 250, 150)

                    if (params.layer3 == true){ // button to write or not the green lines
                        rect (j, 0, 10, 10)
                        rect (-j, 0, 10, 10)
                    }
                }
            }
            
        }

        pop()
    }
   
}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s" // to differenciate svg files
}