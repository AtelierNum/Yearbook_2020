//Ce programme est un créateur de gltich, il permet de créer des compositions variées à influence pop art. 
//L'utilisateur a besoin  juste de charger son image est de lancer le programme puis à utiliser les sliders pour créer sa compositions de glitchs colorimétriques perso.
//Pour la couleur les couches R,V et B sont séparé pour atteindre le maximum de palette de couleurs, nous avons aussi un slider pour un filtre "polirized" qui permet de créer une saturation de couleurs.
//Puis pour les effets de gliths nous avons un slider "distosion" qui permet de chosir la largeur du glitch et un autre slider "distorsion2" qui permet de gérer la hauteur de la zone du glitch ensuite une fonction random est affecté pour recrée l'effet de glitch.  
//L'utilisateur n'a plus qu'a appuyé sur le boutton "Render to pNG" pour téléchager sa composition personelle.





var img;
var filtre1;
//var filtre2;
let params = { //Déclaration des variables filtre, glitch et couleurs
  'filtre1': 120,
  //'filtre2' : 120,  // j'ai essayé de mettre un deuxième filtre mais après le programme bug...
  'opacity': 128,
  'distorsion': 50,
  'distorsion2': 0,
  'red': 10,
  'blue': 10,
  'vert': 10


}


function preload() {
  img = loadImage("RAL.jpg"); // Ligne pour charger son image
}

function setup() {
  createCanvas(1000, 1000);
  //background(255);



  menu = QuickSettings.create(0, 0, "options"); //Menu pour utiliser les sliders des effets et le boutton PNG 



  menu.addRange("red", 1, 255, params.red, 1, function (v) {
    params.red = v
  })

  menu.addRange("blue", 1, 255, params.blue, 1, function (v) {
    params.blue = v
  })

  menu.addRange("vert", 1, 255, params.vert, 1, function (v) {
    params.vert = v
  })

  menu.addRange("filter1", 2, 30, params.filter1, 1, function (v) {
    params.filtre1 = v
  })

  menu.addRange("distorsion", 10, 255, params.distorsion, 10, function (v) {
    params.distorsion = v
  });
  menu.addRange("distorsion2", 30, 1000, params.distorsion2, 10, function (v) {
    params.distorsion2 = v
  });






  menu.addButton("render to png", function () {
    save(timestamp() + JSON.stringify(params) + ".png")


  });

};



function draw() {
  tint(params.red, params.vert, params.blue, params.opacity); //application de l'effet de la couleurs
  filter(POSTERIZE, params.filtre1); // application du filtre 

  //colorMode(HSB, 100)
  image(img, 0, 0);


  var x1 = floor(random(width)); //Random de l'effet glitch 
  var y1 = 100;

  var x2 = round(x1 + params.distorsion2);
  var y2 = round(y1 + params.distorsion2);

  var w = floor(params.distorsion);
  var h = height - 100;

  set(x2, y2, get(x1, y1, w, h)) * 1000;


}




function timestamp() {
  return nf(year(), 4, 0) + "-" + nf(month(), 2, 0) + "-" + nf(day(), 2, 0) + "-" +
    nf(hour(), 2, 0) + "h" + nf(minute(), 2, 0) + "m" + nf(second(), 2, 0) + "s"
}