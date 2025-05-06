// Récupérer le canvas et le contexte
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Paramètres du jeu
const paddleWidth = 10;
const paddleHeight = 60;
const ballSize = 10;
const paddleSpeed = 5;
const ballSpeed = 7;

// Objets du jeu
const paddle1 = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const paddle2 = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: ballSpeed,
    dy: ballSpeed
};

// Scores
let score1 = 0;
let score2 = 0;

// Contrôles clavier
document.addEventListener('keydown', (e) => {
    // Joueur 1
    if (e.key === 'z') paddle1.dy = -paddleSpeed;
    if (e.key === 's') paddle1.dy = paddleSpeed;
    // Joueur 2
    if (e.key === 'ArrowUp') paddle2.dy = -paddleSpeed;
    if (e.key === 'ArrowDown') paddle2.dy = paddleSpeed;
});

document.addEventListener('keyup', (e) => {
    // Joueur 1
    if (e.key === 'z' || e.key === 's') paddle1.dy = 0;
    // Joueur 2
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') paddle2.dy = 0;
});

// Dessiner les éléments
function draw() {
    // Effacer le canvas
    ctx.fillStyle = '#2c2c2c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner les raquettes
    ctx.fillStyle = '#c28abf';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    // Dessiner la balle
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#c28abf';
    ctx.fill();
    ctx.closePath();

    // Dessiner les scores
    ctx.font = '30px Arial';
    ctx.fillText(score1, canvas.width / 4, 50);
    ctx.fillText(score2, 3 * canvas.width / 4, 50);

    // Ligne centrale
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = '#c28abf';
    ctx.stroke();
}

// Mettre à jour les positions
function update() {
  
    paddle1.y += paddle1.dy;
    paddle2.y += paddle2.dy;

  
    if (paddle1.y < 0) paddle1.y = 0;
    if (paddle1.y + paddle1.height > canvas.height) paddle1.y = canvas.height - paddle1.height;
    if (paddle2.y < 0) paddle2.y = 0;
    if (paddle2.y + paddle2.height > canvas.height) paddle2.y = canvas.height - paddle2.height;

    // Déplacer la balle
    ball.x += ball.dx;
    ball.y += ball.dy;

 
    if (ball.y + ball.size / 2 > canvas.height || ball.y - ball.size / 2 < 0) {
        ball.dy = -ball.dy;
    }

    // Collisions avec les raquettes
    if (
        (ball.x - ball.size / 2 < paddle1.x + paddle1.width &&
            ball.y > paddle1.y &&
            ball.y < paddle1.y + paddle1.height) ||
        (ball.x + ball.size / 2 > paddle2.x &&
            ball.y > paddle2.y &&
            ball.y < paddle2.y + paddle2.height)
    ) {
        ball.dx = -ball.dx;
    }

    // Balle hors limites (score)
    if (ball.x < 0) {
        score2++;
        resetBall();
    } else if (ball.x > canvas.width) {
        score1++;
        resetBall();
    }
}


function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
}


function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Lancer le jeu
gameLoop();