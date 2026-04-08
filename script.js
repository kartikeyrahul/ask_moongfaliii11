// 1. Password Logic
function checkPassword() {
    const input = document.getElementById('heart-password').value.toLowerCase().trim();
    const errorMsg = document.getElementById('pwd-error');
    
    // The password is 'moongfali'
    if(input === 'moongfali') {
        showPage('intro-screen');
    } else {
        errorMsg.classList.remove('hidden');
        // Re-trigger shake animation
        errorMsg.style.animation = 'none';
        errorMsg.offsetHeight; /* trigger reflow */
        errorMsg.style.animation = null; 
    }
}

// 2. Start Video & Audio Experience
function startExperience() {
    let video = document.getElementById("bg-video");
    
    if (video) {
        video.muted = false;
        video.volume = 0.8; 
        video.play().catch(error => console.log("Video play failed:", error));
    }
    
    showPage('page1');
}

// 3. Page Navigation Logic
function showPage(pageId) {
    const pages = document.querySelectorAll('.glass-card');
    pages.forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });

    const nextPage = document.getElementById(pageId);
    nextPage.classList.remove('hidden');
    nextPage.classList.add('active');

    // Final Confetti
    if (pageId === 'page20') {
        let crackers = document.getElementById("cracker-sound");
        if(crackers) {
            crackers.volume = 1.0;
            crackers.play().catch(error => console.log("Cracker sound failed:", error));
        }
        startCrazyConfetti();
    }
}

// 4. Game 1: Love Slider Logic
function checkSlider() {
    let val = document.getElementById('love-slider').value;
    let text = document.getElementById('slider-text');
    let btn = document.getElementById('slider-btn');
    
    text.innerText = val + '%';
    
    if(val == 100) {
        text.innerText = "100%?! Aww, I love you! 🥰";
        btn.classList.remove('hidden');
    } else {
        btn.classList.add('hidden');
    }
}

// 5. Game 2: Box Game Logic
function wrongBox(element) {
    element.innerHTML = "❌";
    document.getElementById('card-msg').innerText = "Oops! Try another one! 😜";
    element.style.pointerEvents = "none";
    element.style.opacity = "0.5";
}

function rightBox(element) {
    element.innerHTML = "❤️";
    element.style.transform = "scale(1.2)";
    element.style.borderColor = "#ff4757";
    element.style.background = "rgba(255, 71, 87, 0.2)";
    document.getElementById('card-msg').innerText = "You found my heart! 💘";
    document.getElementById('card-btn').classList.remove('hidden');
    
    // Disable other boxes
    let boxes = document.querySelectorAll('.game-box');
    boxes.forEach(box => box.style.pointerEvents = "none");
}

// 6. Runaway Button Logic
const runawayButtons = document.querySelectorAll('.runaway-btn');
runawayButtons.forEach(btn => {
    btn.addEventListener('mouseover', moveButton);
    btn.addEventListener('touchstart', moveButton, {passive: false});
});

function moveButton(e) {
    e.preventDefault(); 
    const btn = e.target;
    btn.classList.add('moving');

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const btnWidth = btn.offsetWidth || 100;
    const btnHeight = btn.offsetHeight || 50;
    
    const maxX = windowWidth - btnWidth - 20;
    const maxY = windowHeight - btnHeight - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}

// 7. Subtle 3D Tilt Effect on Desktop
document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".tilt-card");
    cards.forEach(card => {
        let x = (window.innerWidth / 2 - e.pageX) / 30;
        let y = (window.innerHeight / 2 - e.pageY) / 30;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
});

// 8. Premium Confetti
function startCrazyConfetti() {
    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 9999,
        colors: ['#ff0000', '#ff66b2', '#ff1493', '#ffd700'] 
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
