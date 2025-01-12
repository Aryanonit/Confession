// Get all necessary DOM elements
const backgroundMusic = document.getElementById('backgroundMusic');
const yesClickSound = document.getElementById('yesClickSound');
const musicToggle = document.getElementById('musicToggle');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const message = document.getElementById('message');
const loading = document.querySelector('.loading');
const question = document.getElementById('question');

let isMusicPlaying = false;

// Music toggle function
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.textContent = '🔈';
    } else {
        playBackgroundMusic();
        musicToggle.textContent = '🔊';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Function to play background music with error handling
function playBackgroundMusic() {
    backgroundMusic.play().catch(error => {
        console.log("Background music failed to play:", error);
        // Retry playing after user interaction
        document.addEventListener('click', () => {
            backgroundMusic.play().catch(e => console.log("Retry failed:", e));
        }, { once: true });
    });
}

// Auto-play music on first interaction
document.body.addEventListener('click', () => {
    if (!isMusicPlaying) {
        playBackgroundMusic();
        musicToggle.textContent = '🔊';
        isMusicPlaying = true;
    }
}, { once: true });

// Create floating hearts background
function createFloatingHearts() {
    const background = document.querySelector('.background');
    const heartSVG = `
        <svg class="heart-svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartSVG;
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        background.appendChild(heart);
    }
}

createFloatingHearts();

// Yes button click handler
yesBtn.addEventListener('click', () => {
    // Play click sound with error handling
    yesClickSound.play().catch(error => {
        console.log("Click sound failed to play:", error);
    });

    // Hide buttons and question, show loading
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    question.style.display = 'none';
    loading.style.display = 'block';

    // Show success message and confetti after delay
    setTimeout(() => {
        loading.style.display = 'none';
        message.textContent = "Thank you Queen! You got a Pookie! 👑✨💖";
        message.classList.remove('hidden');
        message.style.opacity = '1';
        
        // Confetti animation
        const duration = 3 * 1000;
        const end = Date.now() + duration;
        
        function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff69b4', '#ff9999', '#ffb366', '#ffff66']
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff69b4', '#ff9999', '#ffb366', '#ffff66']
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }
        frame();
    }, 2000);
});

// No button movement logic
let lastMoveTime = 0;
const moveDelay = 100; // Minimum time between moves in milliseconds

function moveNoButton(e) {
    const currentTime = Date.now();
    if (currentTime - lastMoveTime < moveDelay) return;
    
    const buttonRect = noBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate new position (move away from mouse)
    let newX = buttonRect.left;
    let newY = buttonRect.top;
    
    // Move horizontally
    if (mouseX < buttonRect.left + buttonRect.width / 2) {
        newX = Math.min(window.innerWidth - buttonRect.width, buttonRect.left + 100);
    } else {
        newX = Math.max(0, buttonRect.left - 100);
    }
    
    // Move vertically
    if (mouseY < buttonRect.top + buttonRect.height / 2) {
        newY = Math.min(window.innerHeight - buttonRect.height, buttonRect.top + 100);
    } else {
        newY = Math.max(0, buttonRect.top - 100);
    }
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    
    lastMoveTime = currentTime;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('mousemove', moveNoButton);

// Reset no button position when mouse leaves window
document.addEventListener('mouseleave', () => {
    setTimeout(() => {
        noBtn.style.position = 'static';
        noBtn.style.transform = 'none';
    }, 500);
});