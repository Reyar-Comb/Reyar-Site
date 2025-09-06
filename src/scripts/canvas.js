const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function drawBackground() {
    ctx.fillStyle = "aliceblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();

const balls = [];
const FPS = 120;
const interval = 1000 / FPS;
let lastFrameTime = 0;

class Ball {
    constructor() {
        this.radius = Math.random() * 20 + 10;
        this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
        this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
        this.dx = (Math.random() - 0.5);
        this.dy = (Math.random() - 0.5);
        this.color = `hsla(193, 95%, 56%, ${Math.random() * 0.5})`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        
    }

    update(deltaTime) {
        const timeScale = deltaTime / interval;
        this.x += this.dx * timeScale;
        this.y += this.dy * timeScale;
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    }
}

for (let i = 0; i < 50; i ++) {
    balls.push(new Ball());
}

function animate(currentTime) {
    if(!lastFrameTime) lastFrameTime = currentTime;
    const deltaTime = currentTime - lastFrameTime;
    if (deltaTime >= interval) {
        lastFrameTime = currentTime;
        drawBackground();
        for (const ball of balls) {
            ball.update(deltaTime);
            ball.draw();
        }  
    }
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    resizeCanvas();
    animate();
    drawBackground();
});