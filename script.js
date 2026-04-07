// Automatically create falling rose petals when page loads
window.onload = function() {
    createPetals();
};

function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 35; 

    for (let i = 0; i < petalCount; i++) {
        let petal = document.createElement('div');
        petal.classList.add('petal');
        
        let size = Math.random() * 10 + 10; 
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 4 + 4) + 's'; 
        petal.style.animationDelay = Math.random() * 5 + 's'; 
        
        container.appendChild(petal);
    }
}

let videoPlayed = false;

function showPage(nextPageId) {
    // Play video on first click if not already playing
    if(!videoPlayed) {
        let video = document.getElementById("bg-video");
        video.muted = false;
        video.volume = 0.8; 
        video.play().catch(error => console.log("Video play failed:", error));
        videoPlayed = true;
    }

    // Hide all cards smoothly
    const pages = document.querySelectorAll('.glass-card');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the new card smoothly
    const nextCard = document.getElementById(nextPageId);
    if(nextCard) {
        nextCard.classList.add('active');
    }

    // Trigger Confetti and Sound on the final page
    if (nextPageId === 'yes-page') {
        let crackers = document.getElementById("cracker-sound");
        if(crackers) {
            crackers.volume = 1.0;
            crackers.play().catch(error => console.log("Cracker sound failed:", error));
        }
        startCrazyConfetti();
    }
}

// Ensure the buttons run away smoothly
const runawayButtons = document.querySelectorAll('.runaway-btn');

runawayButtons.forEach(btn => {
    btn.addEventListener('mouseover', moveButton);
    btn.addEventListener('touchstart', moveButton);
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

function startCrazyConfetti() {
    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
}
