const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let obstacles = [];
let collectibles = [];
let keys = {};
let score = 0;

/* =========================
   CLASSES
========================= */

//  Obstacles
class Obstacle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//  Collectibles
class Collectible {
    constructor(x, y, radius, color, value) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.value = value;
        this.active = true;
    }

    draw() {
        if (!this.active) return;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Lemon highlight
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(this.x - 3, this.y - 3, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

//  Player
class Player {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = 3;
    }

    draw() {
        // Cat body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);

        // Cat ears
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 8, this.y - 10);
        ctx.lineTo(this.x + 16, this.y);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x + this.size - 16, this.y);
        ctx.lineTo(this.x + this.size - 8, this.y - 10);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.fill();
    }

    move() {
        let newX = this.x;
        let newY = this.y;

        if (keys["ArrowUp"]) newY -= this.speed;
        if (keys["ArrowDown"]) newY += this.speed;
        if (keys["ArrowLeft"]) newX -= this.speed;
        if (keys["ArrowRight"]) newX += this.speed;

        // Stay within canvas bounds
        if (
            newX >= 0 &&
            newY >= 0 &&
            newX + this.size <= canvas.width &&
            newY + this.size <= canvas.height &&
            !this.collidesWithObstacle(newX, newY)
        ) {
            this.x = newX;
            this.y = newY;
        }
    }

    collidesWithObstacle(newX, newY) {
        return obstacles.some(obs =>
            newX < obs.x + obs.width &&
            newX + this.size > obs.x &&
            newY < obs.y + obs.height &&
            newY + this.size > obs.y
        );
    }

    collectItems() {
        collectibles.forEach(item => {
            if (!item.active) return;

            let distX = this.x + this.size / 2 - item.x;
            let distY = this.y + this.size / 2 - item.y;
            let distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < this.size / 2 + item.radius) {
                item.active = false;
                score += item.value;
                scoreDisplay.textContent = score;
            }
        });
    }
}

/* =========================
    Json data
========================= */

async function loadGameData() {
    const obstacleData = await fetch("obstacles.json").then(res => res.json());
    const collectibleData = await fetch("collectibles.json").then(res => res.json());

    obstacles = obstacleData.map(
        o => new Obstacle(o.x, o.y, o.width, o.height, o.color)
    );

    collectibles = collectibleData.map(
        c => new Collectible(c.x, c.y, c.radius, c.color, c.value)
    );
}

/* =========================
   Input
========================= */

window.addEventListener("keydown", e => {
    keys[e.key] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key] = false;
});

/* =========================
   Loop
========================= */

const player = new Player(50, 50, 30, "#FFA7C4");

function update() {
    player.move();
    player.collectItems();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    obstacles.forEach(o => o.draw());
    collectibles.forEach(c => c.draw());
    player.draw();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

/* =========================
   Loading Game
========================= */

loadGameData().then(() => {
    gameLoop();
});