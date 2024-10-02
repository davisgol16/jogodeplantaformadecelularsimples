const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const player = {
    x: 50,
    y: 350,
    width: 30,
    height: 30,
    color: 'red',
    gravity: 0.5,
    jumpPower: -10,
    velocityY: 0,
    jumping: false
};

const platforms = [
    { x: 0, y: 380, width: 600, height: 20 },
    { x: 200, y: 300, width: 100, height: 10 },
    { x: 400, y: 250, width: 100, height: 10 }
];

let score = 0;

function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    context.fillStyle = 'black';
    platforms.forEach(platform => {
        context.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply gravity
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Check for platform collision
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height >= platform.y &&
            player.y + player.height <= platform.y + platform.height
        ) {
            player.jumping = false;
            player.velocityY = 0;
            player.y = platform.y - player.height; // position player on top of the platform
        }
    });

    // Prevent falling off the bottom of the canvas
    if (player.y > canvas.height) {
        player.y = canvas.height;
        player.velocityY = 0;
        alert('Game Over! Sua pontuação: ' + score);
        resetGame();
    }

    drawPlayer();
    drawPlatforms();

    // Increase score over time
    score++;
    context.fillStyle = 'black';
    context.fillText('Pontuação: ' + score, 10, 20);
}

function jump() {
    if (!player.jumping) {
        player.jumping = true;
        player.velocityY = player.jumpPower;
    }
}

function resetGame() {
    player.x = 50;
    player.y = 350;
    player.velocityY = 0;
    score = 0;
}

// Control player with keyboard
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// Restart the game when button is clicked
document.getElementById('restart-btn').addEventListener('click', resetGame);

// Game loop
setInterval(update, 1000 / 60); // 60 FPS
