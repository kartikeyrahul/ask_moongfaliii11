let currentCardId = 'intro-screen'; // Track what is currently showing
let videoPlayed = false;

function startExperience() {
    if(!videoPlayed) {
        let video = document.getElementById("bg-video");
        video.muted = false;
        video.volume = 0.8; 
        video.play().catch(error => console.log("Video play failed:", error));
        videoPlayed = true;
    }
    
    showPage('page1');
}

function showPage(nextPageId) {
    const currentCard = document.getElementById(currentCardId);
    const nextCard = document.getElementById(nextPageId);

    if(!currentCard || !nextCard) return;

    // 1. Trigger the "Slide Out Left" animation on the current card
    currentCard.classList.remove('active');
    currentCard.classList.add('slide-out');

    // 2. Wait for the animation to finish (0.6 seconds), then completely hide it
    setTimeout(() => {
        currentCard.classList.remove('slide-out');
        currentCard.classList.add('hidden');
    }, 600);

    // 3. Trigger the "Slide In Right" animation on the new card immediately
    nextCard.classList.remove('hidden');
    nextCard.classList.add('active');

    // Update tracker
    currentCardId = nextPageId;

    // Final Celebration Check
    if (nextPageId === 'yes-page') {
        let crackers = document.getElementById("cracker-sound");
        if(crackers) {
            crackers.volume = 1.0;
            crackers.play().catch(error => console.log("Cracker sound failed:", error));
        }
        startCrazyConfetti();
    }
}

// Ensure the buttons still run away!
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
