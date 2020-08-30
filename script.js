let canvas;
let canvasContext;
let direction;
let snake;
let applePosition;
let score;
let highScore = 0;
let playing = true;

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

function setApplePosition() {
	while (true) {
		applePosition = randomSpot();
		if (appleNotOnSnake()) {
			break;
		}
	}
}

function appleNotOnSnake() {
	for (let i = 0; i < snake.length; i++) {
		if (applePosition[0] === snake[i][0] && applePosition[1] === snake[i][1]) {
			return false;
		}	
	}
	return true;
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
	document.getElementById('scoreboard').textContent = `Score: ${score} High Score: ${highScore}`;
}

function updateHighScore() {
	highScore = score;
	document.getElementById('scoreboard').textContent = `Score: ${score} High Score: ${highScore}`;
}

function snakeHitsWall() {
	if (snake[0][0] > 780 || snake[0][0] < 0 || snake[0][1] > 580 || snake[0][1] < 0) {
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

function addToSnake() {
	snake.splice(0, 0, applePosition);	
}
function drawBoard() {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function initializeGame() {
	direction = null;
	score = 0;
	snake = [randomSpot()];
	drawBoard();
	drawSnake();
	setApplePosition();
	drawApple();
}

function gameplay() {
	const snakeEatsApple = (applePosition[0] === snake[0][0] && applePosition[1] === snake[0][1]);
	drawBoard();
	updateSnake();
	drawSnake();
	if (snakeEatsApple) {
		addToSnake();
		incrementScore();
		setApplePosition();
	} 
	drawApple();
}

document.addEventListener('keydown', function(event) {
	updateDirection();
})

document.getElementById('new-game').addEventListener('click', function(e) {
	if (!displayNum.includes('.')) {
		updateDisplayNum('.');
	}
});

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	initializeGame();

	let game = setInterval(() => {
		if (snakeHitsWall() || snakeHitsSelf()) {
			if (score > highScore) {
				updateHighScore();
			}
			clearInterval(game);
		}
		gameplay();
	}, 100);
}

	

//To-do
//1. Give player option to play again