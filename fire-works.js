const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    const particleCount = 100; // Number of particles per firework
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  update() {
    this.particles.forEach((particle, index) => {
      particle.update();
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }

  draw() {
    this.particles.forEach((particle) => particle.draw());
  }

  isFinished() {
    return this.particles.length === 0;
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 2 + 1;
    this.gravity = 0.02;
    this.friction = 0.98;
    this.alpha = 1;
  }

  update() {
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= 0.02; // Fade out effect
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

const fireworks = [];

function createRandomFirework() {
  const x = Math.random() * canvas.width;
  const y = (Math.random() * canvas.height) / 2; // Start fireworks in the top half
  const colors = ["#004879", "#fa6d6e", "#fa8167", "#49004d", "#ff0000"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  fireworks.push(new Firework(x, y, color));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.isFinished()) {
      fireworks.splice(index, 1);
    }
  });

  if (Math.random() < 0.05) {
    // Create random firework occasionally
    createRandomFirework();
  }

  requestAnimationFrame(animate);
}

animate();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
