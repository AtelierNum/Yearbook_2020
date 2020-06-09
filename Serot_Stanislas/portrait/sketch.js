//Mon but premier était de faire un programme redessinant une image par grâce à des cercles.
//Pour cela j'ai décidé de faire le programme grâce à des "agents", permettant de dessiner par rapport aux couleurs et aux formes
//On trouvera différents réglages possibles des formes (épaisseur, opacité, etc)
//La démarche était de commander les agents pour qu'ils s'adaptent aux couleurs lors de leur passage au dessus d'une zone de la photo
//Ils empruntent différents chemin (360°) pour couvrir une grande partie de la zone, n'importe le sens
//On trouve également une suppression des agents sortant du plan de travail pour permettre d'en créer de nouveaux et faire que les agents respectent la forme initiale
//Résultat non 

let img
let menu

//paramètres pour le menu
let params = {
    'mult': 2,
    'opacity': 7,
    'stroke': 10,
    'mode': 0,
}

modes = ["hue", "saturation", "brightness", "red", "green", "blue"]

//permettre des agents mobile
let agents = []

function preload() {
    //importer une image
    img = loadImage("stansrt.png",
        function () {
            console.log("image loaded")
        },
        function () {
            console.log("failed to load image")
        }
    )
}

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)
    background(255)

    //création d'un menu
    menu = QuickSettings.create(0, 0, "options")

    //nombre de cercle par seconde
    menu.addRange("nombre", 0.1, 10, params.mult, 0.1, function (v) {
        params.mult = v
    })
    //changer l'opacité
    menu.addRange("opacité", 1, 255, params.opacity, 1, function (v) {
        params.opacity = v
    })
    //changer la taille
    menu.addRange("épaisseur", 0.5, 500, params.opacity, 0.1, function (v) {
        params.stroke = v
    })
    //menu des différents modes
    menu.addDropDown("mode de deformation", modes, function (v) {
        params.mode = v.index
        background(255)
    })

    //enregistrer en svg
    menu.addButton("export svg", function () {
        createCanvas(width, height, SVG)
        //nombre de répétitions (plus le nombre est haut, plus l'export svg sera dense et beau)
        for (let i = 0; i < 100; i++) {
            draw()
        }
        save(timestamp() + ".svg")
        window.location.reload(0)
    })

    //enregistrer en png
    menu.addButton("export png", function () {
        save(timestamp() + JSON.stringify(params) + ".png")
    })
    //Nombre d'agent déployé/en action
    for (let i = 0; i < 300; i++) {
        agents.push(new Agent((random(img.width)), (random(img.height))))
    }
}

function draw() {
    console.log(agents)
    for (let i = 0; i < agents.length; i++) {
        let a = agents[i]
        stroke(a.gray, 100) //noir et blanc/intensité
        noFill()
        ellipse(a.screenX, a.screenY, params.stroke, params.stroke) //création d'ellipse contrainte par stroke

        let vx
        let vy

        //direction dans lesquelles les agents peuvent bouger
        if (params.mode == 0) { //en fonction de la nuance
            vx = cos(hue(a.col) * TWO_PI / 360.)
            vy = sin(hue(a.col) * TWO_PI / 360.)
        } else if (params.mode == 1) {//en fonction de la saturation
            vx = cos(saturation(a.col) * TWO_PI / 360.)
            vy = sin(saturation(a.col) * TWO_PI / 360.)
        } else if (params.mode == 2) {//en fonction de la luminosité
            vx = cos(brightness(a.col) * TWO_PI / 360.)
            vy = sin(brightness(a.col) * TWO_PI / 360.)
        } else if (params.mode == 3) {//en fonction du rouge
            vx = cos(red(a.col) * TWO_PI / 255.)
            vy = sin(red(a.col) * TWO_PI / 255.)
        } else if (params.mode == 4) {//en fonction du vert
            vx = cos(green(a.col) * TWO_PI / 255.)
            vy = sin(green(a.col) * TWO_PI / 255.)
        } else if (params.mode == 5) {//en fonction du bleu
            vx = cos(blue(a.col) * TWO_PI / 255.)
            vy = sin(blue(a.col) * TWO_PI / 255.)
        } 

        
        a.screenX += vx * params.mult;
        a.screenY += vy * params.mult;

        //pour qu'en temps réel il s'adapte aux couleurs
        a.update()

        //si un agent dépasse du plan, il est supprimé et remplacé
        if (a.screenY < 0 || a.screenY > height || a.screenX < 0 || a.screenX > width) {
            agents.splice(i, 1) // en enlevant la suppresion, l'image se fait encore plus clair mais beaucoup plus gourmande donc lourde à exporter
            agents.push(new Agent(random(img.width), random(img.height)))
        }
    }
}
    
class Agent {
    //traitement selon les nuances de l'image pour que les agents prennent la bonne couleur
    constructor(imgX, imgY) {
        this.imgX = imgX
        this.imgY = imgY

        this.col = img.get(imgX, imgY)
        this.gray = (red(this.col) + blue(this.col) + green(this.col)) * 0.7 //pourcentage par couleur trop élevé pour permettre d'enlever le fond et faire des images plus legères

        this.screenX = map(this.imgX, 0, img.width, 0, width)
        this.screenY = map(this.imgY, 0, img.height, 0, height)

        this.x = noise(this.imgX / img.width)
        this.y = noise(this.imgY / img.height)
    }
    update() {
        this.imgX = (map(this.screenX, 0, width, 0, img.width))
        this.imgY = (map(this.screenY, 0, height, 0, img.height))

        this.col = img.get(this.imgX, this.imgY)
        this.gray = (red(this.col) + blue(this.col) + green(this.col)) * 0.5
    }
}
//date en temps réel quand le programme est actif
function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
        nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}

//StanislasSEROT