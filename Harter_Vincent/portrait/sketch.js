let params = {  //Nous avions ensemble compris comment fonctionner le code pour le modifier et permettre les transformation sur le navigateur le 16 avril. Aujourd'hui j'ai voulu annoté le code mais depuis j'ai un peu oublié son fonctionnement, il n'y a donc pas beaucoup d'annotation.
				//L'export svg ne marche plus non plus. Mais j'en avais sauvergardé avant j'espère que cela suffira.
    'taille' : 4

}



var path, position, maxRadius, img, center, zoom;
var count = 0;
var grow = true;

function preload(){
	img = loadImage("vharter.jpg", _img => _img.loadPixels());
}

function setup() {
	zoom = min(windowWidth/img.width, windowHeight/img.height);
	createCanvas(img.width * zoom, img.height * zoom,);
	noStroke();
	fill(0);

	
	
	maxRadius = min(width, height) * 0.5;
	center = createVector(width/2, height/2);
	position = center.copy();
    path = [];
    
    menu = QuickSettings.create(0,0, "options")
    menu.addRange("3D+",0,8, params.taille,0.5, function(v){
        params.taille = v
	})
	
	menu.addButton("render to svg", function () {
        createCanvas(img.width * zoom, img.height * zoom, SVG);
        myDrawing();
        save(timestamp()); // give file name
        window.location.reload(0)
    });

    menu.addButton("regenerate", function (v) {
        grow = true
        path = [];
        count = 0;
        zoom = min(windowWidth / img.width, windowHeight / img.height);
        maxRadius = min(width, height) * 0.5;
        center = createVector(width / 2, height / 2);
        position = center.copy();
        //console.log(grow)
    })


    
}

function draw() {



	myDrawing()
	
	


}

function growSpiral() {

	
	


	count++;
	var vector = p5.Vector.fromAngle(radians(count * 5), count / 100);
	var rot = vector.copy().rotate(HALF_PI);
	let imgPos = position.copy().add(vector).div(zoom);
	var color = brightness(img.get(imgPos.x, imgPos.y)) / 255;
	var value = color ? (1 - color) * params.taille : 0;  //5 epaisseur
	rot.setMag(Math.max(value, 0.2));
	path.push(position.copy().add(vector).sub(rot));
	path.unshift(position.copy().add(vector).add(rot));
	position.add(vector);






}

function myDrawing() {

	background(255);

	
	


	if (grow) {
		for (var i = 0, l = count / 100 + 0.2; i < l; i++) {  //100 =vittesse
			growSpiral();
		}
		grow = dist(center.x, center.y, position.x, position.y) < maxRadius;
	}
	
	beginShape();
		path.forEach(vec => vertex(vec.x, vec.y));
	endShape();
   
	growSpiral()

}

function render() {

}




function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}



