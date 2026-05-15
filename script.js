// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    // Only apply if custom cursor elements exist (hidden on mobile)
    if(window.innerWidth > 768) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 11 + 'px';
            cursorFollower.style.top = e.clientY - 11 + 'px';
        }, 50);
    }
});

// Hover effects for cursor
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = 'transparent';
        cursorFollower.style.backgroundColor = 'rgba(56, 189, 248, 0.2)';
    });
    link.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'var(--primary-color)';
        cursorFollower.style.backgroundColor = 'transparent';
    });
});

// --- Theme Toggle (Saved in LocalStorage) ---
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// --- Mobile Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links li a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}));

// --- Typed.js Animation ---
if (document.getElementById('typed')) {
    new Typed('#typed', {
        strings: ['Software Developer.', 'CS Engineering Student.', 'Web App Builder.', 'Problem Solver.'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
}

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal');

const scrollReveal = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
            
            // Trigger counter animation if inside reveal element
            const counters = el.querySelectorAll('.counter');
            counters.forEach(counter => {
                if(!counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
            });
        }
    });
};

window.addEventListener('scroll', scrollReveal);
scrollReveal(); // Check on load

// --- Counter Animation ---
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const increment = target / 40; // Speed adjustment
    
    const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 40);
        } else {
            counter.innerText = target + "+";
        }
    };
    updateCount();
}

// --- Project Details Toggle ---
const detailsButtons = document.querySelectorAll('.details-btn');
detailsButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const extendedDesc = this.closest('.project-info').querySelector('.extended-desc');
        extendedDesc.classList.toggle('active');
        
        if (extendedDesc.classList.contains('active')) {
            this.innerText = 'Hide Details';
        } else {
            this.innerText = 'Details';
        }
    });
});

// --- Scroll to Top Button ---
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Dynamic Particle Background ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = htmlEl.getAttribute('data-theme') === 'dark' ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});
