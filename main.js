// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element
const computerPaddle = document.querySelector(".computer-paddle");

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 1;

//! Ball position and velocity
const ball = document.querySelector(".ball");

let ballPositionY = 250;
let ballVelocityY = 0;

let ballPositionX = 350;
let ballVelocityX = 10;

ball.style.left = "350px";
ball.style.top = "250px";

// Update the pong world
function update() {
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
	// Update the computer paddle's position
	computerPaddleYPosition = computerPaddleYPosition + computerPaddleYVelocity;

	// Apply the y-position
	computerPaddle.style.top = `${computerPaddleYPosition}px`;
}

setInterval(update, 35);
