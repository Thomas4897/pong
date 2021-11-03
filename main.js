//! Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

//! Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

//! Size of the ball (in px)
const BALL_SIZE = 20;

//! Setting score board
const playerScore = document.querySelector(".player-score");
playerScore.innerText = 0;

const computerScore = document.querySelector(".computer-score");
computerScore.innerText = 0;

//! Get the computer paddle element
const computerPaddle = document.querySelector(".computer-paddle");
const playerPaddle = document.querySelector(".player-paddle");
playerPaddle.style.backgroundColor = "red";

//! The y-velocity of the computer paddle
let computerPaddlePositionY = 200;
let computerPaddlePositionX = 680;

let playerPaddlePositionY = 200;
let playerPaddlePositionX = 0;

//! Movement Speed of paddle
let movePaddle = 50;

computerPaddle.style.top = computerPaddlePositionY + "px";
playerPaddle.style.top = playerPaddlePositionY + "px";

//! Ball starting position and velocity
const ball = document.querySelector(".ball");

let ballPositionY = 250;
let ballPositionX = 350;

let startVelocityY = 1;
let startVelocityX = 20;

let ballVelocityY = 1;
let ballVelocityX = 5;
let lastBallVelocityX;
let lastBallVelocityY;

let velocityZero = 0;

ball.style.left = ballPositionX + "px";
ball.style.top = ballPositionY + "px";

//! Update the pong world
function update() {
	ballMovment();
	paddleCollision();
	PaddlePositions();
}

//? Pauses the game when spacebar hit
document.addEventListener("keydown", function (event) {
	if (event.key === " ") {
		setInterval(update, 35);
	}
});

//! Player paddle movement listener
document.addEventListener("keydown", function (event) {
	//* Keeps the player paddle position more than 0
	if (playerPaddlePositionY <= 0) {
		playerPaddlePositionY = 50;
	}

	//* Keeps the player paddle position less than 500
	if (playerPaddlePositionY >= GAME_AREA_HEIGHT - PADDLE_HEIGHT) {
		playerPaddlePositionY = 350;
	}

	//* If ArrowDown pressed Player paddle moves down and if ArrowUp it moves up
	if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
		playerPaddlePositionY = playerPaddlePositionY + movePaddle;
	} else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
		playerPaddlePositionY = playerPaddlePositionY - movePaddle;
	}

	//* if space bar pressed ball stops and if pressed again restarts
	else if (event.key === " ") {
		if (ballVelocityX !== 0 || ballVelocityY !== 0) {
			lastBallVelocityX = ballVelocityX;
			lastBallVelocityY = ballVelocityY;

			ballVelocityX = velocityZero;
			ballVelocityY = velocityZero;
		} else if (ballVelocityX === velocityZero) {
			ballVelocityX = lastBallVelocityX;
			ballVelocityY = lastBallVelocityY;
		}
	}
});

let hitOrMiss = [-50, 0, 25, 50, 75, 100, 125, 150, 175, 200];
// console.log(Math.floor(Math.random() * 2));

function coinFlip() {
	let random = Math.floor(Math.random() * 11);
	return random;
}

//! Auto movement for computer
function PaddlePositions() {
	//* Update the player's paddle's position
	playerPaddlePositionY = playerPaddlePositionY;
	//* Apply the y-position
	playerPaddle.style.top = `${playerPaddlePositionY}px`;
	let hit = coinFlip();
	console.log(hit);
	if (hit > 7) {
		//* Update the computer paddle's position
		computerPaddlePositionY = ballPositionY / 2;
	} else {
		computerPaddlePositionY = ballPositionY - 50;
	}

	//* Keeps the computer paddle position more than 0
	if (computerPaddlePositionY <= 0) {
		computerPaddlePositionY = computerPaddlePositionY + movePaddle;
	}

	//* Keeps the computer paddle position less than 500
	if (computerPaddlePositionY >= GAME_AREA_HEIGHT - PADDLE_HEIGHT) {
		computerPaddlePositionY = GAME_AREA_HEIGHT - PADDLE_HEIGHT;
	}
	//* Apply the y-position
	computerPaddle.style.top = `${computerPaddlePositionY}px`;
}

