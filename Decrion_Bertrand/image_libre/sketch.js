let img
let menu
dataImage = []
let params = {
    'slotSize' : 0 ,
    'type' : 0 ,
    'formeType' : 0 ,
    'detailX' : 0
}


function preload() {
    img = loadImage("coo.jpg", function() {
        console.log("image loaded")
        img.resize(50,50)
        for(let i = 0; i < img.width ; i++){
            for(let j = 0; j < img.height ; j++){
                let col = img.get(i,j)
                let r = red(col)
                let g = green(col)
                let b = blue(col)
                let hu = hue(col)
                let sa = saturation(col)
                let br = brightness(col)
                dataImage.push(new pixelData(i,j,col,r,g,b,hu,sa,br))
            }
        }
        console.log("dataImage", dataImage )

    }, function() {
        console.log("error loading image")
    })
}
class pixelData {

    constructor(x,y,col,r,g,b,hu,sa,br){

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
    createCanvas(700, 700, WEBGL)
    setAttributes('antialias', true);
    pixelDensity(1)
    background(255)


    detailX = createSlider(3, 25, 3);
    detailX.position(10, height + 5);
    detailX.style('width', '140px');


    menu = QuickSettings.create(0,0, "options")
    //settings.addRange(title, min, max, value, step, callback)
  
    menu.addRange("Avancé des formes / slider en bas d'image pour faire opérer la magie", 0,0, params.slotSize, 1,function(v){
        params.slotSize = v
    })
    menu.addDropDown("type de transformation", ["teinte","saturation","luminosité","rouge"], 
    function(v){
        params.type = v.index
    })
    menu.addDropDown("type de forme", ["torus","cube","cone", "sphère"], 
    function(v){
        params.formeType = v.index
    })
    menu.addButton("render to SVG", function(){
        //reateCanvas(width,height, SVG)
        myDrawing()
        save(timestamp()+".jpg")
    })
   

    
  }


function draw() {
    myDrawing()
}

function myDrawing() {
   background(0)
   orbitControl()
   push()
    translate(-width*0.5, -height*0.5)
    noStroke()
    lights()
    //sphere(20)
    
   
    for(let i = 0 ; i < dataImage.length ; i++){
        push()
        let px = dataImage[i]
        fill (px.col)
        let offset
        if(params.type == 0){
            offset = px.hu
        }
        else if (params.type == 1){
            offset = px.sa
        }
        else if (params.type == 2){
            offset = px.br
        }
        else if (params.type == 3){
            offset = px.r
        }

        translate(px.x * 20 , px.y * 20, -1000 + offset * params.slotSize)

        if(params.formeType == 0){
            //rotateY(millis() / 1000);
            //ellipsoid(30, 40, 40, 12, detailX.value())
            torus(30, 15, detailX.value(), 12)
            //sphere(px.sa/5, detailX.value,16)
            
        }

        else if(params.formeType == 1) {
            box(15*detailX.value())
        }

        else if(params.formeType == 2){
            //cone(20)
            cone(30, 2*detailX.value(), detailX.value(), 16);
        }

        else if(params.formeType == 3){
            //torus(30)
            sphere(4*detailX.value(), detailX.value(), 16);
            
        }
       

        pop()
    }
        

   pop()
}

function render() {

}

function timestamp() {
    return "-" + +year() + "-" + month() + "-" + day() + "-" + hour() + "h" + minute() + "m" + second() + "s"
}