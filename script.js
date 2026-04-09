// --- CGI STARDUST (FIREFLIES) BACKGROUND ---
const canvas = document.getElementById('stardust');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Size of glowing orb
        this.speedY = Math.random() * -1 - 0.5; // Drift upwards
        this.speedX = Math.random() * 2 - 1; // Drift left/right
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        // Wrap around edges
        if (this.y < 0) this.y = canvas.height;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
    }
    draw() {
        ctx.beginPath();
        // Create glowing effect
        let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(255, 180, 190, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 107, 129, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}
function initStardust() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000; // Dynamic amount based on screen
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
function animateStardust() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateStardust);
}
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initStardust(); });
initStardust();
animateStardust();

// --- PETALS ---
function createAmbientPetals() {
    const container = document.getElementById('floating-petals-container');
    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 4 + 6) + 's'; 
        petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 10000);
    }, 300);
}
window.onload = createAmbientPetals;

// --- UTILS ---
function typeWriter(elementId, text, speed, callback) {
    let i = 0; let el = document.getElementById(elementId); el.innerHTML = "";
    function type() {
        if (i < text.length) { el.innerHTML += text.charAt(i); i++; setTimeout(type, speed); } 
        else if (callback) { callback(); }
    }
    type();
}

// --- LOGIC ---
function checkPassword() {
    const input = document.getElementById('heart-password').value.toLowerCase().trim();
    const errorMsg = document.getElementById('pwd-error');
    if(input === 'moongfali') { showPage('fingerprint-screen'); } 
    else { errorMsg.classList.remove('hidden'); errorMsg.style.animation = 'none'; errorMsg.offsetHeight; errorMsg.style.animation = null; }
}

const scannerBox = document.getElementById('scanner-box');
const scanLine = document.getElementById('scan-line');
const fingerprintMsg = document.getElementById('fingerprint-msg');
let scanTimer; let scanProgress = 0;

function startScan(e) {
    e.preventDefault(); scannerBox.classList.add('scanning'); fingerprintMsg.innerText = "Scanning biometrics...";
    scanTimer = setInterval(() => {
        scanProgress += 2; scanLine.style.height = scanProgress + '%';
        if (scanProgress >= 100) { clearInterval(scanTimer); fingerprintMsg.innerText = "Identity Confirmed: Moongfali 🥜❤️"; fingerprintMsg.style.color = "#ffb1c1"; document.getElementById('scan-btn').classList.remove('hidden'); }
    }, 50);
}
function stopScan() {
    if (scanProgress < 100) { clearInterval(scanTimer); scanProgress = 0; scanLine.style.height = '0%'; scannerBox.classList.remove('scanning'); fingerprintMsg.innerText = "Scan failed. Keep holding!"; }
}
scannerBox.addEventListener('mousedown', startScan); scannerBox.addEventListener('touchstart', startScan, {passive: false});
scannerBox.addEventListener('mouseup', stopScan); scannerBox.addEventListener('touchend', stopScan); scannerBox.addEventListener('mouseleave', stopScan);

function startExperience() {
    let video = document.getElementById("bg-video");
    if (video) { video.muted = false; video.volume = 0.8; video.play().catch(e => console.log(e)); }
    showPage('intro-screen');
    setTimeout(() => { typeWriter('typewriter-title', "Welcome, My Love... 🙈", 100, () => { typeWriter('typewriter-text', "Turn the volume up, brightness up, and open your heart! ❤️🔊", 50, () => { document.getElementById('intro-btn').classList.remove('hidden'); }); }); }, 500);
}

function showPage(pageId) {
    document.querySelectorAll('.glass-card').forEach(page => { page.classList.remove('active'); page.classList.add('hidden'); });
    const nextPage = document.getElementById(pageId); nextPage.classList.remove('hidden'); nextPage.classList.add('active');
    
    if(pageId === 'scratch-screen') initScratchCard();
    if(pageId === 'page24') initFinalePolaroid(); 
}

function initFinalePolaroid() {
    const frame = document.getElementById('finale-polaroid-frame');
    const msg = document.getElementById('finale-polaroid-msg');
    let devTimer; let isDeveloped = false;

    function startDevelop(e) {
        if(isDeveloped) return;
        e.preventDefault();
        frame.classList.add('developing');
        msg.innerText = "Developing... hold steady!";
        
        devTimer = setTimeout(() => {
            isDeveloped = true;
            document.getElementById('final-polaroid-game').classList.add('hidden');
            document.getElementById('gallery-container').classList.remove('hidden');
            
            setTimeout(() => {
                document.getElementById('final-gallery').classList.add('revealed-gallery');
                document.querySelectorAll('.final-pic').forEach(pic => { pic.classList.add('developing'); });
                
                let crackers = document.getElementById("cracker-sound");
                if(crackers) { crackers.volume = 1.0; crackers.play().catch(e => console.log(e)); }
                startCrazyConfetti();
                
                setTimeout(() => { typeWriter('final-typewriter', "I knew it! Besties and soulmates forever! 🎉💖", 80); }, 500);
            }, 50);

        }, 3500);
    }

    function stopDevelop() {
        if(!isDeveloped) { clearTimeout(devTimer); frame.classList.remove('developing'); msg.innerText = "Keep holding to develop..."; }
    }

    frame.addEventListener('mousedown', startDevelop); frame.addEventListener('touchstart', startDevelop, {passive: false});
    frame.addEventListener('mouseup', stopDevelop); frame.addEventListener('touchend', stopDevelop); frame.addEventListener('mouseleave', stopDevelop);
}

