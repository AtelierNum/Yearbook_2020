let img // décalre l'image
let dataImage = []
let menu // décalre le menu
let faReg // déclare la police regular
let faBold // déclare la police bold
let params = { // déclare les trois couches pour les trois couleurs
    "layer1" : true,
    "layer2" : true,
    "layer3" : true
}



function preload() {
    img = loadImage("26951799_1892814934364855_149510270652655335_o (1).jpg", function () { // charge l'image
        console.log("image loaded")
        img.resize(50, 50) // détermine les dimensions
        for (let i = 0; i < img.width; i++) {  
            for (let j = 0; j < img.height; j++) {
                let col = img.get(i, j)
                let r = red(col)
                let g = green(col)
                let b = blue(col)
                let hu = hue(col)
                let sa = saturation(col)
                let br = brightness(col)
                dataImage.push(new pixelData(i, j, col, r, g, b, hu, sa, br)) // permet d'associer chaque pixel à une couleur ou un paramètre 

            }
        }
        console.log(dataImage)
    })
    faReg = loadFont("../../assets/Font Awesome 5 Free-Regular-400.otf",
        function () {
            console.log("font awsome reg loaded")
        })

    faBold = loadFont("../../assets/Font Awesome 5 Free-Solid-900.otf",
        function () {
            console.log("font awsome bold loaded")
        })
}
class pixelData {
    constructor(x, y, col, r, g, b, hu, sa, br) {
        this.x = x
        this.y = y
        this.col = col
        this.r = r
        this.g = g
        this.b = b
        this.hu = hu
        this.sa = sa
        this.br = br
    }

}

function setup() {
    createCanvas(500, 500) // redéfinit la taille de l'écran
    pixelDensity(6)
    stroke(0) // met un contour noir
 
    menu = QuickSettings.create(0,0, "option") // créer un menu "option" en haut à gauche de l'écran 
    menu.addBoolean("layer1", params.layer1, function(v){ // paramètre pour la première couche de couleur
        params.layer1 = v
    })
    menu.addBoolean("layer2", params.layer2, function (v){ // paramètre pour la deuxième couche de couleur
        params.layer2 = v
    })
    menu.addBoolean("layer3", params.layer3, function (v){ // paramètre pour la troisième couche de couleur
        params.layer3 = v
    })

    menu.addButton("export to svg", function (){ // permet d'exporter les couche en format svg
        createCanvas(500, 500, SVG);
        myDrawing();
        save(timestamp()); // permet la sauvegarde
        window.location.reload(0)
    });

    textFont(faReg)


}

function draw() {
    myDrawing()

}

function myDrawing() {

    background(255) // fond blanc
    //shininess(50);
    //ambientLight(200);
    //specularColor(255, 0, 0);
    //pointLight(255, 0, 0, 0, -50, 50);
    //specularColor(0, 255, 0);
    //pointLight(0, 0, 0, 0, 50, 0);
    //specularMaterial(255);
    
   // translate(-width*0.5, -height*0.5)
   push()
   //translate(-width * 0.5, -height * 0.5)
   for (let i = 0; i < dataImage.length; i++) {
       let px = dataImage[i]
       let sphereS = map(px.br, 0, 120, 20, 0)
       push()
       noStroke()
       fill(px.col)
       
       //for(let i = 0 ; i < dataImage.length ; i ++){
        //let px = dataImage [i]
       // fill(px.r,0,0)
       // stroke(px.col)
       // push()
       translate(px.x * 10, px.y * 10) // adapte la taille des pixels à la taille de l'écran

        if (px.br < 100 && params.layer1 == true){ // tous les pixels dont la luminosité est en dessous de 100 se colorent en rose et prennent la forme d'un point
            fill(250,5,250)
           textFont (faBold)
           textSize(20) // taille du pixel
            text('.', 0, 0)
           
        }
        if (px.br > 5 && px.hu < 30 && params.layer2 == true){ // tous les pixels dont la luminosité est comprise entre 5 et 30 se colorent en beige et prennent la forme d'un oeuf
            fill(250,170,90,80) // transparence pour apporter de la texture au visage
            textFont (faBold)
            textSize(20)
             text('\uf7fb', 0, 0) // picto en forme d'oeuf

            }
         if (px.br > 0 && px.br < 45 &&  params.layer3 == true){ //tous les pixels dont la luminosité est comprise entre 0 et 45 se colorent en rose et prennent la forme de tranche de bacon jaune
            stroke(0)
            fill(255,255,0)
            textFont (faBold)
            textSize(20)
             text('\uf7e5', 0, 0) // met le picto du bacon 
            
        }
       
       
        //pop()
        pop()
    }
    pop()
}
   

function render() {


}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}