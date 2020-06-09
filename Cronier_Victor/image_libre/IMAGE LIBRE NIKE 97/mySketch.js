		
	///////////////////////////////////////// IMAGE LIBRE /////////////////////////////////////////
	////////////////////////////////////// VICTOR CRONIER G3B /////////////////////////////////////////	
	
	// Objectif : réaliser des nouvelles compositions d'images, animées. A l'aide d'une image ou d'une création.

	// Ce code permet de proposé un assemblage d'image animé, en prenant des segments d'images le programme va ensuite les disposer de façon aléatoire pour ensuite les animés. 
	// L'animation propose une déformation de l'image comme si les cellules s'entre-chocs.
	// l'écran est partagé en plusieurs segments sous forme d'un cadrillage, on peut augmenter ou diminuer le cadriage pour obtenir des compositions différentes, on peut aussi 
	// modifier le random d'image pour proposer encore différentes compositions. 
	// Une fois cette premiere opération effectué on peut maintenant intéragir avec la compositions, on peut jouer avec la taille de l'image en X ou en Y 
	// On peut lancer le mode Particules World qui propose une destructuration du code mais aussi de nouvelles compositions d'images, on peut aussi intéragir en X et en Y avec les particules
	// Il est possible de modifier certains paramètres plus classiques comme la couleurs du background (avoir des images en png : rendu plus intérésant), ainsi que la vitesse d'exécution du programme pour avoir une animation plus saccadée
		
	// Amélioration du Code : Proposer un système de segmentation de l'image interne au code sans passer par illustrator ou photoshop.
		
		
	let W = 2200 // variable pour définir la largeur de mon Canvas 
	let H = 1200 // variable pour définir la longeur de mon Canvas 
	let images = [] // Creer un groupe / un ensemble d'images pour simplifier l'appel lors du random(images)
	let seed = 1000 // variable pour définir un pseudo-random, permet de controler un random


	

	let menu // création du menu 
	let params = { // déclarer les valeurs de départ pour chaque paramètre / sliders lorsque l'on lance le programme 
	'splitscreen' : 1, 
	'couleursR' : 255,
	'couleursV' : 255,
	'couleursB' : 255,
	'Frame' : 1,
	'DispW' : 0,
	'DispH' : 0,
	'ParticulX' : 0,
	'ParticulY' : 0,
	'Rotat' : 0,
	'Seed' : 0
		
		

	}

	function preload() {

	// charger les images dans mon ensemble 'images' 
	images.push(loadImage('1.png'))
	images.push(loadImage('2.png'))
	images.push(loadImage('3.png'))
	images.push(loadImage('4.png'))
	images.push(loadImage('5.png'))
	images.push(loadImage('6.png'))




	}

	function setup() {
	createCanvas(W, H) // creer mon plan de travail à l'aide des variables W et H 
	
			
///////////////////////////// Création du menu et des sliders //////////////////////////////

		menu = QuickSettings.create(0, 0, 'Options')
		menu.addRange("splitscreen",1,10, params.splitscreen,1,  function(v){ // création slider pour séparer l'écran, minimum 1 - maximum 10 avec un pas de 1 en 1
					params.splitscreen = v
					console.log(v)
			})
		menu.addRange("couleursR",0,255, params.couleursR,1,  function(v){ // création slider de couleurs Rouge, minimum 0 - maximum 255 avec un pas de 1 en 1
					params.couleursR = v
					console.log(v)
		})
		menu.addRange("couleursV",0,255, params.couleursV,1,  function(v){
			params.couleursV = v
			console.log(v)
	})
		menu.addRange("couleursB",0,255, params.couleursB,1,  function(v){
			params.couleursB = v
			console.log(v)
	})
		menu.addRange("FRAME",1,10, params.Frame,1,  function(v){
			params.Frame = v
			console.log(v)
	})

	menu.addRange("DispositionW",0,200, params.DispW,1,  function(v){
		params.DispW = v
		console.log(v)
	})
	menu.addRange("DispositionH",0,200, params.DispH,1,  function(v){
		params.DispH = v
		console.log(v)
	})
	menu.addRange("Particules WORLD",0,360, params.Rotat,10,  function(v){
		params.Rotat = v
		console.log(v)
	})
	menu.addRange("Translate particule X",0,1000, params.ParticulX,10,  function(v){
		params.ParticulX = v
		console.log(v)
	})
	menu.addRange("Translate particule Y",0,1000, params.ParticulY,10,  function(v){
		params.ParticulY = v
		console.log(v)
	})
	menu.addRange("Random Seed",0,500, params.Seed,1,  function(v){
		params.Seed = v
		console.log(v)
	})



		





	menu.addButton("render to png", function(){ // // création du bouton de rendu PNG
		save(timestamp()+ ".png")
	});
	
		
		
	}

	function draw() {
		randomSeed(params.Seed) // Permet de proposer des compositions d'images aléatoire : On peut récupérer cette valeur de Seed pour obtenir une composition intéressante : Seed = 230 alors randomSeed(230) 
		
	background(params.couleursR,params.couleursV,params.couleursB); // background avec des sliders sur chaque paramètre pour modifier les couleurs en RVB
	

	divide(0, 0, width, height, params.splitscreen) // Permet de séparer l'écran, de le diviser : divide(position X,position Y,distance entre les images, distance entre les images, nombre de séparation d'écran)
	


	}

	///////////////////////////// function divide //////////////////////////////

	// Function pour définir les paramètres de la multiplication des cellules. Ainsi que l'animation des différentes cellules lors d'un 'choc'.

	function divide(x, y, w, h, pasdenom) {
		push()
		translate(params.ParticulX,params.ParticulY) // params.Particul permet de bouger en X et en Y les images
		rotate(radians(params.Rotat)) // permet de déconstruire le code et de proposer des particules, donne un effet chaos  
		if (pasdenom > 0) { // condition : si pasdenom est surpérieur à 0 alors ...
		const n = noise(w / width * params.Frame, w / height * params.Frame, frameCount / 800 * pasdenom) // params.frame pour modifier la fluidité du programme, et la vitesse de déplacement des éléments
		if (pasdenom-- % 2 === 1) {  // const est un conteneur pour une valeur, ici n qui est le noise (x,y,z)
		divide(x, y, w * n, h, pasdenom) // pour proposer l'animation lorsque les cellules se rencontrent, on multiplie la largeur par le noise donc on étire l'image à l'horizontale
		divide(x + w * n, y, w - w * n, h, pasdenom) // pour proposer l'animation lorsque les cellules se rencontrent, on multiplie la hauteur par le noise donc on étire l'image à la verticale
		pop()
		} else {
		
///////////// l'idée est de multiplié les conditions pour obtenir une fluidité dans les 'chocs' de cellules
			
		divide(x, y, w, h * n, pasdenom) 
		divide(x, y + h * n, w, h - h * n, pasdenom)
		}
	} else {
		
		image(random(images), x, y, w-params.DispW, h-params.DispH, 0, 0) // params.Disp W ou H permet de gérer l'image source : augmenter ou diminuer en X ou Y les images 
		// on appel l'ensemble images avec un random
	}




	}
	function timestamp() {
		return nf(year(),4,0) + "-" +nf(month(),2,0) + "-" + nf(day(),2,0) + "-" 
				+ nf(hour(),2,0) + "h" + nf(minute(),2,0) + "m" + nf(second(),2,0) + "s"
	}