function initScratchCard() {
    const canvas = document.getElementById('scratch-pad'); const ctx = canvas.getContext('2d'); let isDrawing = false;
    
    // Add a premium metallic scratch cover
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e0e0e0'); gradient.addColorStop(0.5, '#ffffff'); gradient.addColorStop(1, '#c0c0c0');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height); 
    ctx.font = "bold 22px Poppins"; ctx.fillStyle = "#888"; ctx.textAlign = "center"; ctx.fillText("Scratch Here 🪙", canvas.width/2, canvas.height/2 + 7);
    
    function scratch(e) {
        if (!isDrawing) return; e.preventDefault();
        const rect = canvas.getBoundingClientRect(); const x = (e.clientX || e.touches[0].clientX) - rect.left; const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(x, y, 25, 0, Math.PI * 2); ctx.fill();
        document.getElementById('scratch-btn').classList.remove('hidden');
    }
    canvas.addEventListener('mousedown', () => isDrawing = true); canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive: false});
    canvas.addEventListener('mousemove', scratch); canvas.addEventListener('touchmove', scratch, {passive: false}); document.addEventListener('mouseup', () => isDrawing = false); document.addEventListener('touchend', () => isDrawing = false);
}

let balloonsPopped = 0;
function popBalloon(element) { 
    element.classList.add('popped'); balloonsPopped++; 
    let msg = document.getElementById('balloon-msg'); 
    if(balloonsPopped === 1) msg.innerText = "Good! 2 nakhre aur bache hain..."; 
    if(balloonsPopped === 2) msg.innerText = "Almost there! Last wala phodo!"; 
    if(balloonsPopped === 3) { msg.innerText = "Yay! Nakhre khatam! 🥰"; document.getElementById('balloon-btn').classList.remove('hidden'); } 
}

function startAnalyzer() { 
    document.getElementById('analyze-btn').classList.add('hidden'); const fill = document.getElementById('compat-fill'); const text = document.getElementById('compat-text'); let progress = 0; 
    let interval = setInterval(() => { 
        progress += Math.floor(Math.random() * 5) + 1; 
        if (progress > 100) { 
            clearInterval(interval); fill.style.width = '100%'; 
            setTimeout(() => { text.innerText = "ERROR: Match exceeded... 1000% 💖"; text.style.transform = "scale(1.2)"; document.getElementById('compat-next-btn').classList.remove('hidden'); }, 500); 
        } else { fill.style.width = progress + '%'; text.innerText = progress + '%'; } 
    }, 80); 
}

const destinyOptions = ["Movie Date 🎬", "Shopping Spree 🛍️", "Long Drive 🚗", "Coffee Date ☕", "Pizza Party 🍕"]; let spinInterval;
function startSpinner() { 
    document.getElementById('spin-btn').classList.add('hidden'); const textEl = document.getElementById('spinner-text'); let count = 0; 
    spinInterval = setInterval(() => { textEl.innerText = destinyOptions[count % destinyOptions.length]; count++; }, 100); 
    setTimeout(() => { clearInterval(spinInterval); textEl.innerText = "Forever with Kartikey ❤️"; textEl.style.color = "#ffb1c1"; textEl.style.fontSize = "26px"; document.getElementById('spinner-next-btn').classList.remove('hidden'); }, 3000); 
}

function checkSlider() { 
    let val = document.getElementById('love-slider').value; let text = document.getElementById('slider-text'); let btn = document.getElementById('slider-btn'); text.innerText = val + '%'; 
    if(val == 100) { text.innerText = "100%?! I love you too! 🥰"; btn.classList.remove('hidden'); } else { btn.classList.add('hidden'); } 
}

function flipWrong(element) { element.classList.add('flipped'); document.getElementById('card-msg').innerText = "Oops! Not here! 😜"; }
function flipRight(element) { element.classList.add('flipped'); document.getElementById('card-msg').innerText = "You found my heart! 💘"; document.getElementById('card-btn').classList.remove('hidden'); document.querySelectorAll('.flip-card').forEach(card => card.style.pointerEvents = "none"); }

const runawayButtons = document.querySelectorAll('.runaway-btn'); runawayButtons.forEach(btn => { btn.addEventListener('mouseover', moveButton); btn.addEventListener('touchstart', moveButton, {passive: false}); });
function moveButton(e) { 
    e.preventDefault(); const btn = e.target; btn.classList.add('moving'); 
    const maxX = window.innerWidth - (btn.offsetWidth || 100) - 20; const maxY = window.innerHeight - (btn.offsetHeight || 50) - 20; 
    btn.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px'; btn.style.top = Math.max(10, Math.floor(Math.random() * maxY)) + 'px'; 
}

document.addEventListener("mousemove", (e) => { 
    // Adds a 3D tilt effect based on mouse position
    document.querySelectorAll(".tilt-card").forEach(card => { 
        let x = (window.innerWidth / 2 - e.pageX) / 40; let y = (window.innerHeight / 2 - e.pageY) / 40; 
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`; 
    }); 
});

function startCrazyConfetti() { 
    var duration = 15 * 1000; var animationEnd = Date.now() + duration; var defaults = { startVelocity: 45, spread: 360, ticks: 80, zIndex: 9999, colors: ['#ff0000', '#ff66b2', '#ff1493', '#ffffff', '#ffd700'] }; 
    function randomInRange(min, max) { return Math.random() * (max - min) + min; } 
    var interval = setInterval(function() { 
        var timeLeft = animationEnd - Date.now(); if (timeLeft <= 0) return clearInterval(interval); 
        var particleCount = 80 * (timeLeft / duration); 
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })); 
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })); 
    }, 250); 
}
