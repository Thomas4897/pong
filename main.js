//! Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

//! Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

//! Size of the ball (in px)
const BALL_SIZE = 20;

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

let movePaddle = 50;

computerPaddle.style.top = computerPaddlePositionY + "px";
playerPaddle.style.top = playerPaddlePositionY + "px";

//! Ball position and velocity
const ball = document.querySelector(".ball");

let ballPositionY = 250;
let ballPositionX = 350;

let ballVelocityY = 1;
let ballVelocityX = 10;
let lastBallVelocityX = ballVelocityX;
let lastBallVelocityY = ballVelocityY;

let velocityZero = 0;

ball.style.left = "350px";
ball.style.top = "250px";

//! Update the pong world
function update() {
	ballMovment();
	paddleCollision();
	PaddlePositions();
}

document.addEventListener("keydown", function (event) {
	if (event.key === " ") {
		setInterval(update, 35);
	}
});

//! Player paddle movement listener
document.addEventListener("keydown", function (event) {
	//* Keeps the player paddle position more than 0
	if (playerPaddlePositionY <= 0) {
		playerPaddlePositionY = 0 + movePaddle;
	}

	//* Keeps the player paddle position less than 500
	if (playerPaddlePositionY >= GAME_AREA_HEIGHT - PADDLE_HEIGHT) {
		playerPaddlePositionY = playerPaddlePositionY - movePaddle;
	}

	//* If ArrowDown pressed Player paddle moves down and if ArrowUp it moves up
	if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
		playerPaddlePositionY = playerPaddlePositionY + movePaddle;
	} else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
		playerPaddlePositionY = playerPaddlePositionY - movePaddle;
	}

	//* if space bar pressed ball stops and if pressed again restarts
	else if (event.key === " ") {
		if (
			ballVelocityX > 0 ||
			ballVelocityX < 0 ||
			ballVelocityY > 0 ||
			ballVelocityY < 0
		) {
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

//! Auto movement for computer
function PaddlePositions() {
	//* Update the player's paddle's position
	playerPaddlePositionY = playerPaddlePositionY;
	//* Apply the y-position
	playerPaddle.style.top = `${playerPaddlePositionY}px`;

	//* Update the computer paddle's position
	computerPaddlePositionY = ballPositionY / 1.3;

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
	//! Add px velocity movement to the ball on y axis
	ballPositionY = ballPositionY - ballVelocityY;
	ball.style.top = ballPositionY + "px";

	//! Add px velocity movement to the ball on x axis
	ballPositionX = ballPositionX - ballVelocityX;
	ball.style.left = ballPositionX + "px";

	//! LeftSide:
	//? If the ball position is 0 or less bounce the other direction
	if (ballPositionX <= 0) {
		console.log("ball hit left");
		//* computer gains point
		computerScore.innerText = Number(computerScore.innerText) + 1;

		reset();

		ballVelocityX = velocityZero;
		ballVelocityY = velocityZero;
	}

	//! RightSide:
	//? If the ball position is 680 or more bounce the other direction
	if (ballPositionX >= 680) {
		console.log("ball hit right");
		//* Player gains point
		playerScore.innerText = Number(playerScore.innerText) + 1;

		reset();

		ballVelocityX = velocityZero;
		ballVelocityY = velocityZero;
	}

	//! Top:
	//? If the ball hits the top of the screen, bounce down
	if (ballPositionY <= 0) {
		console.log("ball hit bottom");
		ballVelocityY = -Math.abs(ballVelocityY) - 0.1;
	}

	//! Bottom:
	//? If the ball hits the bottom of the screen, bounce up
	if (ballPositionY >= 480) {
		console.log("ball hit bottom");
		ballVelocityY = Math.abs(ballVelocityY) + 0.1;
	}
}

function paddleCollision() {
	//! Paddle collision
	if (
		ballPositionY + BALL_SIZE >= playerPaddlePositionY && // Lower than the top of the platform
		ballPositionY <= playerPaddlePositionY + PADDLE_HEIGHT && // Higher than the bottom of the platform
		ballPositionX + BALL_SIZE >= playerPaddlePositionX && // To the right of the platform's right side
		ballPositionX <= playerPaddlePositionX + PADDLE_WIDTH // To the left of the platform's left side
	) {
		ballVelocityX = -Math.abs(ballVelocityX) - 0.1;
		// ballVelocityY = ballVelocityY * -1;
	}

	if (
		ballPositionY + BALL_SIZE >= computerPaddlePositionY && // Lower than the top of the platform
		ballPositionY <= computerPaddlePositionY + PADDLE_HEIGHT && // Higher than the bottom of the platform
		ballPositionX + BALL_SIZE >= computerPaddlePositionX && // To the right of the platform's right side
		ballPositionX <= computerPaddlePositionX
	) {
		// To the left of the platform's left side
		ballVelocityX = Math.abs(ballVelocityX) + 0.1;
	}
}

function reset() {
	computerPaddlePositionY = 200;
	computerPaddlePositionX = 680;
	playerPaddlePositionY = 200;
	playerPaddlePositionX = 0;
	ballPositionY = 250;
	ballPositionX = 350;
	ballVelocityY = 1;
	ballVelocityX = 10;
	lastBallVelocityX = ballVelocityX;
	lastBallVelocityY = ballVelocityY;
}
