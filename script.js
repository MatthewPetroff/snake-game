let canvas;
let canvasContext;
let direction = null;
let snake = [randomSpot()];
let applePosition;
let score = 0;

function randomSpot() {
	const x = Math.floor(Math.random() * Math.floor(40)) * 20;
	const y = Math.floor(Math.random() * Math.floor(30)) * 20;
	return [x, y];
}

function updateSnake() {
	switch (direction) {
		case 'ArrowUp':
			snake.splice(0, 0, [snake[0][0], snake[0][1] - 20]);
			snake.pop();
			return;
		case 'ArrowDown':
			snake.splice(0, 0, [snake[0][0], snake[0][1] + 20]);
			snake.pop();
			return
		case 'ArrowLeft':
			snake.splice(0, 0, [snake[0][0] - 20, snake[0][1]]);
			snake.pop();
			return
		case 'ArrowRight':
			snake.splice(0, 0, [snake[0][0] + 20, snake[0][1]]);
			snake.pop();
			return
		default:
			return
	}
}

function updateApplePosition() {
	while (true) {
		applePosition = randomSpot();
		if (applePosition[0] != snake[0][0] || applePosition[1] != snake[0][1]) {
			break;
		}
	}
}

function drawApple() {
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(applePosition[0], applePosition[1], 20, 20);
}

function updateDirection() {
	const isArrow = (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight');
	if (isArrow) {
  		switch (event.key) {
  			case 'ArrowUp':
  				if (direction === 'ArrowDown') {return}
  				direction = event.key;
  				break;	
  			case 'ArrowDown':
  				if (direction === 'ArrowUp') {return}
  				direction = event.key;	
  				break;
  			case 'ArrowLeft':
  				if (direction === 'ArrowRight') {return}
  				direction = event.key;	
  				break;
  			case 'ArrowRight':
  				if (direction === 'ArrowLeft') {return}
  				direction = event.key;	
  				break;			
  		}
	}
}

function drawSnake() {
	for (let i = 0; i < snake.length; i++) {
		canvasContext.fillStyle = 'blue';
		canvasContext.fillRect(snake[i][0], snake[i][1], 20, 20);	
	}
}

function incrementScore() {
	score++;
}

function gameOver() {
	if (snake[0][0] > 780 || snake[0][0] < 0 || snake[0][1] > 580 || snake[0][1] < 0) {
		console.log('Out of bounds');
	}

	for (let i = 1; i < snake.length; i++) {
		if (snake[0] === snake [i]) {
			console.log('ran into itself');
		}
	}
}

function addToSnake() {
	snake.splice(0, 0, applePosition);	
}

function updateScreen() {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	updateSnake();
	drawSnake();
	if (applePosition[0] === snake[0][0] && applePosition[1] === snake[0][1]) {
		addToSnake();
		incrementScore();
		updateApplePosition();
	} 
	drawApple();	
	gameOver();
}

document.addEventListener("keydown", function(event) {
	updateDirection();
})

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	drawSnake();
	updateApplePosition();
	drawApple();
	setInterval(updateScreen, 75);
}