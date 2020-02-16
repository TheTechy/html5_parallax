let keys = {};

function checkKeyboardInput() {
	for (const key in keys) {
		if(key == 37) {
			displayText('LEFT ARROW', 10, 10);
			player.left();
		} else if(key == 38) {
			displayText('UP ARROW', 10, 50);
			player.jump();
		} else if(key == 39) {
			displayText('RIGHT ARROW', 10, 90);
			player.right();
		} else if(key == 40) {
			displayText('DOWN ARROW', 10, 120);
		}
	};
};

window.addEventListener('keydown', (evt) => {
	keys[event.which] = true;
}, true);

window.addEventListener('keyup', (evt) => {
	delete keys[event.which];
}, true);