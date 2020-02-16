const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;
const canvas = document.getElementById("cnv");
const ctx = canvas.getContext('2d');
const FPS = 60;
let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed;
let drawLoop = true;
let showFPS = false;
let counter = 0;
let timeInterval = FPS * 1
let player;
let seconds = -1;

// load images
let sun = new Image();
sun.src = 'imgs/sun.png';
let sunOffset = 0;
let SUN_VELOCITY = 0;

let sky = new Image();
sky.src = 'imgs/clouds.png';
let skyOffset = 0;
let SKY_VELOCITY = 12;

let largeTree = new Image();
largeTree.src = 'imgs/tree_large.png';
let largeTreeOffset = 0;
let LARGETREE_VELOCITY = 0.5;

let grass = new Image();
grass.src = 'imgs/grass2.png';
let grassOffset = 0;
let GRASS_VELOCITY = 0.95;

/**
 * clear the canvas
 */
function clearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
* @param {w} width %
* @param {h} height %
*/
function resizeCanvas(w, h) {
	canvas.width = window.innerWidth / 100 * w;
	canvas.height = window.innerHeight / 100 * h;
};

function displayFPS() {
	// draw the FPS;
	ctx.font = '30px Arial Black';
	ctx.textAlign = 'left';
	ctx.textBaseline = "top"; 
	ctx.fillStyle = 'rgb(255, 255, 255)';

	let sinceStart = now - startTime;
	let currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
	ctx.fillText(currentFps, 10, 10, 300);
};

// initialize the timer variables and start the animation
function startAnimating(FPS) {
    fpsInterval = 1000 / FPS;
    then = performance.now();
    startTime = then;
    draw();
};

function loop() {
	drawLoop = true;
};

function noLoop() {
	drawLoop = false;
};

function setup() {
	resizeCanvas(100, 100);
	world = new World();
	player = new Player();
	startAnimating(FPS);
};

function displayText(text, x, y) {
	ctx.font = '40px Arial';
	ctx.textAlign = 'left';
	ctx.textBaseline = "top"; 
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillText(text, x, y);
};

function draw() {
    // request another frame
	requestAnimationFrame(draw);

    // calc elapsed time since last loop
    now = performance.now();
    elapsed = now - then;

	if(!drawLoop) return;

	//** DRAW START **/
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your specified fpsInterval not being a multiple of RAF's interval (16.7ms)
		then = now - (elapsed % fpsInterval);

		// clear the screen
		clearScreen();

		ctx.drawImage(sun, canvas.width-500, 0, 200, 200);
		skyOffset = skyOffset < canvas.width ? skyOffset + SKY_VELOCITY / FPS : 0;
		grassOffset <= 0 ? grassOffset = 0 : grassOffset + GRASS_VELOCITY / FPS;
		largeTreeOffset <= 0 ? largeTreeOffset = 0 : largeTreeOffset + LARGETREE_VELOCITY / FPS;

		// sky
		ctx.save();
		ctx.translate(-skyOffset, 0);
		ctx.drawImage(sky, 0, 0);
		ctx.drawImage(sky, sky.width - 1, 0);
		ctx.restore();

		// trees large
		ctx.save();
		ctx.translate(-largeTreeOffset, 0);
		ctx.drawImage(largeTree, 0, canvas.height - largeTree.height);
		ctx.translate(-largeTreeOffset, 0);
		ctx.drawImage(largeTree, canvas.width / 10 * 2.1, canvas.height - largeTree.height);
		ctx.translate(-largeTreeOffset, 0);
		ctx.drawImage(largeTree, canvas.width / 10 * 8, canvas.height - largeTree.height);
		ctx.translate(-largeTreeOffset, 0);
		ctx.drawImage(largeTree, canvas.width / 10 * 5.25, canvas.height - largeTree.height);
		ctx.translate(-largeTreeOffset, 0);
		ctx.drawImage(largeTree, canvas.width / 10 * 10.25, canvas.height - largeTree.height);
		ctx.translate(-largeTreeOffset, 0);
		ctx.drawImage(largeTree, canvas.width / 10 * 2.75, canvas.height - largeTree.height);
		ctx.translate(-largeTreeOffset, 0);
		ctx.drawImage(largeTree, canvas.width / 10 * 9.75, canvas.height - largeTree.height);
		ctx.restore();

		// grass
		ctx.save();
		ctx.translate(-grassOffset, 0);
		ctx.drawImage(grass, 0, canvas.height-50, grass.width, canvas.height / 100 * 8);
		ctx.restore();
	

		// check keyboard input
		checkKeyboardInput();

		if(showFPS) {
			displayFPS();
		};
		// timer based 
		if (counter % timeInterval == 0) {
			seconds++;
		};
		counter++;

		player.update();
		player.draw();

		ctx.font = '40px Arial';
		ctx.textAlign = 'right';
		ctx.textBaseline = "top"; 
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.fillText(seconds, canvas.width-10, 10, 200);
		
	};
};

document.addEventListener('DOMContentLoaded', (evt) => {
	resizeCanvas(100, 100);
}, true);

window.addEventListener('resize', (evt) => {
	//resize the canvas here
	resizeCanvas(100, 100);
}, true);

setup();