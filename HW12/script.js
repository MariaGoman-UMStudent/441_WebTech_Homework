const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//  Object Class
class GameObject {
constructor(x, y, width, height, emoji) {
this.x = x;
this.y = y;
this.width = width;
this.height = height;
this.emoji = emoji;
this.speedX = 0;
this.speedY = 0;
}

draw() {
ctx.font = this.width + "px Arial";
ctx.fillText(this.emoji, this.x, this.y);
}

update() {
this.x += this.speedX;
this.y += this.speedY;

// Keep inside the canvac
if (this.x < 0) this.x = 0;
if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;
if (this.y < this.height) this.y = this.height;
if (this.y > canvas.height) this.y = canvas.height;

}
}

//  Player
let cat = new GameObject(100, 300, 40, 40, "🐱");

//  Moving object
let lemon = new GameObject(400, 200, 40, 40, "🍋");
lemon.speedX = 2;
lemon.speedY = 2;

//  Flowers 
let flowers = [
new GameObject(200, 100, 30, 30, "🌸"),
new GameObject(600, 400, 30, 30, "🌼")
];

//  Controls
document.addEventListener("keydown", (e) => {
if (e.key === "ArrowUp") cat.speedY = -3;
if (e.key === "ArrowDown") cat.speedY = 3;
if (e.key === "ArrowLeft") cat.speedX = -3;
if (e.key === "ArrowRight") cat.speedX = 3;
});

document.addEventListener("keyup", () => {
cat.speedX = 0;
cat.speedY = 0;
});

// Collision detection
function hasCollided(a, b) {
return (
a.x < b.x + b.width &&
a.x + a.width > b.x &&
a.y - a.height < b.y &&
a.y > b.y - b.height
);
}

//Background color
let bgColor = "#fff0f5";

//  Game Loop
function updateGame() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Background
ctx.fillStyle = bgColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw flowers
flowers.forEach(f => f.draw());

// Update objects
cat.update();
lemon.update();

// Bounce motion for lemon
if (lemon.x <= 0 || lemon.x >= canvas.width - lemon.width) {
lemon.speedX *= -1;
}
if (lemon.y <= lemon.height || lemon.y >= canvas.height) {
lemon.speedY *= -1;
}

// Collision! Ka-pow!
if (hasCollided(cat, lemon)) {
bgColor = "#ffe4e1";

cat.width = 60;
lemon.width = 60;

setTimeout(() => {
  cat.width = 40;
  lemon.width = 40;
  bgColor = "#fff0f5";
}, 200);

}

// Draw the objects
cat.draw();
lemon.draw();

requestAnimationFrame(updateGame);
}

//  Music
function playMusic() {
document.getElementById("bgMusic").play();
}

// Start game
updateGame();