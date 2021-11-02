//! Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

//! Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

//! Size of the ball (in px)
const BALL_SIZE = 20;

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

let ballVelocityY = 3;
let ballVelocityX = 20;
let lastBallVelocityX = ballVelocityX;
let lastBallVelocityY = ballVelocityY;

let velocityZero = 0;

ball.style.left = "350px";
ball.style.top = "250px";

//! Update the pong world
function update() {
	ballMovment();
	paddleCollision();
	playerPaddlePosition();
}

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

setInterval(update, 35);
//! paddle player-paddle
//! paddle computer-paddle

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
		ballVelocityX = -Math.abs(ballVelocityX) - 0.5;

		//? If the ball hits the left side and Y is 0 or less bounce the oppiste direction of up or down
		if (ballVelocityY >= 0) {
			ballVelocityY = Math.abs(ballVelocityY) + 0.5;
		} else {
			ballVelocityY = -Math.abs(ballVelocityY) - 0.5;
		}
	}

	//! RightSide:
	//? If the ball position is 680 or more bounce the other direction
	if (ballPositionX >= 680) {
		console.log("ball hit right");
		ballVelocityX = Math.abs(ballVelocityX) + 0.5;

		//? If the ball hits the right side and Y is 0 or less bounce the oppiste direction of up or down
		if (ballVelocityY >= 0) {
			ballVelocityY = Math.abs(ballVelocityY) + 0.5;
		} else {
			ballVelocityY = -Math.abs(ballVelocityY) - 0.5;
		}
	}

	//? Top:
	//!If the ball hits the top of the screen, bounce down
	if (ballPositionY <= 0) {
		console.log("ball hit bottom");
		ballVelocityY = -Math.abs(ballVelocityY) - 0.5;
	}

	//? Bottom:
	//! If the ball hits the bottom of the screen, bounce up
	if (ballPositionY >= 480) {
		console.log("ball hit bottom");
		ballVelocityY = Math.abs(ballVelocityY) + 0.5;
	}
}

function paddleCollision() {
	//! Paddle collision
	if (
		(ballPositionY + BALL_SIZE >= playerPaddlePositionY && // Lower than the top of the platform
			ballPositionY <= playerPaddlePositionY + PADDLE_HEIGHT && // Higher than the bottom of the platform
			ballPositionX + BALL_SIZE >= playerPaddlePositionX && // To the right of the platform's right side
			ballPositionX <= playerPaddlePositionX + PADDLE_WIDTH) || // To the left of the platform's left side
		(ballPositionY + BALL_SIZE >= computerPaddlePositionY && // Lower than the top of the platform
			ballPositionY <= computerPaddlePositionY + PADDLE_HEIGHT && // Higher than the bottom of the platform
			ballPositionX + BALL_SIZE >= computerPaddlePositionX && // To the right of the platform's right side
			ballPositionX <= computerPaddlePositionX) // To the left of the platform's left side
	) {
		ballVelocityX = ballVelocityX * -1;
		// ballVelocityY = ballVelocityY * -1;
	}
}

function playerPaddlePosition() {
	//! Update the player's paddle's position
	playerPaddlePositionY = playerPaddlePositionY;
	//! Apply the y-position
	playerPaddle.style.top = `${playerPaddlePositionY}px`;

	//! Update the computer paddle's position
	computerPaddlePositionY = ballPositionY;

	//* Keeps the computer paddle position more than 0
	if (computerPaddlePositionY <= 0) {
		computerPaddlePositionY = computerPaddlePositionY + movePaddle;
	}

	//* Keeps the computer paddle position less than 500
	if (computerPaddlePositionY >= GAME_AREA_HEIGHT - PADDLE_HEIGHT) {
		computerPaddlePositionY = GAME_AREA_HEIGHT - PADDLE_HEIGHT;
	}

	//! Apply the y-position
	computerPaddle.style.top = `${computerPaddlePositionY}px`;
}