function ballMovment() {
	//! Increases point if ball hits a players wall
	points();

	//! Add px velocity movement to the ball on y axis
	ballPositionY = ballPositionY - ballVelocityY;
	ball.style.top = ballPositionY + "px";

	//! Add px velocity movement to the ball on x axis
	ballPositionX = ballPositionX - ballVelocityX;
	ball.style.left = ballPositionX + "px";

	//! Top:
	//? If the ball hits the top of the screen, bounce down
	//? Also increase ball speed
	if (ballPositionY <= 0) {
		console.log("ball hit top");
		ballVelocityY = -Math.abs(ballVelocityY).toFixed(2);
	}

	//! Bottom:
	//? If the ball hits the bottom of the screen, bounce up
	//? Also increase ball speed
	if (ballPositionY >= 480) {
		console.log("ball hit bottom");
		ballVelocityY = Math.abs(ballVelocityY).toFixed(2);
	}
}

function paddleCollision() {
	//! Paddle collision
	if (
		ballPositionY + BALL_SIZE >= playerPaddlePositionY && //? Lower than the top of the platform
		ballPositionY <= playerPaddlePositionY + PADDLE_HEIGHT && //? Higher than the bottom of the platform
		ballPositionX + BALL_SIZE >= playerPaddlePositionX && //? To the right of the platform's right side
		ballPositionX <= playerPaddlePositionX + PADDLE_WIDTH //? To the left of the platform's left side
	) {
		ballVelocityX = (-Math.abs(ballVelocityX) - 0.1).toFixed(2);
		if (ballVelocityY < 0) {
			ballVelocityY = (-Math.abs(ballVelocityY) - 0.2).toFixed(2);
		} else {
			ballVelocityY = (Math.abs(ballVelocityY) + 0.2).toFixed(2);
		}
	}

	if (
		ballPositionY + BALL_SIZE >= computerPaddlePositionY && //? Lower than the top of the platform
		ballPositionY <= computerPaddlePositionY + PADDLE_HEIGHT && //? Higher than the bottom of the platform
		ballPositionX + BALL_SIZE >= computerPaddlePositionX && //? To the right of the platform's right side
		ballPositionX <= computerPaddlePositionX
	) {
		//? To the left of the platform's left side
		ballVelocityX = (Math.abs(ballVelocityX) + 0.1).toFixed(2);
		if (ballVelocityY < 0) {
			ballVelocityY = (-Math.abs(ballVelocityY) - 0.2).toFixed(2);
		} else {
			ballVelocityY = (Math.abs(ballVelocityY) + 0.2).toFixed(2);
		}
	}
}

function points() {
	//! LeftSide:
	//? If the ball position is 0 or less bounce the other direction
	//? Also adds point for computer
	if (ballPositionX <= 0) {
		console.log("ball hit left");
		//* computer gains point
		computerScore.innerText = Number(computerScore.innerText) + 1;
		reset();
	}

	//! RightSide:
	//? If the ball position is 680 or more bounce the other direction
	//? Also adds point for player
	if (ballPositionX >= 680) {
		console.log("ball hit right");
		//* Player gains point
		playerScore.innerText = Number(playerScore.innerText) + 1;
		reset();
	}
}

function reset() {
	computerPaddlePositionY = 200;
	computerPaddlePositionX = 680;
	playerPaddlePositionY = 200;
	playerPaddlePositionX = 0;
	ballPositionY = 250;
	ballPositionX = 350;
	ballVelocityX = velocityZero;
	ballVelocityY = velocityZero;
	lastBallVelocityX = 10;
	lastBallVelocityY = 1;
}
