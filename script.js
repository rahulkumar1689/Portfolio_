document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Dark / Light Mode Toggle
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        document.documentElement.classList.toggle('light');
    });

    // ----------------------------------------------------
    // 2. Particle Canvas Animation
    // ----------------------------------------------------
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = '#00f2fe';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particle pool
    for (let i = 0; i < 70; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // ----------------------------------------------------
    // 3. GSAP Scroll Animations
    // ----------------------------------------------------
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".hero-title", {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out"
        });
    }
});