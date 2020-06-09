// Le code vient récupérer les donnéess de chaque pixel afin de remplacer ma photo par du texte, ici un poème d'Apollinaire gravé sur la tombe du douanier Rousseau. 
//La taille des lettres diffère en fonction du niveau de gris du pixel, le niveau de gris est calculé en additionnant le rouge le vert et le bleu.
// J'ai aussi joué sur les espaces entre les lettres et les espaces entre les lignes pour créer un texte moins lisible mais une image plus lisible 

var inputText = 'Nous t\'apporterons des pinceaux des couleurs des toiles Afin que tes loisirs sacrés dans la lumière réelle Tu les consacres à peindre comme tu tiras mon portrait La face des étoiles Tu te souviens, Rousseau, du paysage astèque, Des forêts où poussaient la mangue et l\'ananas, Des singes répandant tout le sang des pastèques Et du blond empereur qu\'on fusilla là-bas. Les tableaux que tu peins, tu les vis au Mexique, Un soleil rouge ornait le front des bananiers, Et valeureux soldat, tu troquas ta tunique, Contre le dolman bleu des braves douaniers.';
var fontSizeMax = 50;
var fontSizeMin = 5;
var spacing = 15; // espace entre les lignes
var kerning = 0.25; // espace entre les lettres

var fontSizeStatic = true;
var blackAndWhite = true;

var img;

var menu

var params = {
  fontSizeStatic: false,
  blackAndWhite: true,
  changeStyle: true,
  spacing: 15,
  kerning: 0.25, 
  fontSizeMax: 50,
  fontSizeMin: 5
}

function preload() {
  img = loadImage('forillard.jpg'); // charge l'image
}

function setup() {
  createCanvas(600, 650);
  textSize(10);
  textAlign(LEFT, CENTER);
  print(img.width + ' • ' + img.height);
  textFont("Josefin Sans") // choix de la typographie

  menu = QuickSettings.create(0, 0, 'options')


  menu.addBoolean("fixed sized", params.fontSizeStatic, function (v) {
    params.fontSizeStatic = v
    loop();
  })
  menu.addBoolean("black and white", params.blackAndWhite, function (v) {
    params.blackAndWhite = v
    loop();
  })
  menu.addBoolean("change style", params.changeStyle, function (v) {
    params.changeStyle = v
    loop();
  })
  menu.addRange("spacing", 0, 25, params.spacing, 1, function (v) {
    params.spacing = v
    loop();
  })
  menu.addRange("kerning", 0, 2.5, params.kerning, 0.05, function (v) {
    params.kerning = v
    loop();
  })
  menu.addRange("font size max", 0, 75, params.fontSizeMax, 1, function (v) {
    params.fontSizeMax = v
    loop();
  })
  menu.addRange("font size min", 0, 25, params.fontSizeMin, 1, function (v) {
    params.fontSizeMin = v
    loop();
  })
  menu.addButton("render to svg", function () {
   // createCanvas(600, 650, SVG); // create an SVG drawing context
    draw(); // fait le dessin
    save(timestamp()); // donne un nom et sauvegarde
   // window.location.reload(0) // recharge la fenêtre poru detruire le contenu du svg
});

}

function draw() {
  background(255);

  var x = 0;
  var y = 10;
  var counter = 0;

  while (y < height) {
    // traduit la positon (display) à la position (image)
    img.loadPixels();
    // prend la couleur de chaque pixel de l'image
    var imgX = round(map(x, 0, width, 0, img.width));
    var imgY = round(map(y, 0, height, 0, img.height));
    var c = color(img.get(imgX, imgY));
    var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071); // calcule la valeur de gris

    push();
    translate(x, y);

    if (params.fontSizeStatic) { // ce parametre fait que toutes les typo sont à la même taille
      textSize(params.fontSizeMax);
      if (params.blackAndWhite) {
        fill(0);
      } else {
        fill(c);
      }
    } else {
      // plus la vauleur de gris est élevée plus la taille de la typo va être grande
      var fontSize = map(greyscale, 0, 255, fontSizeMax, fontSizeMin); // la fonction map converti la valeur de gris en taille de typo
      fontSize = max(fontSize, 1);
      textSize(fontSize);
      if (params.blackAndWhite) {
        fill(0);
      } else {
        fill(c);
      }
    }

    if (params.changeStyle){ // pour tester la typographie en italique ou en gras
      if (brightness(c) < 100){
        textStyle(ITALIC)
      }
      else {
        textStyle(NORMAL)
      }
    }
    else {
      textStyle(BOLD)
    }

    var letter = inputText.charAt(counter);
    text(letter, 0, 0);
    var letterWidth = textWidth(letter) + params.kerning;
    // for the next letter ... x + letter width
    x += letterWidth;

    pop();

    // linebreaks
    if (x + letterWidth >= width) {
      x = 0;
      y += params.spacing;
    }

    counter++;
    if (counter >= inputText.length) {
      counter = 0;
    }
  }
  noLoop();
}

function keyReleased() { 
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png'); // permet de faire un export en png
  // change render mode
  if (key == '1') fontSizeStatic = !fontSizeStatic;
  // change la couleur
  if (key == '2') blackAndWhite = !blackAndWhite;
  print('fontSizeMin: ' + fontSizeMin + ', fontSizeMax: ' + fontSizeMax + ', fontSizeStatic: ' + fontSizeStatic + ', blackAndWhite: ' + blackAndWhite);
  loop();
}

function keyPressed() { // modifie la taille minimum et la taille maximum de ma typo
  // change fontSizeMax with arrow keys up/down
  if (keyCode == UP_ARROW) fontSizeMax += 2;
  if (keyCode == DOWN_ARROW) fontSizeMax -= 2;
  // change fontSizeMin with arrow keys left/right
  if (keyCode == RIGHT_ARROW) fontSizeMin += 2;
  if (keyCode == LEFT_ARROW) fontSizeMin -= 2;
  loop();
}

function timestamp() {
  return nf(year(),4,0) + "-" +nf(month(),2,0) + "-" + nf(day(),2,0) + "-" 
          + nf(hour(),2,0) + "h" + nf(minute(),2,0) + "m" + nf(second(),2,0) + "s"
}