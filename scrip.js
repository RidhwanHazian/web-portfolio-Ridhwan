function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const canvasStar = document.getElementById("star-canvas");
  const ctxStar = canvasStar.getContext("2d");
  const section = document.getElementById("TechStack");

  function resizeCanvas() {
    canvasStar.width = section.clientWidth;
    canvasStar.height = section.clientHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let stars = [];

  function Star() {
    this.x = Math.random() * canvasStar.width;
    this.y = Math.random() * canvasStar.height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 1 + 0.3;
    this.opacity = Math.random();
  }

  Star.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y > canvasStar.height) {
      this.y = 0;
      this.x = Math.random() * canvasStar.width;
    }
  };

  Star.prototype.draw = function () {
    ctxStar.beginPath();
    ctxStar.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctxStar.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctxStar.fill();
  };

  function initStars(num) {
    stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(new Star());
    }
  }

  function animateStars() {
    ctxStar.clearRect(0, 0, canvasStar.width, canvasStar.height);
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    requestAnimationFrame(animateStars);
  }

  initStars(100);
  animateStars();
});

// PARTICLE CANVAS
const canvas = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");

const contactSection = document.getElementById("contact");

// Resize canvas to match the #contact section
function resizeCanvasToSection() {
  canvas.width = contactSection.clientWidth;
  canvas.height = contactSection.clientHeight;
}

resizeCanvasToSection();
window.addEventListener("resize", resizeCanvasToSection);


let particleArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
      if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10;
      if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10;
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particleArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color ="#ffffff";
    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function connect() {
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let distance = dx * dx + dy * dy;

      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        let opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacityValue})`;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particleArray.forEach(p => p.update());
  connect();
}

window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.width / 80);
  init();
});

window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

init();
animate();

let lastScrollTop = 0;
const desktopBar = document.querySelector('#desktop-nav');
const hamburgerBar = document.querySelector('#hamburger-nav');

window.addEventListener('scroll', function() {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    if (desktopBar) desktopBar.style.top = '-100px';
    if (hamburgerBar) hamburgerBar.style.top = '-100px';
  } else {
    if (desktopBar) desktopBar.style.top = '0';
    if (hamburgerBar) hamburgerBar.style.top = '0';
  }
  lastScrollTop = st <= 0 ? 0 : st;
}, false);
