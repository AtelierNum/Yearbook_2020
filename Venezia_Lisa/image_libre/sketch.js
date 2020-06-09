// image personel de mon père à la mer

let img

function preload() {
    img = loadImage("IMG_9626-2.jpg", function () {
        console.log("image loaded")
        img.resize(50, 50)
    })
}

function setup() {
    createCanvas(1000, 1000, WEBGL)
    pixelDensity(1)
}

function draw() {
    myDrawing()
}

function myDrawing() {
    background(255, 255, 255)
    orbitControl()
    lights()


    push()
    translate(-width * 0.5, -height * 0.5)


    for (let i = 0; i < img.width; i++) {

        for (let j = 0; j < img.height; j++) {
            let col = img.get(i, j)
            let br = brightness(col)
            let offset = map(br, 0, 100, 0, 1000)
            let sa = saturation(col)
            let r = red(col)
            let g = green(col)
            let b = blue(col)
            let angle = map(saturation(col), 0, 100, 0, TWO_PI)

            // couché de soleil en avant
            if (r > 10) {
                push()
                translate(i * 20, j * 20, -1000 + r)
                noFill()
                stroke(r * 100, g, sa * 9)
                ellipsoid(3)
                pop()
            }

            // ciel majorité
            if (170 < b) {
                push()
                translate(i * 20, j * 20, -1000 + g)
                noFill()
                strokeWeight(PI * 0.4)
                stroke(120, 80, b * 2)
                box(10, 10, 80)

                pop()
            }

            // mer majorité
            if (50 < g < 170) {
                push()
                translate(i * 20, j * 20, -1000 + g)
                noFill()
                strokeWeight(PI * 0.4)
                stroke(120, g, 203)
                box(10, 10, 80)

                pop()
            }

            // nuage,sable,perso en avant
            if (br) {
                push()
                translate(i * 20, j * 20, -800 + b)
                noFill()
                stroke(b * 20, random(offset), sa * 10)
                torus(random(sa), 1, 4, 2)
                pop()
            }

        }
    }
    // let col = img.get(i,j)
    //                 let r = red(col)
    //                 let g = green(col)
    //                 let b = blue(col)
    //                 let hu = hue(col)
    //                 let sa = saturation(col)
    //                 let br = brightness(col)
    pop()
    noLoop()


}


function render() {

}

function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}