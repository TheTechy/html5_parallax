class Player{
	constructor() {
		this.x = 0;
		this.y = 100;
		this.vX = 1;
		this.vY = 1;
		this.radius = 15;
		this.gravity = 1.8;
		this.friction = 0.9;
		this.lift = -70;
		this.jumping = true;
	};

	detectEdges() {
		// if(this.y + this.radius*2 >= canvas.height) {
		if(this.y + this.radius*2 >= world.floor) {
			this.y = world.floor - this.radius*2;
			this.jumping = false;
		} else if(this.y - this.radius*2 <= 0 ) {
			this.y = 0 + this.radius*2;
		};

		if(this.x + this.radius*2 >= canvas.width) {
			this.x = canvas.width - this.radius*2;
		} else if(this.x - this.radius*2 <= 0 ) {
			this.x = 0 + this.radius*2;
		};
	};

	update() {
		this.vY += this.gravity;
		this.vY *= 0.9;
		this.y += this.vY;

		this.vX *= this.friction;
		this.x += this.vX;

		this.detectEdges()
	};

	draw() {
		ctx.fillStyle = 'rgb(255, 0, 0)'; //red
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius*2, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
	};

	jump() {
		if(!this.jumping) {
			this.vY += this.lift;
			this.jumping = true;
		};
	};

	left() {
		this.vX -= 0.9;
		grassOffset -= GRASS_VELOCITY;
		largeTreeOffset -= LARGETREE_VELOCITY;
	};
	
	right() {
		if(this.x + this.radius*2 <= canvas.width-1) {
			// console.log(this.x + ' ' + this.radius*2 + ' ' + canvas.width)
			this.vX += 0.9;
			grassOffset += GRASS_VELOCITY;
			largeTreeOffset += LARGETREE_VELOCITY;
		}
	};
}