// --- PRELOAD HEAVY IMAGES ---
// This silently downloads all images in the background so there's ZERO lag when she plays.
const imageUrls = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', 'us.jpg', 'shopping.jpg', 'nakhre.jpg', 'destiny.jpg', 'forever.jpg'];
window.onload = () => {
    createMagicAmbience();
    imageUrls.forEach(url => { const img = new Image(); img.src = url; });
};

// --- AMBIENT MAGIC (Fireflies) ---
function createMagicAmbience() {
    const fireflyContainer = document.getElementById('fireflies-container');
    setInterval(() => {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.animationDuration = (Math.random() * 5 + 5) + 's'; 
        fireflyContainer.appendChild(firefly);
        setTimeout(() => firefly.remove(), 10000);
    }, 400); 
}

// --- UTILS ---
function typeWriter(elementId, text, speed, callback) {
    let i = 0; let el = document.getElementById(elementId); el.innerHTML = "";
    function type() {
        if (i < text.length) { el.innerHTML += text.charAt(i); i++; setTimeout(type, speed); } 
        else if (callback) { callback(); }
    }
    type();
}

function showPage(pageId) {
    document.querySelectorAll('.cinematic-scene').forEach(page => { page.classList.remove('active'); page.classList.add('hidden'); });
    const nextPage = document.getElementById(pageId); nextPage.classList.remove('hidden'); nextPage.classList.add('active');
    
    if(pageId === 'scratch-screen') initScratchCard();
    if(pageId === 'page24') initFinalePolaroid(); 
}

// --- GAME LOGIC ---
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
        if (scanProgress >= 100) { clearInterval(scanTimer); fingerprintMsg.innerText = "Identity Confirmed: Moongfali 🥜❤️"; fingerprintMsg.style.color = "#ff6b81"; document.getElementById('scan-btn').classList.remove('hidden'); }
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
    setTimeout(() => { typeWriter('typewriter-title', "Welcome, My Love... 🎬", 90, () => { typeWriter('typewriter-text', "Turn the volume up and open your heart. This is our story...", 50, () => { document.getElementById('intro-btn').classList.remove('hidden'); }); }); }, 500);
}

let balloonsPopped = 0;
function popBalloon(element) { 
    element.classList.add('popped'); balloonsPopped++; 
    let msg = document.getElementById('balloon-msg'); 
    if(balloonsPopped === 1) msg.innerText = "Good! 2 nakhre aur bache hain..."; 
    if(balloonsPopped === 2) msg.innerText = "Almost there! Last wala phodo!"; 
    if(balloonsPopped === 3) { msg.innerText = "Yay! Nakhre khatam! 🥰"; document.getElementById('balloon-btn').classList.remove('hidden'); } 
}

function initScratchCard() {
    const canvas = document.getElementById('scratch-pad'); const ctx = canvas.getContext('2d'); let isDrawing = false;
    ctx.fillStyle = '#b0bec5'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.font = "20px Poppins"; ctx.fillStyle = "#ffffff"; ctx.fillText("Scratch Here 🪙", 70, 95);
    function scratch(e) {
        if (!isDrawing) return; e.preventDefault();
        const rect = canvas.getBoundingClientRect(); const x = (e.clientX || e.touches[0].clientX) - rect.left; const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.globalCompositeOperation = 'destination-out'; ctx.beginPath(); ctx.arc(x, y, 25, 0, Math.PI * 2); ctx.fill();
        document.getElementById('scratch-btn').classList.remove('hidden');
    }
    canvas.addEventListener('mousedown', () => isDrawing = true); canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive: false});
    canvas.addEventListener('mousemove', scratch); canvas.addEventListener('touchmove', scratch, {passive: false}); document.addEventListener('mouseup', () => isDrawing = false); document.addEventListener('touchend', () => isDrawing = false);
}

