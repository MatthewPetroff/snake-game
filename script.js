const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
const gridSize = 20;

let applePosition;
let direction;
let score;
let snake;
let prevSnake;
let highScore = 0;

function randomPosition() {
	const x = Math.floor(Math.random() * Math.floor(canvas.width / gridSize)) * gridSize;
	const y = Math.floor(Math.random() * Math.floor(canvas.height / gridSize)) * gridSize;
	return {x: x, y: y};
}

function updateSnakePosition() {
	const snakePosition = {};
	switch (direction) {
		case 'ArrowUp':
			snakePosition.x = snake[0].x;
			snakePosition.y = snake[0].y - gridSize;
			snake.splice(0, 0, snakePosition);
			snake.pop();
			return;
		case 'ArrowDown':
			snakePosition.x = snake[0].x;
			snakePosition.y = snake[0].y + gridSize;
			snake.splice(0, 0, snakePosition);		
			snake.pop();
			return;
		case 'ArrowLeft':
			snakePosition.x = snake[0].x - gridSize;
			snakePosition.y = snake[0].y;
			snake.splice(0, 0, snakePosition);
			snake.pop();
			return;
		case 'ArrowRight':
			snakePosition.x = snake[0].x + gridSize;
			snakePosition.y = snake[0].y;
			snake.splice(0, 0, snakePosition);		
			snake.pop();
			return;
		default:
			return;
	}
}

function setApplePosition() {
	applePosition = randomPosition();
	for (let segment of snake) {
		if (segment.x === applePosition.x && segment.y === applePosition.y) {
			applePosition = randomPosition();
		} else {
			return;
		}
	}
	setApplePosition();
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
	if (snake[0].x > (canvas.width - gridSize) || snake[0].x < 0 || snake[0].y > (canvas.height - gridSize) || snake[0].y < 0) {
		return true;
	}
	return false;
}	
	
function snakeHitsSelf() {
	for (let i = 1; i < snake.length; i++) {
		if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
			return true;
		}
	}
	return false;
}	

function appleNotOnSnake() {
	for (let i = 0; i < snake.length; i++) {
		if (applePosition.x === snake[i].x && applePosition.y === snake[i].y) {
			return true;
		} else {
			return false;
		}	
	}
	return false;
}

function addToSnake() {
	snake.splice(0, 0, applePosition);	
	for (let i = snake.length - 1; i > 0; i--) {
		snake[i] = prevSnake[i - 1];
	}
}

function drawApple() {
	canvasContext.fillStyle = '#C62D36';
	canvasContext.fillRect(applePosition.x, applePosition.y, gridSize, gridSize);
}

function drawBoard() {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
	for (let i = 0; i < snake.length; i++) {
		canvasContext.fillStyle = '#88F010';
		canvasContext.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);	
	}
}

function initializeGame() {
	direction = null;
	score = 0;
	snake = [randomPosition()];
	updateScoreboard();
	drawBoard();
	drawSnake();
	setApplePosition();
	drawApple();
}

function gameplay() {
	prevSnake = snake.slice();
	drawBoard();
	updateSnakePosition();
	const snakeEatsApple = appleNotOnSnake();
	if (snakeEatsApple) {
		score++;
		addToSnake();
		setApplePosition();
		updateScoreboard();
	} 
	drawApple();
	drawSnake();	
}

function gameLoop() {
	let game = setInterval(() => {
		if (snakeHitsWall() || snakeHitsSelf()) {
			alert('Game Over...');
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