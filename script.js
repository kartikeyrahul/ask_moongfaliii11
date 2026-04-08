// 1. Ambient Background Hearts
function createAmbientHearts() {
    const container = document.getElementById('floating-hearts-container');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('ambient-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }, 400);
}
window.onload = createAmbientHearts;

// 2. Password Logic
function checkPassword() {
    const input = document.getElementById('heart-password').value.toLowerCase().trim();
    const errorMsg = document.getElementById('pwd-error');
    if(input === 'moongfali') {
        showPage('intro-screen');
    } else {
        errorMsg.classList.remove('hidden');
        errorMsg.style.animation = 'none';
        errorMsg.offsetHeight; 
        errorMsg.style.animation = null; 
    }
}

// 3. Start Experience
function startExperience() {
    let video = document.getElementById("bg-video");
    if (video) {
        video.muted = false;
        video.volume = 0.8; 
        video.play().catch(error => console.log("Video play failed:", error));
    }
    showPage('page2');
}

// 4. Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.glass-card').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    const nextPage = document.getElementById(pageId);
    nextPage.classList.remove('hidden');
    nextPage.classList.add('active');

    // Final Confetti Burst
    if (pageId === 'page24') {
        let crackers = document.getElementById("cracker-sound");
        if(crackers) {
            crackers.volume = 1.0;
            crackers.play().catch(e => console.log(e));
        }
        startCrazyConfetti();
    }
}

// 5. Game 1: Balloon Pop
let balloonsPopped = 0;
function popBalloon(element) {
    element.classList.add('popped');
    balloonsPopped++;
    let msg = document.getElementById('balloon-msg');
    
    if(balloonsPopped === 1) msg.innerText = "Good! 2 nakhre aur bache hain...";
    if(balloonsPopped === 2) msg.innerText = "Almost there! Last wala phodo!";
    if(balloonsPopped === 3) {
        msg.innerText = "Yay! Nakhre khatam! 🥰";
        document.getElementById('balloon-btn').classList.remove('hidden');
    }
}

// 6. Game 2: Destiny Spinner
const destinyOptions = ["Movie Date 🎬", "Shopping Spree 🛍️", "Long Drive 🚗", "Coffee Date ☕", "Pizza Party 🍕"];
let spinInterval;
function startSpinner() {
    document.getElementById('spin-btn').classList.add('hidden');
    const textEl = document.getElementById('spinner-text');
    let count = 0;
    
    // Fast shuffle animation
    spinInterval = setInterval(() => {
        textEl.innerText = destinyOptions[count % destinyOptions.length];
        count++;
    }, 100);

    // Stop on the rigged answer after 3 seconds
    setTimeout(() => {
        clearInterval(spinInterval);
        textEl.innerText = "Forever with Kartikey ❤️";
        textEl.style.color = "#ff6b81";
        textEl.style.fontSize = "26px";
        document.getElementById('spinner-next-btn').classList.remove('hidden');
    }, 3000);
}

// 7. Game 3: Love Slider
function checkSlider() {
    let val = document.getElementById('love-slider').value;
    let text = document.getElementById('slider-text');
    let btn = document.getElementById('slider-btn');
    
    text.innerText = val + '%';
    if(val == 100) {
        text.innerText = "100%?! I love you too! 🥰";
        btn.classList.remove('hidden');
    } else {
        btn.classList.add('hidden');
    }
}

// 8. Game 4: 3D Flip Cards
function flipWrong(element) {
    element.classList.add('flipped');
    document.getElementById('card-msg').innerText = "Oops! Not here! 😜";
}

function flipRight(element) {
    element.classList.add('flipped');
    document.getElementById('card-msg').innerText = "You found my heart! 💘";
    document.getElementById('card-btn').classList.remove('hidden');
    document.querySelectorAll('.flip-card').forEach(card => card.style.pointerEvents = "none");
}

// 9. Runaway Button
const runawayButtons = document.querySelectorAll('.runaway-btn');
runawayButtons.forEach(btn => {
    btn.addEventListener('mouseover', moveButton);
    btn.addEventListener('touchstart', moveButton, {passive: false});
});

function moveButton(e) {
    e.preventDefault(); 
    const btn = e.target;
    btn.classList.add('moving');
    
    const maxX = window.innerWidth - (btn.offsetWidth || 100) - 20;
    const maxY = window.innerHeight - (btn.offsetHeight || 50) - 20;
    
    btn.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px';
    btn.style.top = Math.max(10, Math.floor(Math.random() * maxY)) + 'px';
}

// 10. 3D Tilt Effect on Desktop
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".tilt-card").forEach(card => {
        let x = (window.innerWidth / 2 - e.pageX) / 40;
        let y = (window.innerHeight / 2 - e.pageY) / 40;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
});

// 11. Premium Romantic Confetti
function startCrazyConfetti() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 35, spread: 360, ticks: 80, zIndex: 9999, colors: ['#ff0000', '#ff66b2', '#ff1493', '#ffffff', '#ffd700'] };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 60 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
