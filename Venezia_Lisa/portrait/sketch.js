// le but était de créer un jeu visuel.
// il est intéressent de jouer avec le lecteur. l'image ne fonctionne pas sans lecteur.

// Je t'invite à jouer cette experience. Il faut floutter les yeux ou plissier des yeux. Mais également avec un je de distance,
// plus l'écran est loin plus on peut voir l'image avec des détails.
// Avec ce processus l'image en fait apparaitre une plus détaillé, fait apparaitre une autre image.

let img

let menu

function preload() {
    img= loadImage("lvenezia.jpg", function(){
    console.log("image loaded")
    img.resize(50,50)
    })
}

function setup() {
    createCanvas(1000, 1000)
    pixelDensity(1)

    menu= QuickSettings.create(0,0,"option")

    menu.addButton("export svg",function(){
        createCanvas(width,height,SVG)
        myDrawing()
        save(timestamp()+".svg")
    })
}

function draw() {
    myDrawing()
}

function myDrawing() {
   background(0)

   push()



   for( let i = 0; i < img.width; i++){
    for( let j = 0; j < img.height; j++){
        let col = img.get(i,j)
        let br = brightness(col)
        let offset = map(br, 0,100, 0, 1000) // crée un décalage de luminosité
        let sa = saturation(col)
        let r = red(col)
        let g = green(col)
        let b = blue(col)
        
    // création rectangle == crée le jeu de vision
         if( g >20){
            push()
            translate(i*20, j*20, -1000+ g)
            noFill()
            stroke(20,g,200)
            rect(15,15,offset,2)
            pop()
                }

        // création ellipse 
        if( g >100){
        push()
        translate(i*20, j*20, -1000+ r)
        noFill()
        stroke(r, br, br*2 , br)
        ellipse(sa,20,sa,g)
        pop()
        }
 
        }
}
   pop()


}

function render() {

}

function timestamp() {
    return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
    nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"}