let canvas = document.getElementById("defaultCanvas0");
let txt;
let grass;
let grassImg;
let grassWidth = 20;
let grassHeight = 10;
let tiles;
let tileImg;
let tileWidth = 210
let tileHeight = 45;
let tileX = 150;
let tileY = 10;
let str;
let str1;
let map = [];
let mapConfig = [];
let car;
let carVelx = 3.5;
let carVely = 3.5;
let carRotationAngle = 10;
// Preload function is used to load all the sound and the images. It is ran before the setup and draw functions : 
function preload(){
    // This txt variable is our data that we are going to read from the track.txt file :
    txt = loadStrings("track.txt")
    // Loading the images : 
    tileImg = loadImage("track11.png");
    carImg = loadImage("carsprite.png");
    grassImg = loadImage("grass2.png");
}
class Car{
    constructor(img,x,y,width,height){
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(){

    }
    race(){
        this.draw();
    }
}
// Our setup function which runs only once : 
function setup(){
    createCanvas(innerWidth, innerHeight);
    // Using for loop to iterate through every line of the track.txt file : 
    for(let j = 0; j < txt.length; j++){
        // Removing the spaces in every line : 
        str = txt[j].replace(/\s/g, '');
        // Pushing every line as a array in the array map : 
        map.push(str.split(""));
        // Important note : 
        // map array is an array of arrays and mapConfig takes all the map array values and converts them into a string which is then used to render the map. 
        // Now pushing that string into the mapConfig that we are going to use to render our map : 
        // This line here map[j].toString().replaceAll(",","") converts the map's array first chracter (array) ( which we just pushed into the map array ) into a string and because .toString() method returns a string with commas so we are replacing all the commas with blank string here too.
        mapConfig.push(map[j].toString().replaceAll(",",""));
    }
    // Creating our Grass here : 
    grass = new Group();
	grass.w = grassWidth;
	grass.h = grassHeight; 
    grass.addImage("normal",grassImg)
    grass.collider = "static"
	grass.tile = '0';
    // Creating our tiles : 
    tiles = new Group();
	tiles.w = tileWidth;
	tiles.h = tileHeight;
    tiles.addImage("normal",tileImg)
    tiles.collider = "none"
	tiles.tile = '1';
    // Displaying our tiles on the screen here :
    new Tiles(
		mapConfig,
		tileX,
		tileY,
		tileWidth - (tileWidth / 2) -40,
		tileHeight + 5,
	);
    car = createSprite(210, height/2, 40, 10);
    car.collider = "dynamic"
    car.addImage("normal",carImg);
}
let left = false;
let right = false;
let up = false;
let down = false;
function explosion(){
    console.log("Explosion!")
    remove(car)
    setTimeout(()=>{
        location.href = "gameover.html"
    })
}
// Our draw function here which runs over and over again: 
function draw(){
    background(255);
    if(left){ 
        if(car.rotation >= -90){
            car.rotationSpeed = -carRotationAngle;
        }
        if(car.rotation <= -90){
            car.rotation = -90;
        }
        car.vel.x = -carVelx;
        car.vel.y = 0;  
    }
    else if(right){
        if(car.rotation <= 90){
            car.rotationSpeed = carRotationAngle;
        }
        if(car.rotation >= 90){
            car.rotation = 90;
        }
        car.vel.x = carVelx;
        car.vel.y = 0;
    }
    else if(up){
        car.rotation = 0;
        car.vel.x = 0;
        car.vel.y = -carVely;
    }
    else if(down){
        car.vel.x = 0;
        car.vel.y = carVely;
        car.rotation = 180
    }
	if (kb.pressed('ArrowLeft')) {
        car.rotation = -90
        left = true;
        up = false;
        down = false;
        right = false;
	} 
    else if (kb.pressed('ArrowRight')) {
        right = true;
        up = false;
        down = false;
        left = false;
    }
    else if (kb.pressed('ArrowUp')) {
        up = true;
        right = false;
        left = false;
        down = false;
	} 
    else if (kb.pressed('ArrowDown')) {
        down = true;
        right = false;
        up = false;
        left = false;
    }
    car.collide(grass,explosion)
}












// addEventListener('resize',()=>{
//     canvas.width = innerWidth;
//     canvas.height = innerHeight
// })



// if(car.rotation > -90){
//     car.rotationSpeed = -carRotationAngle;
// }
// if(car.rotation < -90){
//     car.rotationSpeed = 0;
// }
