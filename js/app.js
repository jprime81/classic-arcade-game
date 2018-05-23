// Canvas allowed max area
const maximumX = 400;
const maximumY = 380;
const topArea = 0;

// Select page body
let pageBody = document.querySelector('body');

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // Reset enemy position after moving off canvas
    if (this.x > 550) {
        this.x = -100;
        this.speed = 150 + Math.floor(Math.random() * 300);
    }

    // Check collision between player and enemies
    if (player.x < this.x + 60 && player.x + 37 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        player.collisionCounter++;

        // Set page body background color to red if collision occurs
        pageBody.style.backgroundColor = 'red';

        // Set timeout to return page body background color to white
        setTimeout(function () {
            pageBody.style.backgroundColor = 'white';
        }, 200);

        // Player is allowed to make three mistakes before score is reset to zero
        if (player.collisionCounter === 3) {

            // Score is reset to zero
            player.score = 0;

            // Counter is reset to zero
            player.collisionCounter = 0;

        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = 0;
    this.collisionCounter = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {

    // Prevent player from moving past canvas as its positions resets to allowed area
    if (this.y > maximumY) {
        this.y = 380;
    }
    if (this.x > maximumX) {
        this.x = 400;
    }
    if (this.x < topArea) {
        this.x = 0;
    }

    // Verify if the player reaches the top area
    if (this.y < topArea) {
        this.x = 200;
        this.y = 380;

        // Score is incremented
        this.score++;

        // Set page body background color to green as indication of success
        pageBody.style.backgroundColor = 'green';

        // Set timeout to return page body background color to white
        setTimeout(function () {
            pageBody.style.backgroundColor = 'white';
        }, 200);
    }
};

// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Tracks the arrow key press for moving player around the canvas
Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(200, 380, 50);
let enemyPosition = [60, 140, 220];

// Loops through enemyPosition, creates new enemy with random speed and position, and adds new enemy to allEnemies array
enemyPosition.forEach(function (position) {
    let enemy = new Enemy(0, position, 150 + Math.floor(Math.random() * 600));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});