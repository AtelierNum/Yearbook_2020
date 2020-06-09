// Pour l'image source j'ai choisi une photo d'une de mes peintures car je voulais explorer les posibilités de transformation de mon image.
// J'ai donc choisi de la travailler sous forme de différents triangles placés aléatoirement afin d'avoir une image très géométrique qui fait abstraction de toutes les courbes que j'avais pu peindre sur ma toile.
// Le code permet aussi de modifier totalement les couleurs de remplissage des triangles avec les curseurs R V et B, ainsi, les couleurs du filet, les coutours des triangles restent dans les couleurs de l'image source(sauf en mode niveau de gris).

let img;

let menu

let points = []
let coordinates = [] // puor que les triangles soient en relation les un avec les autres et pas qu'ils soient les uns par dessus les autres
let params = {
    numPoints :150,
    animationSpeed : 1,
        length : 10,
        grayscale : false,
        couleurR : 255,
        couleurV : 255,
        couleurB : 255,
        opacity : 100

}

// pour classer toutes les informations des pixels

function preload() {
    // on charge l'image dans la fonction preload
    img = loadImage("service.jpg",
        // message qui s'affiche si l'image s'est bien chargée
        function () {
            console.log("image loaded")
        },
        
    )
}


function setup() {
    createCanvas(1000, 900)
    pixelDensity(1)
    background(255)

// pour gérer le nombre de points qui créeront les triangles
    menu = QuickSettings.create(0, 0, "options")
    menu.addRange("number of points", 10, 1000, params.numPoints, 1, function (v) {
        params.numPoints = v
        initPoints()
    })
    // pour modifier la vitesse de modification des triangles
    menu.addRange("movement speed", 1, 100, params.animationSpeed, 1, function (v) {
        params.animationSpeed = v
        initPoints()
    })
// paramètres couleur rouge
    menu.addRange("couleur rouge", 0, 1, params.couleurR, 0.1, function (v) {
        params.couleurR = v
        initPoints()
    
    })
    // paramètres couleur vert
    menu.addRange("couleur vert", 0, 1, params.couleurV, 0.1, function (v) {
        params.couleurV = v
        initPoints()
    
    })
    // paramètres couleur bleu
    menu.addRange("couleur bleu", 0, 1, params.couleurB, 0.1, function (v) {
        params.couleurB = v
        initPoints()
    
    })
    // paramètres opacité
    menu.addRange("opacitée", 1, 100, params.opacity, 1, function (v) {
        params.opacity = v
        initPoints()
    
    })
    // ajoute un bouton au menu pour passer de la couleur de basse en niveau de gris
    menu.addBoolean('niveaux de gris', params.grayscale, function(v){
        params.grayscale = v
    })
    //bouton pour l'export png
    menu.addButton("export PNG",function(){
        save(timestamp()+".png")
        
            })


   
    initPoints()


}

function initPoints() {

    points = []
    coordinates = []

    for (let i = 0; i < params.numPoints; i++) {
        let px = random(img.width)
        let py = random(img.height)
        points.push([px, py])
    }

    //console.log(points)
    const delaunay = Delaunator.from(points);

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
    
    // parcour les points
    for (let i = 0 ; i < params.numPoints ; i++){
        // add a little noise to their position - the noise will change according to the frameCount
        points[i][0] = points[i][0] + map(noise(i, frameCount/100.), 0, 1, -0.1*params.animationSpeed, 0.1*params.animationSpeed)
        points[i][1] = points[i][1] + map(noise(i, frameCount/150.), 0, 1, -0.1*params.animationSpeed, 0.1*params.animationSpeed)
        // avoid them going out of the image
        points[i][0] = constrain(points[i][0], 0, img.width)
        points[i][1] = constrain(points[i][1], 0, img.height)
    }

    let delaunay = Delaunator.from(points); // run the algorithm
    coordinates = [] // reset coordinates
    // fill the coordinates from the algorithm calculation
    for (let i = 0; i < delaunay.triangles.length; i += 3) {
        coordinates.push([
            points[delaunay.triangles[i]],
            points[delaunay.triangles[i + 1]],
            points[delaunay.triangles[i + 2]]
        ]);
    }

    for (let i = 0; i < coordinates.length; i++) {
       
        let centerX = (coordinates[i][0][0] + coordinates[i][1][0] + coordinates[i][2][0]) * 0.333
        let centerY = (coordinates[i][0][1] + coordinates[i][1][1] + coordinates[i][2][1]) * 0.333

        
        let col = img.get(centerX, centerY)

        let x1 = map(coordinates[i][0][0], 0, img.width, 0, width)
        let y1 = map(coordinates[i][0][1], 0, img.height, 0, height)

        let x2 = map(coordinates[i][1][0], 0, img.width, 0, width)
        let y2 = map(coordinates[i][1][1], 0, img.height, 0, height)

        let x3 = map(coordinates[i][2][0], 0, img.width, 0, width)
        let y3 = map(coordinates[i][2][1], 0, img.height, 0, height)

        if (params.grayscale == true){
            col = (red(col) + green(col) + blue(col))*0.33
        }
        fill(red(col)*params.couleurR,green(col)*params.couleurV,blue(col)*params.couleurB)
        stroke(col)
        triangle(x1, y1, x2, y2, x3, y3)
        
    }
   
}



function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}