function startAnalyzer() { 
    document.getElementById('analyze-btn').classList.add('hidden'); 
    const fill = document.getElementById('compat-fill'); const text = document.getElementById('compat-text'); 
    let progress = 0; let interval = setInterval(() => { 
        progress += Math.floor(Math.random() * 5) + 1; 
        if (progress > 100) { clearInterval(interval); fill.style.width = '100%'; setTimeout(() => { text.innerText = "ERROR: Match exceeded... 1000% 💖"; text.style.transform = "scale(1.1)"; document.getElementById('compat-next-btn').classList.remove('hidden'); }, 500); } 
        else { fill.style.width = progress + '%'; text.innerText = progress + '%'; } 
    }, 80); 
}

const destinyOptions = ["Movie Date 🎬", "Shopping Spree 🛍️", "Long Drive 🚗", "Coffee Date ☕", "Pizza Party 🍕"]; let spinInterval;
function startSpinner() { 
    document.getElementById('spin-btn').classList.add('hidden'); const textEl = document.getElementById('spinner-text'); let count = 0; 
    spinInterval = setInterval(() => { textEl.innerText = destinyOptions[count % destinyOptions.length]; count++; }, 100); 
    setTimeout(() => { clearInterval(spinInterval); textEl.innerText = "Forever with Kartikey ❤️"; textEl.style.color = "#ff6b81"; textEl.style.fontSize = "26px"; document.getElementById('spinner-next-btn').classList.remove('hidden'); }, 3000); 
}

function checkSlider() { 
    let val = document.getElementById('love-slider').value; let text = document.getElementById('slider-text'); let btn = document.getElementById('slider-btn'); 
    text.innerText = val + '%'; 
    if(val == 100) { text.innerText = "100%?! I love you too! 🥰"; btn.classList.remove('hidden'); } else { btn.classList.add('hidden'); } 
}

function flipWrong(element) { element.classList.add('flipped'); document.getElementById('card-msg').innerText = "Oops! Not here! 😜"; }
function flipRight(element) { element.classList.add('flipped'); document.getElementById('card-msg').innerText = "You found my heart! 💘"; document.getElementById('card-btn').classList.remove('hidden'); document.querySelectorAll('.flip-card').forEach(card => card.style.pointerEvents = "none"); }

const runawayButtons = document.querySelectorAll('.runaway-btn'); 
runawayButtons.forEach(btn => { btn.addEventListener('mouseover', moveButton); btn.addEventListener('touchstart', moveButton, {passive: false}); });
function moveButton(e) { 
    e.preventDefault(); const btn = e.target; btn.classList.add('moving'); 
    const maxX = window.innerWidth - (btn.offsetWidth || 100) - 20; const maxY = window.innerHeight - (btn.offsetHeight || 50) - 20; 
    btn.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px'; btn.style.top = Math.max(10, Math.floor(Math.random() * maxY)) + 'px'; 
}

// --- FINAL SLIDE MAGIC ---
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
                
                let crackers = document.getElementById("cracker-sound");
                if(crackers) { crackers.volume = 1.0; crackers.play().catch(e => console.log(e)); }
                startCrazyConfetti();
                
                setTimeout(() => { 
                    typeWriter('final-typewriter', "I knew it! Besties and soulmates forever! 🎉💖", 80); 
                }, 800);
            }, 50);
        }, 3500);
    }

    function stopDevelop() {
        if(!isDeveloped) {
            clearTimeout(devTimer);
            frame.classList.remove('developing');
            msg.innerText = "Keep holding to develop...";
        }
    }

    frame.addEventListener('mousedown', startDevelop); frame.addEventListener('touchstart', startDevelop, {passive: false});
    frame.addEventListener('mouseup', stopDevelop); frame.addEventListener('touchend', stopDevelop); frame.addEventListener('mouseleave', stopDevelop);
}

function startCrazyConfetti() { 
    var duration = 15 * 1000; var animationEnd = Date.now() + duration; var defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 9999, colors: ['#ff0000', '#ff66b2', '#ff1493', '#ffffff', '#ffd700'] }; 
    function randomInRange(min, max) { return Math.random() * (max - min) + min; } 
    var interval = setInterval(function() { 
        var timeLeft = animationEnd - Date.now(); 
        if (timeLeft <= 0) return clearInterval(interval); 
        var particleCount = 40 * (timeLeft / duration); 
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })); 
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })); 
    }, 250); 
}
