let canvas;
let canvasContext;
let direction;
let snake;
let applePosition;
let score;
let highScore = 0;

function randomPosition() {
	const x = Math.floor(Math.random() * Math.floor(30)) * 20;
	const y = Math.floor(Math.random() * Math.floor(20)) * 20;
	return [x, y];
}

function updateSnakePosition() {
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

function setApplePosition() {
	while (true) {
		applePosition = randomPosition();
		if (appleNotOnSnake()) {
			break;
		}
	}
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

function updateScoreboard() {
	document.getElementById('scoreboard').textContent = `Score: ${score} High Score: ${highScore}`;
}

function snakeHitsWall() {
	if (snake[0][0] > 580 || snake[0][0] < 0 || snake[0][1] > 380 || snake[0][1] < 0) {
		return true;
	}
	return false;
}	
	
function snakeHitsSelf() {
	for (let i = 3; i < snake.length; i++) {
		if (snake[0][0] === snake[i][0] && snake[0][1] === snake[i][1]) {
			return true;
		}
	}
	return false;
}	

function appleNotOnSnake() {
	for (let i = 0; i < snake.length; i++) {
		if (applePosition[0] === snake[i][0] && applePosition[1] === snake[i][1]) {
			return false;
		}	
	}
	return true;
}

function addToSnake() {
	snake.splice(0, 0, applePosition);	
}

function drawApple() {
	canvasContext.fillStyle = '#C62D36';
	canvasContext.fillRect(applePosition[0], applePosition[1], 20, 20);
}

function drawBoard() {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
	for (let i = 0; i < snake.length; i++) {
		canvasContext.fillStyle = '#88F010';
		canvasContext.fillRect(snake[i][0], snake[i][1], 20, 20);	
	}
}

function initializeGame() {
	direction = null;
	score = 0;
	snake = [randomPosition()];
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	updateScoreboard();
	drawBoard();
	drawSnake();
	setApplePosition();
	drawApple();
}

function gameplay() {
	const snakeEatsApple = (applePosition[0] === snake[0][0] && applePosition[1] === snake[0][1]);
	drawBoard();
	updateSnakePosition();
	drawSnake();
	if (snakeEatsApple) {
		score++;
		addToSnake();
		setApplePosition();
		updateScoreboard();
	} 
	drawApple();
}

function gameLoop() {
	let game = setInterval(() => {
		if (snakeHitsWall() || snakeHitsSelf()) {
		if (score > highScore) {
			highScore = score;
			updateScoreboard();
		}
		clearInterval(game);
	}
	gameplay();}, 100);
}

document.addEventListener('keydown', function(event) {
	updateDirection();
})

window.onload = function() {
	initializeGame();
	gameLoop();
}

document.getElementById('new-game').addEventListener('click', function(e) {
	initializeGame();
	gameLoop();
});