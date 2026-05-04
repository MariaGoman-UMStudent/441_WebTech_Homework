$(document).ready(function () {

    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8;

    // Data arrays
    let stars = [];
    let backgroundStars = [];
    let sparkles = [];
    let shootingStars = [];
    let nebulaClouds = [];

    // Background stars
    function createBackgroundStars(count) {
        for (let i = 0; i < count; i++) {
            backgroundStars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.3 + 0.1,
                opacity: Math.random()
            });
        }
    }

    createBackgroundStars(120);

    function updateBackgroundStars() {
        backgroundStars.forEach(star => {
            star.y += star.speed;

            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }

            star.opacity += (Math.random() - 0.5) * 0.05;
            star.opacity = Math.max(0.2, Math.min(1, star.opacity));

            drawStar(star.x, star.y, star.size, star.opacity);
        });
    }


    // Draw Function
    function drawStar(x, y, size = 3, opacity = 1) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);

        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255,255,255,0.8)";

        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();

        ctx.shadowBlur = 0;
    }


    // User stars
    function drawUserStars() {
        stars.forEach(star => {
            star.opacity += (Math.random() - 0.5) * 0.05;
            star.opacity = Math.max(0.5, Math.min(1, star.opacity));

            drawStar(star.x, star.y, 3, star.opacity);
        });
    }

    function drawLines() {
        if (stars.length < 2) return;

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1;

        ctx.moveTo(stars[0].x, stars[0].y);

        for (let i = 1; i < stars.length; i++) {
            ctx.lineTo(stars[i].x, stars[i].y);
        }

        ctx.stroke();
    }


    // Sparkles when you click
    function updateSparkles() {
        for (let i = sparkles.length - 1; i >= 0; i--) {
            let s = sparkles[i];

            s.x += s.dx;
            s.y += s.dy;
            s.opacity -= 0.03;

            drawStar(s.x, s.y, s.size, s.opacity);

            if (s.opacity <= 0) {
                sparkles.splice(i, 1);
            }
        }
    }

    // Shooting stars
    function createShootingStar() {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.5,
            length: Math.random() * 80 + 50,
            speed: Math.random() * 6 + 4,
            angle: Math.PI / 4,
            opacity: 1
        });
    }

    function updateShootingStars() {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            let s = shootingStars[i];

            s.x += Math.cos(s.angle) * s.speed;
            s.y += Math.sin(s.angle) * s.speed;
            s.opacity -= 0.02;

            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(
                s.x - Math.cos(s.angle) * s.length,
                s.y - Math.sin(s.angle) * s.length
            );

            ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            if (s.opacity <= 0) {
                shootingStars.splice(i, 1);
            }
        }
    }

    //Click Event
    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // sparkles
        for (let i = 0; i < 8; i++) {
            sparkles.push({
                x,
                y,
                size: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
                opacity: 1
            });
        }

        // star
        stars.push({
            x,
            y,
            opacity: 1
        });
    });

    // Animation loop
    function animate() {

        // galaxy background
        const gradient = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width
        );

        gradient.addColorStop(0, "#1a0f3a");
        gradient.addColorStop(0.5, "#0b1f3a");
        gradient.addColorStop(1, "#050510");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // occasional shooting stars
        if (Math.random() < 0.01) {
            createShootingStar();
        }


        drawNebula();

        updateBackgroundStars();
        drawUserStars();
        drawLines();
        updateSparkles();
        updateShootingStars();

        requestAnimationFrame(animate);
    }

    animate();

    function createNebulaClouds(count) {
    for (let i = 0; i < count; i++) {
        nebulaClouds.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 200 + 100,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            hue: Math.random() * 120 + 180,
            opacity: Math.random() * 0.25 + 0.1,
        });
    }
}

createNebulaClouds(6);

function drawNebula() {
    nebulaClouds.forEach(c => {

        // drift slowly
        c.x += c.dx;
        c.y += c.dy;

        // soft wraparound
        if (c.x < -200) c.x = canvas.width + 200;
        if (c.x > canvas.width + 200) c.x = -200;
        if (c.y < -200) c.y = canvas.height + 200;
        if (c.y > canvas.height + 200) c.y = -200;

        const gradient = ctx.createRadialGradient(
            c.x, c.y, 0,
            c.x, c.y, c.radius
        );

        gradient.addColorStop(0, `hsla(${c.hue}, 80%, 60%, ${c.opacity})`);
        gradient.addColorStop(0.5, `hsla(${c.hue}, 80%, 40%, ${c.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

const music = document.getElementById("bgMusic");

const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const playlist = [
    "music/Silent Waves.mp3",
    "music/Night Sky.mp3",
    "music/Night Owl.mp3",
    "music/Morning Break.mp3",
    "music/Aurora Lights.mp3",
];

let currentSong = 0;

function loadSong(index) {
    music.src = playlist[index];
    music.play();
}

playBtn.addEventListener("click", function () {
    if (!music.src) {
        loadSong(currentSong);
        return;
    }

    if (music.paused) {
        music.play();
        playBtn.textContent = "⏸";
    } else {
        music.pause();
        playBtn.textContent = "▶";
    }
});

nextBtn.addEventListener("click", function () {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    playBtn.textContent = "⏸";
});

prevBtn.addEventListener("click", function () {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    playBtn.textContent = "⏸";
});

});